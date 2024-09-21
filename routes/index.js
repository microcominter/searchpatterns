const express = require('express');
// const usersController=require('../controllers/users_controller');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');
// router.get('/', homeController.home);
// router.get('/', homeController.user_details);

// router.get('/ResetPassword',usersController.resetPassword);
// router.post('/ResetPassword/reset/:id',usersController.reset);
// router.get('/forgotPassword',usersController.forgotPage);
// router.use('/users', require('./users'));
//     router.use('/posts', require('./posts'));
// router.use('/comments', require('./comment'));
// router.use('/likes', require('./likes'));
// router.use('/friends',require('./friends'));
    router.use('/api',require('./api'));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;