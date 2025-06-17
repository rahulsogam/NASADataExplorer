import '../css/APOD.css';
const APODViewer = ({ data }) => (
  <div className='apod-card'>
    {data.media_type === 'image' ? (
      <img src={data.url} alt={data.title} />
    ) : (
      <iframe src={data.url} title={data.title} allowFullScreen />
    )}
    <div className="apod-info">
      <h2>{data.title}</h2>
      <p>{data.explanation}</p>
      <p>Date: {data.date}</p>
    </div>
  </div>
);

export default APODViewer;