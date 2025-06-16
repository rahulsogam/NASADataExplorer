const axios = require('axios');
const NASA_API_KEY= process.env.NASA_API_KEY;

exports.getEarthImagery = async (lon, lat, date, dim) => {
  const params = {
    lon,
    lat,
    date,
    dim,
    api_key: process.env.NASA_API_KEY 
  };
    console.log('Request params:', { ...params, api_key: '***REDACTED***' });
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/earth/imagery', {
     params,
     responseType: 'arraybuffer'
    });
    return Buffer.from(response.data, 'binary');;
  } catch (error) {
    throw new Error(`NASA Earth API error: ${error.message}`);
  }
};