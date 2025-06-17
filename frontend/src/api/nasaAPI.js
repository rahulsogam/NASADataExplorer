export const fetchMarsPhotos = async (page, sol, camera) => {
  const params = new URLSearchParams({ page, sol });
  const response = await fetch(`https://nasa-data-explorer-api-git-main-rahul-sogams-projects.vercel.app/api/mars/photos?${params}`);
  if (!response.ok) {
    throw new Error(`Something Went Wrong ! Please try Again.`);
  }
  return await response.json();
};

export const fetchEarthImage = async (lon, lat, date, dim) => {
  const params = new URLSearchParams({ lon, lat, date, dim });
  const response = await fetch(`https://nasa-data-explorer-api-git-main-rahul-sogams-projects.vercel.app/api/earth/imagery?${params}`);
  if (!response.ok) {
    throw new Error(`No imagery available for this location. Try changing your co-ordinates`);
  }
  return await response.blob(); // For image data
};

export const fetchAPOD = async (date) => {
  const params = new URLSearchParams({ date });
  const response = await fetch(`https://nasa-data-explorer-api-git-main-rahul-sogams-projects.vercel.app/api/apod?${params}`);
  if (!response.ok) {
    throw new Error(`Something Went Wrong ! Please try Again.`);
  }
  return await response.json();
};