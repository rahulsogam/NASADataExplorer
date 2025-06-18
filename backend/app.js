const express = require('express');
const cors = require('cors');
const earthRoutes = require('./routes/earth/earth.routes');
const apodRoutes = require('./routes/apod/apod.routes');
const marsRoutes = require('./routes/mars/mars.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middlewares
//app.use(cors());
app.use(express.json());
var corsOptions = {
  methods: "GET, PUT, POST, DELETE, PATCH",
  credentials: true,
  origin: "http://localhost:3000",
};

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );

  next();
};
app.use(allowCrossDomain);
app.options("*", cors());
app.use(cors(corsOptions));

app.get("/",(req,res)=>{
    res.json("Welcome to NASA Explorer");
})
app.use('/api/earth', earthRoutes);
app.use('/api/apod', apodRoutes);
app.use('/api/mars', marsRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;