const express = require('express');
const apodController = require('../../controllers/apod/apod.controller');
const router = express.Router();

// GET /api/apod
router.get('/', apodController.getAstronomyPicture);

module.exports = router;