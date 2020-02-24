const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsControler');
const authController = require('../controllers/authController');


router.get('/', authController.isLoggedIn, viewsController.overview);

router.use(viewsController.alerts);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);

router.get('/me', authController.protect, viewsController.getAccount);

router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
