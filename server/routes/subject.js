const express = require('express');
const router = express.Router();
const subjectController = require('./../controllers/subjectController');

router.get('/', subjectController.index);

router.get('/:id/tests', subjectController.tests);

router.get('/:id', subjectController.find);

router.post('/new', subjectController.create);


module.exports = router;
