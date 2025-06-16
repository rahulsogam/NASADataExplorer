const express = require('express');
const earthController = require('../../controllers/earth/earth.controller');
const router = express.Router();

// GET /api/earth/imagery
router.get('/imagery', earthController.getEarthImage);

module.exports = router;