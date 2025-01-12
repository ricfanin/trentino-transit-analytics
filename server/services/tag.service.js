const httpStatus = require('http-status');
const { Tag } = require('../models');
const ApiError = require('../utils/ApiError');

const createTag = async (tagBody) => {
    if (await Tag.tagExists(tagBody.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Tag name already exists");
    }

    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    tagBody.color = randomColor;

    return Tag.create(tagBody);
};

const getTagById = async (id) => {
    return Tag.findById(id);
};

const getAllTags = async(id) => {
    return Tag.find();
}

const deleteTagById = async (id) => {
    const tag = await getTagById(id);
    if (!tag) {
        throw new ApiError(httpStatus.NOT_FOUND, "Tag not found");
    }
    await tag.remove();
    return tag;
};

module.exports = {
    createTag,
    getTagById,
    getAllTags,
    deleteTagById
}