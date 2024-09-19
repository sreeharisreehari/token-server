
require('dotenv').config()
const express=require('express')

const cors=require('cors')

 const router=require('./router/router')

 require('./DB/connection')

const tokenserver=express()

tokenserver.use(cors())

tokenserver.use(express.json()) 

tokenserver.use(router)


// pfserver.use('/uploads',express.static('./uploads'))

// customize the port-by default -3000
const PORT=4000 || process.env

// to run  server
tokenserver.listen(PORT, ()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

tokenserver.get('/',(req,res)=>{
    res.send(`server running succesfuly and ready to accept request`)
})







