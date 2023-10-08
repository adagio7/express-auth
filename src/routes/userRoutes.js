import express from "express";

import { registerUser, loginUser, logoutUser, refreshToken} from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.post('/refreshToken', refreshToken);

router.route('/:id', auth)

    .get()
    .patch()
    .delete()

export default router;