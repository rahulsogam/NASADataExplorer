const MarsGallery = ({ photos }) => (
  <div className="mars-gallery">
    {photos.map(photo => (
      <div key={photo.id} className="mars-photo">
        <img src={photo.img_src} alt={`Mars Rover ${photo.id}`} />
        <div className="photo-info">
          <p>Sol: {photo.sol}</p>
          <p>Camera: {photo.camera.full_name}</p>
        </div>
      </div>
    ))}
  </div>
);

export default MarsGallery;