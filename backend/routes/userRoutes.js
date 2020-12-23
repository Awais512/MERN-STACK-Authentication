const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController');
const { requireSignin } = require('../middlewares/authMiddleware');

router.get('/:id', requireSignin, getUser);

module.exports = router;
