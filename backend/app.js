const express = require('express');
const cors = require('cors');
const earthRoutes = require('./routes/earth/earth.routes');
const apodRoutes = require('./routes/apod/apod.routes');
// const marsRoutes = require('./routes/mars');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/earth', earthRoutes);
app.use('/api/apod', apodRoutes);
// app.use('/api/mars', marsRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;