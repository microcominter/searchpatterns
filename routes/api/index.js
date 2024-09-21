const express = require('express');
const search_contoller=require('../../controllers/api/search_controller')
const homeController = require('../../controllers/home_controller');
const otpController = require('../../controllers/api/otp_controller');
const authController=require('../../controllers/api/auth_controller')
const {getAnswer, getContext, getChatHistory,getspecificCHatHistory, getFastAnswer,generateQuerySummary,generateRelatedQueries} = require('../../controllers/api/ai_controller');
const {showDemographics} = require('../../controllers/api/ad_controller');

const { authMiddleware } = require('../../middlewares/jwtmiddleware');

const router = express.Router();

// Public routes
router.post('/signin', authController.signin);

router.get('/user/',homeController.user_details);
// Protected routes
router.use(authController.requireAuth); // Apply the middleware to all routes below this line

router.get('/search/:query',search_contoller.keyword_search );
router.get('/preposition/:query',search_contoller.preposition_search );
router.get('/comparison/:query',search_contoller.comparision_search );
router.post('/sendotp/',otpController.sendOtp);
router.post('/verifyotp/',otpController.verifyOtp);
router.post('/getAnswer/',authMiddleware,getAnswer);
router.post('/getContext/',authMiddleware,getContext);
router.get('/getChatHistory/',authMiddleware,getChatHistory);
router.post('/getspecificChatHistory/',authMiddleware,getspecificCHatHistory);
router.post('/getDemographics/',showDemographics);
// router.post('/getFastAnswer/',authMiddleware,getFastAnswer);

router.get('/auth/',authController.signin);

router.post('/getSummary/',authMiddleware,generateQuerySummary);
router.post('/getRelatedQueries',authMiddleware,generateRelatedQueries);
// router.post('/getAnswer/',authMiddleware,getAnswer);

module.exports = router;