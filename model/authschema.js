const mongoose=require('mongoose')

const userschema=new mongoose.Schema({

    username:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 character but got {VALUE} ']
    },
    password:{
        type:String,
        require:true
    },

})

// create model
const users=mongoose.model("users",userschema)


// export
module.exports=users