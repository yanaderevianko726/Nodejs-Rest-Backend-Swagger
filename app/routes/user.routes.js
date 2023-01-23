module.exports = app => {
  const userController = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Retrieve all Users
  router.get("/getAll", userController.findAll);

  // Retrieve all published User
  router.get("/title", userController.findAllWithTitle);

  // Create a new User
  router.post("/addUser", userController.create);

  // Retrieve a single User with userId
  router.get("/:userId", userController.findOne);

  // Update a User with userId
  router.put("/:userId", userController.update);

  // Delete a User with userId
  router.delete("/:userId", userController.delete);

  // Delete all Users
  router.delete("/", userController.deleteAll);

  app.use('/api/users', router);
};
