const User = require('../models/user');
const zod = require("zod");
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
            message: "Email already taken / Incorrect inputs"
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
            message: "Email already taken / Incorrect inputs"
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
            msg: "Email doesn't exist/ Incorrect inputs"
        })
    }
}


// console.log(User);



