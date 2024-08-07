const jwt = require('express-jwt');

const auth = jwt({
  secret: 'your_jwt_secret', // Replace with your secret
  algorithms: ['HS256'],
}).unless({ path: ['/api/auth/login', '/api/auth/register'] }); // Unprotected routes

module.exports = auth;
