const { getMarsPhotos } = require('../../services/mars.service');

exports.getMarsRoverPhotos = async (req, res, next) => {
  try {
    const { page, sol, camera } = req.query;
    const photos = await getMarsPhotos(page, sol, camera);
    res.json(photos);
  } catch (error) {
    next(error);
  }
};