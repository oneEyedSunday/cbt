const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const Policies = require("../policies/userPolicy");

router.get('/', userController.index);

router.get('/token',Policies.isAuth, userController.token);


router.get('/:id', Policies.findMiddleware, userController.find);

router.post('/new', Policies.createMiddleware , userController.create);

router.post('/login', Policies.loginMiddleware,  userController.login);

router.post('/logout', userController.logout);


module.exports = router;
