export const fetchMarsPhotos = async (page, sol, camera) => {
  const params = new URLSearchParams({ page, sol });
  const response = await fetch(`http://localhost:5000/api/mars/photos?${params}`);
  return await response.json();
};

export const fetchEarthImage = async (lon, lat, date, dim) => {
  const params = new URLSearchParams({ lon, lat, date, dim });
  const response = await fetch(`http://localhost:5000/api/earth/imagery?${params}`);
  return await response.blob(); // For image data
};

export const fetchAPOD = async (date) => {
  const params = new URLSearchParams({ date });
  const response = await fetch(`http://localhost:5000/api/apod?${params}`);
  return await response.json();
};