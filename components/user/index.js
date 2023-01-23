const UserRoute = require('./user.routes');
const AuthController = require('./../auth/auth.controller.js');

module.exports = app => {
  app.use('', AuthController.authValidator(), UserRoute);
};
