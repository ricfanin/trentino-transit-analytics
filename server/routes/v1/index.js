const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const profileRoute = require('./profile.routes');
const tagRoute = require('./tag.routes');
const tripsAverageRoute = require('./tripsAverage.routes');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/profile',
        route: profileRoute,
    },
    {
        path: '/tags',
        route: tagRoute,
    },
    {
        path: '/trips-average',
        route: tripsAverageRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;