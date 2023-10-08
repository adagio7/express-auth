import express from "express";

import { registerUser, loginUser, logoutUser } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.route('/:id')
    .get()
    .patch()
    .delete()
export default router;