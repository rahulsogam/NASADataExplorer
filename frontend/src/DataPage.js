import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMarsPhotos, fetchEarthImage, fetchAPOD } from '../src/api/nasaAPI';
import MarsGallery from './components/MarsGallery';
import EarthViewer from './components/EarthViewer';
import APODViewer from './components/APODViewer';
import { RingLoader} from "react-spinners";
import { FaHome } from 'react-icons/fa';
// import DatePicker from '../components/';
import "./css/Main.css";

const DataPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { label } = state || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [earthParams, setEarthParams] = useState({
      lon: -95.33,  
      lat: 29.78,
      date: "2014-02-01", 
      dim: 0.15    
    });

const [earthInput, setEarthInput] = useState({
  lon: -95.33,
  lat: 29.78,
});

  useEffect(() => {
    if (!label) navigate('/');
  }, [label, navigate]);

  const fetchData =  async (selectedDate = date) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      switch(label) {
        case 'MARS':
          result = await fetchMarsPhotos(1,3000, '');
          break;
        case 'EARTH':
          result = await fetchEarthImage(earthParams.lon,
            earthParams.lat,
            earthParams.date,
            earthParams.dim);
          if (
            !result ||
            result.code === 403 ||
            result.url?.includes('cloudfront') ||  // CloudFront = fallback "image not available"
            result.url?.includes('AccessDenied')
          ) {
            throw new Error('No imagery available for this location and date.');
          }
          break;
        case 'APOD':
          result = await fetchAPOD(date);
          break;
        default:
          throw new Error('Invalid data type');
      }
      setData(result);
    } catch (err) {
      setData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const handleEarthInputChange = (e) => {
  const { name, value } = e.target;
    setEarthInput(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

const handleEarthSubmit = () => {
  setEarthParams(prev => ({
    ...prev,
    ...earthInput
  }));
};
   const handleDateChange = async (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    setDate(e.target.value);
      if (label === 'APOD') {
        try {
              setLoading(true);
              setError(null);
              const result = await fetchAPOD(newDate); // Fetch using the new date
              setData(result);
            } 
            catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
      }
  };

  useEffect(() => {
    if (label) {
      fetchData();
    }
  }, [label, earthParams]);

  return (
    <div className="data-layout">
     <button onClick={() => navigate('/')} className="back-button">
      <label style={{color:"white",padding:"5px",fontSize:"20px",cursor:"pointer"}}> Explore </label>
      <FaHome className="home-icon" />
     </button>

      {loading ?
      (
        <div  className='loader'>
          <RingLoader className="loader" size={250} color="cadetblue"   />
        </div>
      ):
      (
      <div className="controls"  >
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
              {label == 'APOD' &&
              (
                <div className="date-picker-container">
                  <label htmlFor="apod-date">
                    To explore more of APOD, select a date:
                  </label>
                  <input
                    id="apod-date"
                    type="date"
                    value={date}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={handleDateChange}
                  />
                </div>
              )}
              {label === 'EARTH' && (
                <div className="earth-controls-container">
                  <p className="earth-instruction">
                    Use your co-ordinates to view your location from space
                  </p>
                  <div className="earth-input-group">
                    <div className="earth-coordinate-input">
                      <label className="earth-input-label">Latitude</label>
                      <div className="earth-input-wrapper">
                        <input
                          type="number"
                          name="lat"
                          value={earthInput.lat}
                          onChange={handleEarthInputChange}
                          step="0.01"
                          min="-90"
                          max="90"
                          className="earth-input-field"
                          placeholder="-90 to 90"
                        />
                      </div>
                    </div>

                    <div className="earth-coordinate-input">
                      <label className="earth-input-label">Longitude</label>
                      <div className="earth-input-wrapper">
                        <input
                          type="number"
                          name="lon"
                          value={earthInput.lon}
                          onChange={handleEarthInputChange}
                          step="0.01"
                          min="-180"
                          max="180"
                          className="earth-input-field"
                          placeholder="-180 to 180"
                        />
                      </div>
                    </div>

                    <button 
                          onClick={handleEarthSubmit} 
                          className="earth-submit-button"
                          disabled={loading}
                        >
                      {loading ? 'Loading...' : 'View Location'}
                    </button>
                    
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && data && (
        <>
          {label === 'MARS' && <MarsGallery photos={data} />}
          {label === 'EARTH' && <EarthViewer image={data} />}
          {label === 'APOD' && <APODViewer data={data} />}
        </>
      )}
    </div>
  );
};

export default DataPage;