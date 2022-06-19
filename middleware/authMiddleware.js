const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    //there's an authorization object in the http headers & check if it starts with Bearer **
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header. Split token from 'Bearer', get token
            token = req.headers.authorization.split(' ')[1]

            //verify the token. 2 params: toke and secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token (token has user id as payload) and asign it to req.user 
            //to access it in routes its protecting
            req.user = await User.findById(decoded.id).select('-password') //minus password
        
            next();
        } catch(error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {
    protect
}

// ** this is because when the token is sent in the headers it's formatted as Bearer <token>
// startsWith is a javascript method