// userController.js

const User = require('../models/user');
const zod = require("zod");
const jwt = require("jsonwebtoken");

const signupSchema = zod.object({
    name : zod.string(),
    password : zod.string(),
    email : zod.string().email(),
    role : zod.string(),


})

exports.registerUser = async (req, res) => {
    const { success } = signupSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken /  Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({

        email : req.body.email

    })

    if (existingUser) {
        return res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    const userData = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    })

    const userId = userData._id;

    const token = jwt.sign({
        userId, name: userData.name
    }, process.env.JWT_SECRET)

    res.json({
        msg: "User created successfully",
        token: token
    })
}
const signinSchema = zod.object({
    email : zod.string().email(),
    password : zod.string(),

})
exports.loginUser =  async(req,res) => {
    const{success} = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already exist"
        })
    }

    try {

        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })

        const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET)

        res.json({
            msg: "User Signin Successfull",
            token
        })
    } catch (e) {
        res.status(400).json({
            msg: "Wrong password!"
        })
    }
}


// console.log(User);


exports.googlelogin = (req, res) => {
    const {tokenId} = req.body;
    client.verifyIdToken({idToken: tokenId, audience:"505544959462-t1v1ca2qvum4k14nmscp6a6j7od0icdv.apps.googleusercontent.com"})
    .then(response => {
        const {email_verified, name, email} = response.payload;
        if (email_verified){
            patient.findOne({email}).exec((err, user) => {
                if (err){
                    return res.status(400).json({
                        error:"Something Went wrong"
                    })
                }else{
                    if(user){
                        const token =jwt.sign({_id:user.id},keys.secretOrKey2,{expiresIn:3600})
                        const {_id, name, email} = user;

                        res.json({
                            token,
                            user:{_id, name, email}
                        })
                    }else{
                        let password = email+keys.secretOrKey2;
                        let newUser = new patient({name, email, password});
                        newUser.save((err,data) => {
                            if (err){
                                return res.status(400).json({
                                    error:"Something Went wrong"
                                })
                            }
                            const token =jwt.sign({_id:data.id},keys.secretOrKey2,{expiresIn:3600})
                            const {_id, name, email} = newUser;
    
                            res.json({
                                token,
                                user:{_id, name, email} 
                            })
                        })
                    }
                }
            })
        }
       // console.log(response.payload)
    })
    console.log();
}


exports.forgotPassword = async (req, res) => {
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        patient.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                const transporter = nodemailer.createTransport( {
                      service: 'gmail',
                      auth: {
                        user: 'bingoboom1438@gmail.com',
                        pass: 'AviSri#@2023'
                      }
                    });
                    var mailOptions = {
                    to: req.body.email,
                    from:"docbot@gmail.com",
                    subject:"password reset",
                    html:`
                    <h2>'You are receiving this because you (or someone else) have requested the reset of the password for your account.</br> Please click on the following link, or paste this into your browser to complete the process'</h2>
                    <a style="background-color: #f44336; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block;" href=https://www.docbot.in/covidPatChangePassword/${token}>Reset Password</a>
                    `
                    };
                    transporter.sendMail(mailOptions, function(error, info) {
                        if(error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent:' + info.response)
                        }
                      });
                res.json({message:"Check your email and Follow the instructions"})
            })

        })
    })
}

exports.resetpassword = (req,res)=>{
    //form validation
    const { errors, isValid } = validateRestPassword(req.body)
    if (!isValid) {
		return res.status(400).json(errors)
	}
    
    const newPassword = req.body.password
    const sentToken = req.body.token
    patient.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newPassword,salt).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = ''
           user.expireToken = ''
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
        })
    }).catch(err=>{
        console.log(err)
    })
}




