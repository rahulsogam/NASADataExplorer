import {BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './css/DataPage.css';

function Module() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { label } = state || {};
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter states (different for each API)
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0], // Default today
    lon: '-95.33', // Default Houston
    lat: '29.78',
    dim: '0.10', // Default zoom
    rover: 'curiosity', // For Mars
    camera: 'fhaz' // For Mars
  });

  const getApiUrl = () => {
    const API_KEY = 'PayNbzfXCclMTUmSVX5upXIVoXPaZFd0P48vV1p3'; // Replace with your key
    const baseUrl = 'https://api.nasa.gov';
    
    switch(label) {
      case 'EARTH':
        return `${baseUrl}/planetary/earth/imagery?lon=${filters.lon}&lat=${filters.lat}&date=${filters.date}&dim=${filters.dim}&api_key=${API_KEY}`;
      case 'APOD':
        return `${baseUrl}/planetary/apod?date=${filters.date}&api_key=${API_KEY}`;
      case 'MARS':
        return `${baseUrl}/mars-photos/api/v1/rovers/${filters.rover}/photos?earth_date=${filters.date}&camera=${filters.camera}&api_key=${API_KEY}`;
      default:
        return null;
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = getApiUrl();
      if (!url) throw new Error('Invalid API endpoint');
      
      const response = await fetch(url);
      if(response.status==429){
        throw new Error('API request limit reached. Please try again later or use a different API key.');
      }
      const data = await response.json();

       if (data.error && data.error.code === "OVER_RATE_LIMIT") {
            throw new Error(data.error.message);
        }
      setApiData(data);
    } catch (err) {
        setError(err.message);
        setApiData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (label) fetchData();
  }, [label, filters]); // Refetch when filters change

  const renderContent = () => {
    if (loading) return <div className="loader">Loading...</div>;
    if (error) return (
        <div className="error-message">
        <h3>Unable to Load Data</h3>
        <p>{error}</p>
        <div className="rate-limit-help">
            <p>Try these solutions:</p>
            <ul>
            <li>Wait a few minutes and try again</li>
            <li>Use a different API key (sign up at <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer">api.nasa.gov</a>)</li>
            <li>Come back tomorrow when the limit resets</li>
            </ul>
        </div>
        </div>
    );
    if(apiData)
    switch(label) {
      case 'EARTH':
        return apiData?.url && (
          <div className="earth-container">
            <img src={apiData.url} alt="Earth Imagery" className="earth-image" />
            <div className="earth-meta">
              <p>Date: {filters.date}</p>
              <p>Coordinates: {filters.lat}, {filters.lon}</p>
            </div>
          </div>
        );
      
      case 'APOD':
        return apiData && (
          <div className="apod-container">
            {apiData.media_type === 'image' && (
              <img src={apiData.url} alt={apiData.title} className="apod-image" />
            )}
            {apiData.media_type === 'video' && (
              <iframe src={apiData.url} title={apiData.title} className="apod-video" />
            )}
            <div className="apod-info">
              <h2>{apiData.title}</h2>
              <p>{apiData.explanation}</p>
              <p>Date: {apiData.date}</p>
              <p>Copyright: {apiData.copyright || 'Public Domain'}</p>
            </div>
          </div>
        );
      
      case 'MARS':
        return apiData?.photos?.length > 0 ? (
          <div className="mars-container">
            <div className="mars-grid">
              {apiData.photos.map(photo => (
                <div key={photo.id} className="mars-photo">
                  <img src={photo.img_src} alt={`Mars Rover ${photo.id}`} />
                  <p>Sol: {photo.sol}</p>
                  <p>Camera: {photo.camera.full_name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No photos available for selected filters</p>
        );
      
      default:
        return <p>Select a NASA API to explore</p>;
    }
  };

  const renderFilters = () => {
    switch(label) {
      case 'EARTH':
        return (
          <div className="filter-group">
            <label>
              Longitude:
              <input 
                type="number" 
                value={filters.lon}
                onChange={(e) => setFilters({...filters, lon: e.target.value})}
                step="0.01"
              />
            </label>
            <label>
              Latitude:
              <input 
                type="number" 
                value={filters.lat}
                onChange={(e) => setFilters({...filters, lat: e.target.value})}
                step="0.01"
              />
            </label>
            <label>
              Date:
              <input 
                type="date" 
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
                max={new Date().toISOString().split('T')[0]}
              />
            </label>
            <label>
              Zoom (dim):
              <input 
                type="number" 
                value={filters.dim}
                onChange={(e) => setFilters({...filters, dim: e.target.value})}
                min="0.01"
                max="1.0"
                step="0.01"
              />
            </label>
          </div>
        );
      
      case 'MARS':
        return (
          <div className="filter-group">
            <label>
              Rover:
              <select
                value={filters.rover}
                onChange={(e) => setFilters({...filters, rover: e.target.value})}
              >
                <option value="curiosity">Curiosity</option>
                <option value="opportunity">Opportunity</option>
                <option value="spirit">Spirit</option>
                <option value="perseverance">Perseverance</option>
              </select>
            </label>
            <label>
              Camera:
              <select
                value={filters.camera}
                onChange={(e) => setFilters({...filters, camera: e.target.value})}
              >
                <option value="fhaz">Front Hazard Avoidance</option>
                <option value="rhaz">Rear Hazard Avoidance</option>
                <option value="mast">Mast Camera</option>
                <option value="chemcam">Chemistry and Camera</option>
                <option value="mahli">Mars Hand Lens Imager</option>
              </select>
            </label>
            <label>
              Date:
              <input 
                type="date" 
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
                max={new Date().toISOString().split('T')[0]}
              />
            </label>
          </div>
        );
      
      default:
        return (
          <div className="filter-group">
            <label>
              Date:
              <input 
                type="date" 
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
                max={new Date().toISOString().split('T')[0]}
              />
            </label>
          </div>
        );
    }
  };

  return (
    <div className="data-page">
      <button onClick={() => navigate('/')} className="back-button">
        &larr; Back to Home
      </button>
      
      <h1 className="page-title">{label} Explorer</h1>
      
      <div className="filters-container">
        {renderFilters()}
        <button onClick={fetchData} className="apply-button">
          Apply Filters
        </button>
      </div>

      <div className="data-container">
        {renderContent()}
      </div>
    </div>
  );
}

  export default Module;