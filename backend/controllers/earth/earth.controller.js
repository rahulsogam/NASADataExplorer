const { getEarthImagery } = require('../../services/earth.service');

exports.getEarthImage = async (req, res, next) => {
  try {
    const { lon, lat, date, dim } = req.query;
    const image = await getEarthImagery(lon, lat, date, dim);
    
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