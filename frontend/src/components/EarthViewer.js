import { useEffect, useState } from 'react';
import '../css/Earth.css';
const EarthViewer = ({ image }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const url = URL.createObjectURL(image);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  return (
    <div className='apod-container'>
      <div className='apod-card'>
        <div className='media-container'>
          <img className="apod-media" src={imageUrl} alt="Earth from space" />
        </div>
      </div>
    </div>
  );
};

export default EarthViewer;