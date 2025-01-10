const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const getAuthProfile = catchAsync(async (req, res) => {
    res
        .status(httpStatus.OK)
        .json({
            name: req.user.name,
            email: req.user.email,
        });
});


module.exports = {
    getAuthProfile,
}