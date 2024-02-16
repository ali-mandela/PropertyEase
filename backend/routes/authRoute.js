const express = require("express");
const router = express.Router();

const { signUpController,signInController,oAuthController } = require("../controllers/authController");


router.post('/sign-up', signUpController);
router.post('/sign-in', signInController);
router.post('/google-auth', oAuthController);




module.exports = router;