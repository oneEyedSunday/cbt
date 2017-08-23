const express = require('express');
const router = express.Router();
const subjectController = require('./../controllers/subjectController');

router.get('/', subjectController.index);


module.exports = router;
