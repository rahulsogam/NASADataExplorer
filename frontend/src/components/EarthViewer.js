import { useEffect, useState } from 'react';

const EarthViewer = ({ image }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const url = URL.createObjectURL(image);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  return (
    <div className="earth-viewer">
      <img style={{height:"300px",width:"300px"}} src={imageUrl} alt="Earth from space" />
    </div>
  );
};

export default EarthViewer;