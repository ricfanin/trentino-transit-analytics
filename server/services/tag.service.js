const httpStatus = require('http-status');
const { Tag } = require('../models');
const ApiError = require('../utils/ApiError');

const createTag = async (userBody) => {
    if (await Tag.tagExists(userBody.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Tag name already exists");
    }
    return Tag.create(userBody);
};

const getTagById = async (id) => {
    return Tag.findById(id);
};

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
    deleteTagById
}