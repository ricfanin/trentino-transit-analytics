const app = require('./app');
const config = require('./config/config');
const { ConnectDB } = require('./config/db');


// connect to mongodb
ConnectDB();

app.listen(config.port, () => {
    console.log(`sivallettando sulla porta: ${config.port}`)
});