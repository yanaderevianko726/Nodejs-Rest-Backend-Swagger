const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

var corsOptions = {
  origin: "http://localhost:3000"
};
// change this port when have error with "Access to XMLHttpRequest blocking error"

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

require("./app/routes/user.routes.js")(app);
require("./app/routes/booking.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
