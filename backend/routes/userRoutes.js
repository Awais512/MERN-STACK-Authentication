const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../controllers/userController');
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');

router.get('/:id', requireSignin, getUser);
router.put('/:id', requireSignin, updateUser);
router.put('/admin/:id', requireSignin, isAdmin, updateUser);

module.exports = router;
