const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { tagService } = require('../services');

const createTag = catchAsync(async (req, res) => {
    const tag = await tagService.createTag(req.body);
    res.status(httpStatus.CREATED).send(tag);
});

const getTagById = catchAsync(async (req, res) => {
    const tag = await tagService.getTagById(req.query._id);
    res.status(httpStatus.OK).send(tag);
});

const getAllTags = catchAsync(async (req, res) => {
    console.log(req.query._id);

    const tags = await tagService.getAllTags();
    res.status(httpStatus.OK).send(tags)
});

const deleteTag = catchAsync(async (req, res) => {
    const tag = await tagService.deleteTagById(req.body.id);
    res.status(httpStatus.OK).send(tag);
});

module.exports = {
    createTag,
    getAllTags,
    getTagById,
    deleteTag,
}