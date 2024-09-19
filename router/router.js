const express=require('express')

const authcontroller=require('../controllers/authcontroller')

const jwt=require('../middleware/jwtmiddleware')

const router=new express.Router()


router.post('/user/register',authcontroller.RegisterUser)

router.post('/user/login',authcontroller.loginUser)


module.exports=router