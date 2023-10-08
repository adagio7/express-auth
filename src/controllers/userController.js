import { hash, genSalt } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../models/User';
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from '../utils/jwtUtils';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });
    
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
    
        await newUser.save()

        res.status(201).json({ message: 'User created successfully' });
        
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = User.findOne({ email });
        const isMatch = await compare(password, user.password)

        if (!user || !isMatch){
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        sendAccessToken(req, res, accessToken);
        sendRefreshToken(req, res, refreshToken);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
export const logoutUser = async (req, res) => {
    res.clearCookie('refreshToken');

    return res.status(200).json({ message: 'Logged out successfully'});
};