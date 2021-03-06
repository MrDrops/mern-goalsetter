const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { json } = require('express/lib/response');

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    //validate
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields');
    }
    //check if user exists
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Create new user
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id) // pass on the user token w/ login
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    //check for user email
    const user = await User.findOne({email});

    // bcrypt method compares password w/ hashPassword
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id) // pass on the user token w/ login
        })
    } else {
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data
// @route GET /api/users/me
// @access Public
const getUser = asyncHandler(async(req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Generate Token (JWT)
const generateToken = (id) => {
    // 3 arguments: payload, secret, token expiration
    //payload could be anything else too: name, email ...
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = { 
    registerUser,
    loginUser,
    getUser
}
