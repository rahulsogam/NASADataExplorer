import '../css/Mars.css';

const MarsGallery = ({ photos }) => (
  <div className="mars-gallery">
    {photos.map(photo => (
      <div key={photo.id} className="mars-photo">
        <img src={photo.img_src} alt={`Mars Rover ${photo.id}`} />
        <div className="photo-info">
          <p>Name: {photo.rover.name}</p>
          <p>Landing Date: {photo.rover.landing_date}</p>
          <p>Camera: {photo.camera.full_name}</p>
          <p>Status: {photo.rover.status}</p>
        </div>
      </div>
    ))}
  </div>
);

export default MarsGallery;