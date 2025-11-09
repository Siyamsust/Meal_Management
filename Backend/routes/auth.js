const express=require('express')
const router=express.Router();
const authcontroller=require('../controllers/auth');
router.post("/users/signUp",authcontroller.Signup);
router.post("/users/signin",authcontroller.signIn);

module.exports = router;