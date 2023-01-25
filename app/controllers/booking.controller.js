const Booking = require("../models/booking.model.js");

// Create and Save a new Booking
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Booking
  const booking = new Booking({
    userId: req.body.userId,
    guestName: req.body.guestName,
    guests: req.body.guests,
    roomKey: req.body.roomKey,
    roomNum: req.body.roomNum,
    roomType: req.body.roomType,
    bookingType: req.body.bookingType,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    createdAt: req.body.createdAt
  });  
  Booking.create(booking, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// find all Bookings
exports.findAll = (req, res) => {
  Booking.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bookings."
      });
    else res.send(data);
  });
};

// Retrieve all Bookings from the database (with condition).
exports.findByBookingId = (req, res) => {
  const bookingId = req.params.bookingId;
  Booking.getByBookingId(bookingId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving booking data."
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database (with condition).
exports.getAllWithUserId = (req, res) => {
  const userId = req.params.userId;
  Booking.getAllWithUserId(userId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bookings."
      });
    else res.send(data);
  });
};

// Update a Booking identified by the userId in the request
exports.update = (req, res) => {
  if (!req.params.bookingId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }else if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }else{
    console.log(req.body);
    Booking.updateByBookingId(
      req.params.bookingId,
      new Booking(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Booking with bookingId ${req.params.bookingId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Booking with bookingId " + req.params.bookingId
            });
          }
        } else res.send(data);
      }
    );
  }
};

// Delete a Booking with the specified userId in the request
exports.delete = (req, res) => {
  Booking.remove(req.params.bookingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Booking with bookingId ${req.params.bookingId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Booking with bookingId " + req.params.bookingId
        });
      }
    } else res.send({ message: `Booking was deleted successfully!` });
  });
};
