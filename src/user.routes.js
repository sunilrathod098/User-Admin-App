import { Router } from 'express';
import { getUserProfile, loginUser, registerUser } from './user.controller.js';
import { isAdmin, isUserProfile, verifyToken } from './user.middleware.js';

const router = Router()

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile/:id').get(verifyToken, isUserProfile, getUserProfile);

router.route('/admin').get(verifyToken, isAdmin, (_, res) => {
    res.status(200).json({ message: "Welcome Admin!" });
});

export default router;