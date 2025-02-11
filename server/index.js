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

const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');

const routes = require('./routes/v1');
const { ConnectDB } = require('./config/db');
const config = require('./config/config');


const app = express();

// MIDDLEWARES
app.use(morgan('dev'))

// Carica il file YAML di Swagger
const swaggerFile = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = yaml.parse(swaggerFile);

// Configura l'URL del server in Swagger
swaggerDocument.servers = [
    {
      url: process.env.VUE_APP_API_BASE_URL,
      description: 'Local server',
    },
  ];

// Configura Swagger UI
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



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

// connect to mongodb
ConnectDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
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

app.listen(config.port, () => {
    console.log(`sivallettando sulla porta: ${config.port}`)
});