const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const getAuthProfile = catchAsync(async (req, res) => {
    res
        .status(httpStatus.OK)
        .json({
            name: req.user.name,
            username: req.user.username,
            surname: req.user.surname,
            email: req.user.email,
        });
});


module.exports = {
    getAuthProfile,
}