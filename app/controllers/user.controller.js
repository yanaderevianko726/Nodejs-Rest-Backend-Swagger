const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    title: req.body.title,
    surname: req.body.surname,
    lastname: req.body.lastname,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    rankNum: req.body.rankNum,
    pmKey: req.body.pmKey,
  });  
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// find all Users
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database (with condition).
exports.findAllWithSurname = (req, res) => {
  const surname = req.params.surname;
  User.getAllWithSurname(surname, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database (with condition).
exports.findByPmKeyAndSurname = (req, res) => {
  const pmKey = req.params.pmKey;
  const surname = req.params.surname;
  User.findByPmKeyAndSurname(pmKey, surname, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find a single User by userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with userId ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with userId " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  if (!req.params.userId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }else if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }else{
    console.log(req.body);
    User.updateById(
      req.params.userId,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with userId ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with userId " + req.params.userId
            });
          }
        } else res.send(data);
      }
    );
  }
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with userId ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with userId " + req.params.userId
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
