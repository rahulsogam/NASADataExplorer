const axios = require('axios');
const NASA_API_KEY= process.env.NASA_API_KEY;

exports.getMarsPhotos = async (page, sol, camera) => {
    const params={
        sol,
        page,
        api_key:NASA_API_KEY
    }
    console.log('Request params:', { ...params, api_key: '***REDACTED***' });
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`,
      { 
       params}
    );
    return response.data.photos;
  } catch (error) {
    throw new Error(`NASA Mars API error: ${error.message}`);
  }
};