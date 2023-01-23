module.exports = app => {
  const bookingController = require("../controllers/booking.controller.js");

  var router = require("express").Router();

  // Retrieve all Users
  router.get("/getAll", bookingController.findAll);

  // Retrieve all with surname of User
  router.get("/getBookings/:userId", bookingController.getAllWithUserId);

  // Retrieve a single User with userId
  router.get("/getBooking/:bookingId", bookingController.findByBookingId);

  // Create a new User
  router.post("/addBooking", bookingController.create);

  // Confirm a User
  router.post("/updateBooking/:bookingId", bookingController.update);

  // Retrieve a single User with userId
  router.get("/deleteBooking/:bookingId", bookingController.delete);

  app.use('/api/bookings', router);
};
