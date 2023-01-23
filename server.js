const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config/db');
const router = require('./config/router');
const app = express();
const port = 8000;

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

db.sync();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors());

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

router(app);
app.listen(port, () => console.log('Run on port ${port}'));
