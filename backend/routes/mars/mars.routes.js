const express = require('express');
const marsController = require('../../controllers/mars/mars.controller');
const router = express.Router();

// GET /api/mars/photos
router.get('/photos', marsController.getMarsRoverPhotos);

module.exports = router;