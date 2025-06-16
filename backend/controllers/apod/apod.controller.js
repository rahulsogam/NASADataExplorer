const { getAPOD } = require('../../services/apod.service');

exports.getAstronomyPicture = async (req, res, next) => {
  try {
    const { date,start_date,end_date, count } = req.query;
    const data = await getAPOD(date,start_date,end_date, count);
    res.json(data);
  } catch (error) {
    next(error);
  }
};