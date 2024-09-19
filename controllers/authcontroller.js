const users=require('../model/authschema')
// import jwt
const jwt=require('jsonwebtoken')


exports.RegisterUser=async(req,res)=>{

 const {username,password}=req.body
 console.log(req.body);
 

    try{
const existinguser= await users.findOne({username})
if(existinguser){
    res.status(406).json('Account already exist....please login')
}
else{
    const newuser=new users({
        username,
        password
    })
    await newuser.save()
res.status(200).json(newuser)
}
    }
    catch(err){
res.status(401).json(`Request failed due to ${err} `)
    }
}


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user in the database
        const existuser = await users.findOne({ email, password });
        console.log(existuser);

        if (existuser) {
            // Generate access token (short-lived, e.g., 15 minutes)
            const accessToken = jwt.sign(
                { userid: existuser._id }, 
                "secretkey123", // Change this to your access token secret
                { expiresIn: '1m' } // Access token valid for 15 minutes
            );

            // Generate refresh token (long-lived, e.g., 7 days)
            const refreshToken = jwt.sign(
                { userid: existuser._id }, 
                "refreshkey123", // Change this to your refresh token secret
                { expiresIn: '7d' } // Refresh token valid for 7 days
            );

            // Optionally store the refresh token in the database or cookies (securely)

            // Send the tokens in the response
            res.status(200).json({
                user: existuser,
                accessToken,
                refreshToken
            });
        } else {
            res.status(404).json('Invalid email or password');
        }
    } catch (err) {
        res.status(401).json(`Login request failed due to: ${err}`);
    }
};