const axios = require('axios');
require('dotenv').config();

exports.getAPOD = async (date,start_date,end_date, count) => {
  const params = {
    date,
    // start_date,
    // end_date,
    api_key: process.env.NASA_API_KEY 
  };

  console.log('Request params:', { ...params, api_key: '***REDACTED***' });

  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', { 
      params,
      // timeout: 5000 // 5 second timeout
    });
    return response.data;
  } catch (error) {
    console.error('Full error details:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
      stack: error.stack
    });
    throw error;
  }
};