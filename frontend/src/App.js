import { useNavigate } from 'react-router-dom';
import Earth from './resources/earth.gif';
import APOD from './resources/APOD.gif';
import Mars from './resources/Mars.gif';

import './css/App.css';

function App() {
  const navigate = useNavigate();


  return (
   //Main Div
  <div
  style={{
    position: "relative",
    backgroundColor: "#0b0909",
    width: "100%",
    height: "100vh",
    overflowY: "auto", // So content doesn't get cut off
  }}
>
  {/* Foreground Content */}
  <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "1.5rem",
      padding: "2rem",
    }}>
    {[
      {
        label: "MARS",
        bg: Mars,
        info:"NASA's Mars Rover Photos API lets users access stunning images taken by rovers exploring Mars. Through these missions, NASA is studying the planet's surface, climate, and signs of past life. \n click on the button to know more in detail."
      },
      {
        label: "EARTH",
        bg: Earth,
        info:"NASA's Earth API provides access to satellite imagery, climate data, and environmental monitoring tools for tracking Earth's changes. It supports research, education, and applications in weather, agriculture, and disaster response.click on the button to know more in detail",
      },
      {
        label: "APOD",
        bg: APOD,
        info:"NASA's APOD (Astronomy Picture of the Day) API shares daily images of space along with expert explanations. It showcases the universe’s beauty while promoting astronomy education and awareness. click on the button to know more in detail.",
      },
    ].map(({ label, bg,info }) => (
      <div key={label} className='card'
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <p style={{ fontSize: "1.5rem", fontWeight: "bold",fontStyle:"italic" }}>{label}</p>
         <div className="card-overlay">
          <p>{info} </p>
          <button onClick={() => navigate('/data', { state: { label } })}>Explore {label}</button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default App;
