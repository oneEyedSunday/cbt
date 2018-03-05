const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const Policies = require("../policies/userPolicy");

router.get('/', userController.index);

router.get('/token',Policies.isAuth, userController.token);


router.get('/:id', userController.find);

router.post('/new', userController.create);

router.post('/login', userController.login);

router.post('/logout', userController.logout);


module.exports = router;
