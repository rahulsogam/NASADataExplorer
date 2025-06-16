function errorHandler(err, req, res, next) {
  console.error(err.stack);
  
  // NASA API errors
  if (err.message.includes('NASA')) {
    return res.status(502).json({ 
      error: 'Bad Gateway', 
      message: err.message 
    });
  }
  
  // Default error handling
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
}

module.exports = errorHandler;