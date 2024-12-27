const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { tagService } = require('../services');

const createTag = catchAsync(async (req, res) => {
    const tag = await tagService.createTag(req.body);
    res.status(httpStatus.CREATED).send(tag);
});

const deleteTag = catchAsync(async (req, res) => {
    const tag = await tagService.deleteTagById(req.body.id);
    res.status(httpStatus.OK).send(tag);
});

module.exports = {
    createTag,
    deleteTag,
}