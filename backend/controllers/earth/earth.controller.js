const { getEarthImagery } = require('../../services/earth.service');

exports.getEarthImage = async (req, res, next) => {
  try {
    const { lon, lat, date, dim } = req.query;
    const image = await getEarthImagery(lon, lat, date, dim);
    
    // Set proper content-type for image response
    res.set({
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400', // 24hr cache
      'Access-Control-Allow-Origin': '*'
    });
    res.send(image);
  } catch (error) {
    next(error);
  }
};