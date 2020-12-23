const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../controllers/userController');
const { requireSignin } = require('../middlewares/authMiddleware');

router.get('/:id', requireSignin, getUser);
router.put('/:id', requireSignin, updateUser);

module.exports = router;
