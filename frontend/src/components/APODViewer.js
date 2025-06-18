import '../css/Main.css';

const APODViewer = ({ data }) => (
  <div className='apod-container'>
    <div className='apod-card'>
      <div className='media-container'>
        {data.media_type === 'image' ? (
          <img 
            src={data.url} 
            alt={data.title} 
            className="apod-media"
          />
        ) : (
          <iframe 
            src={data.url} 
            title={data.title} 
            className="apod-media"
            allowFullScreen
          />
        )}
      </div>
      <div className="apod-info">
        <h2>{data.title}</h2>
        <p className="explanation">{data.explanation}</p>
        <p className="date">Date: {data.date}</p>
      </div>
    </div>
  </div>
);

export default APODViewer;