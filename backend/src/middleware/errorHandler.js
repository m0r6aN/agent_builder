const errorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send('Invalid token');
    }
  
    console.error(err.stack);
    res.status(500).send('Something broke!');
  };
  
  module.exports = errorHandler;
  