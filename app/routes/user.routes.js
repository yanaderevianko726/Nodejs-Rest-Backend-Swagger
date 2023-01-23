module.exports = app => {
  const userController = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Retrieve all Users
  router.get("/getAll", userController.findAll);

  // Retrieve all with surname of User
  router.get("/getUsers/:surname", userController.findAllWithSurname);

  // Retrieve a single User with userId
  router.get("/getUser/:userId", userController.findOne);

  // Retrieve all published User
  router.get("/confirmKey/:pmKey/:surname", userController.findByPmKeyAndSurname);

  // Create a new User
  router.post("/addUser", userController.create);

  // Confirm a User
  router.post("/updateUser/:userId", userController.update);

  // Retrieve a single User with userId
  router.get("/deleteUser/:userId", userController.delete);

  app.use('/api/users', router);
};
