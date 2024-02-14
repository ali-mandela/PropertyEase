const router = require("express").Router();
const { testController } = require("../controllers/userController");




// test get api
router.get('/test', testController) 


module.exports = router;