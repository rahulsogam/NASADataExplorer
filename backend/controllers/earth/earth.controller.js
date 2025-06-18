const { getEarthImagery } = require('../../services/earth.service');

exports.getEarthImage = async (req, res, next) => {
  try {
    const { lon, lat, date, dim } = req.query;
    const image = await getEarthImagery(lon, lat, date, dim);
    
    const origin = req.headers.origin;
    const allowedOrigins = [
      'http://localhost:3000',
      'https://nasa-data-explorer-nu.vercel.app'
    ];

    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }


    // Set proper content-type for image response
    res.set(200, {
      'Content-Type': 'image/png',
      'Content-Length': image.length,
      'Content-Disposition': 'inline'
    });
    
    res.send(image, 'binary')
    
  } catch (error) {
    next(error);
  }
};