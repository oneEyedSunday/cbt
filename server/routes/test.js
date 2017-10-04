const express = require('express');
const router = express.Router();
const testController = require('./../controllers/testController');

router.get('/', (req,res)=>{
  res.send('Test is working.');
});

router.get('/list', testController.index);

router.get('/:id', testController.test_detail);

router.post('/new', testController.create);

router.post('/mark/:id', testController.mark);


module.exports = router;
