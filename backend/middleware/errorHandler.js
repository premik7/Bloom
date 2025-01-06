module.exports = (err, req, res, next) => {
    console.error(err.stack);
    
    res.status(err.status || 500).json({
      error: process.env.NODE_ENV === 'development' 
        ? err.message 
        : 'Something went wrong!'
    });
  };