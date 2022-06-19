const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', loginUser);

//to protect routes, auth function is used as a 2nd param
router.get('/me', protect, getUser);


module.exports = router;