import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMarsPhotos, fetchEarthImage, fetchAPOD } from '../src/api/nasaAPI';
import MarsGallery from './components/MarsGallery';
import EarthViewer from './components/EarthViewer';
import APODViewer from './components/APODViewer';
import { CircleLoader} from "react-spinners";
// import DatePicker from '../components/';
import "./css/APOD.css";

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
  useEffect(() => {
    if (!label) navigate('/');
  }, [label, navigate]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      switch(label) {
        case 'MARS':
          result = await fetchMarsPhotos(1,10, '');
          break;
        case 'EARTH':
          result = await fetchEarthImage(earthParams.lon,
            earthParams.lat,
            earthParams.date,
            earthParams.dim);
          break;
        case 'APOD':
          result = await fetchAPOD("2025-06-16");
          break;
        default:
          throw new Error('Invalid data type');
      }
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEarthParamChange = (e) => {
    const { name, value } = e.target;
    setEarthParams(prev => ({
      ...prev,
      [name]: Number(value)  // Convert to number for lon/lat/dim
    }));
  };

   const handleDateChange = (e) => {
    if (label === 'EARTH') {
      setEarthParams(prev => ({
        ...prev,
        date: e.target.value
      }));
    } else {
      setDate(e.target.value);
    }
  };

  useEffect(() => {
    if (label) fetchData();
  }, [label, date,earthParams]);

  return (
    <div className="data-layout">
      <button onClick={() => navigate('/')} className="back-button">
        Explorer DataPage
      </button>

      

      {loading ?
      (
        <div  style={{position: "fixed",          // Overlay full screen
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "black",
                      display: "flex",
                      justifyContent: "center",   // Horizontal center
                      alignItems: "center",       // Vertical center
                      zIndex: 9999  }}>
          <CircleLoader className="loader" size={250} color="cadetblue"   />
        </div>
      ):
      (<div className="controls"  >
            <h1>{label} Explorer</h1>
            <div style={{display:"flex",flexDirection:"row"}}>
              {label == 'APOD' &&
              (
                <label>
                  Select the date of your choice :
                  <input  
                    type='date' 
                    value={date} 
                    onChange={handleDateChange} 
                  />
                </label>
              )}
              {label === 'EARTH' && (
                <div className="earth-controls">
                  <div className="coordinate-input">
                    <label>
                      Longitude:
                      <input
                        type="number"
                        name="lon"
                        value={earthParams.lon}
                        onChange={handleEarthParamChange}
                        step="0.01"
                        min="-180"
                        max="180"
                      />
                    </label>
                  </div>
                  
                  <div className="coordinate-input">
                    <label>
                      Latitude:
                      <input
                        type="number"
                        name="lat"
                        value={earthParams.lat}
                        onChange={handleEarthParamChange}
                        step="0.01"
                        min="-90"
                        max="90"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
            {/* <button onClick={fetchData} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </button> */}
          </div>
        )}
      {error && <div className="error">{error}</div>}
      
      {data && (
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