const express = require('express');
const validate = require('../../middlewares/validate')
const tagController = require('../../controllers/tag.controller');
const tagValidation = require('../../validations/tag.validation');
const routeIdRouteNumberController = require('../../controllers/routeIdRouteNumbers.controller')
const auth = require('../../middlewares/auth');


const router = express.Router();

router
    .route('/')
    .post(auth(), validate(tagValidation.createTag), tagController.createTag)
    .get(auth(), validate(tagValidation.getTagById), tagController.getTagById)
    .delete(auth(), validate(tagValidation.deleteTag), tagController.deleteTag)

router
    .route('/all')
    .get(auth(), routeIdRouteNumberController.getAllRouteIdNumbers);

module.exports = router;
