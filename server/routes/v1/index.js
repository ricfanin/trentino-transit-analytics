const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const profileRoute = require('./profile.routes');
const tagRoute = require('./tag.routes');
const tripsAverageRoute = require('./tripsAverage.routes');
const postRoute = require('./post.routes');
const commentRoute = require('./comment.routes');
const voteRoute = require('./vote.routes');
const linesIdNumbers = require('./routeIdNumbers.routes');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/user',
        route: userRoute,
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
    {
        path: '/posts',
        route: postRoute
    },
    {
        path: '/comments',
        route: commentRoute
    },    
    {
        path: '/votes',
        route: voteRoute
    },
    {
        path: '/linesIdNumbers',
        route: linesIdNumbers 
    },

];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;