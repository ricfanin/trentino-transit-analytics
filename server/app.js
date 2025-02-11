const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors')
const httpStatus = require("http-status")
const passport = require('passport')
const { jwtStrategy } = require('./config/passport');
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require('./middlewares/error');

const routes = require('./routes/v1');


const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');

// Carica il file YAML di Swagger
const swaggerFile = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = yaml.parse(swaggerFile);

// Configura l'URL del server in Swagger
swaggerDocument.servers = [ { url: process.env.VUE_APP_API_BASE_URL, description: 'TTA-api'} ];

const app = express();

// Configura Swagger UI
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// MIDDLEWARES
app.use(morgan('dev'))

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.get('/', (req, res) => {
    res.send('trentino-transit-analytics API!')
});

// ROUTES
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;