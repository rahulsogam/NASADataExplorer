const express = require('express');
const cors = require('cors');
const earthRoutes = require('./routes/earth/earth.routes');
const apodRoutes = require('./routes/apod/apod.routes');
const marsRoutes = require('./routes/mars/mars.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();


app.use(express.json());

app.use(cors({
  origin: [
    'https://nasa-data-explorer-nu.vercel.app',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes
app.get("/",(req,res)=>{
    res.json("Welcome to NASA Explorer");
})
app.use('/api/earth', earthRoutes);
app.use('/api/apod', apodRoutes);
app.use('/api/mars', marsRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;