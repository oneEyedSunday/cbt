const express = require('express');
const router = express.Router();
const testController = require('./../controllers/testController');

router.get('/', (req,res)=>{
  res.send('Test is working.');
});

router.get('/list', testController.index);

router.get('/:id', testController.test_detail);


module.exports = router;
