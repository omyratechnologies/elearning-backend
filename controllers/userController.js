// userController.js

const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegisterInput = require('../validation/userRegister');
const validateLoginInput = require('../validation/login');
const validateRestPassword = require('../validation/resetPassword');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("333871753988-13vgtkfsrd47gg9vtnui983f8stk01lr.apps.googleusercontent.com")

const nodemailer = require('nodemailer');
const crypto = require('crypto');

/// Inserting SignUp 
exports.signUp =(req, res) => {

    //Form vaildation
    const { errors, isValid } = validateRegisterInput(req.body)

    ///check vaildation

    if(!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email }).then(returnedStuff => {
        if(returnedStuff) {
            return res.status(400).json({email: "Email already exist!!!"})
        }
    });

    // saving user with request information to database
	const { name, email, phoneNumber, role ,password } = req.body;

	const signupUser = new User({
		name : name,
        email : email,
        phoneNumber : phoneNumber,
		password : password,
		role:role,
		// selectedFile : selectedFile,
	});

    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(signupUser.password, salt, (err, hash) => {
            if(err) throw err;
            signupUser.password = hash;
            signupUser.save().then(User => res.json(User)).catch(err => console.log(err));
        });
    });

};


exports.login =(req, res) => {

    //what happens
    const {errors, isValid} = validateLoginInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(User => {

        //check if user exists
        if(!User){
            return res.status(404).json({message: "Email not found"});
        }

        //check password
        bcrypt.compare(password, User.password).then(isMatch => {
            if(isMatch){
                //user matched
                //create JWT payload

                const payload ={ id: User.userId, name: User.name, email: User.email, phone: User.phoneNumber, role: User.role};

                //sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey2,
                    {expiresIn: 3600},
                    (err, token) => {
                    res.json({ success: true, token: "Bearer" + token, payload});
                });

                
            } else {
                return res
                .status(400)
                .json({ message: "Password Incorrect"})
            }
        });
    });
};

exports.googlelogin = (req, res) => {
    const {tokenId} = req.body;
    client.verifyIdToken({idToken: tokenId, audience:"505544959462-t1v1ca2qvum4k14nmscp6a6j7od0icdv.apps.googleusercontent.com"})
    .then(response => {
        const {email_verified, name, email} = response.payload;
        if (email_verified){
            User.findOne({email}).exec((err, user) => {
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
                        let newUser = new User({name, email, password});
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
        User.findOne({email:req.body.email})
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
                    from:"bingoboom1438@gmail.com",
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
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
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