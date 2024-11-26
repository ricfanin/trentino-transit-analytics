const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const tagRoute = require('./tag.routes');
const postRoute = require('./post.routes');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/tags',
        route: tagRoute,
    },
    {
        path: '/posts',
        route: postRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;