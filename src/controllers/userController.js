import { hash, genSalt } from 'bcrypt';
import { verify } from 'jsonwebtoken';

import { User } from '../models/User.js';
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from '../utils/jwtUtils.js';

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

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) return res.status(401).json({ message: 'No token provided' });

        try {
            let id = verify(token, process.env.REFRESH_TOKEN_SECRET).id;
        } catch (err) {
            return res.status(500).json({ message: 'Invalid token' });
        }

        if (!id) return res.status(401).json({ message: 'Invalid token' });

        const user = User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.refreshToken !== token){
            return res.status(401).json({ message: 'Invalid token'});
        }

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        sendRefreshToken(req, res, refreshToken);

        return res.status(200).json({ 
            message: 'Token refreshed successfully',
            type: 'success',
            accessToken,
        })

    } catch (err) {
        return res.status(500).json({ message: 'Error refreshing token' }); 
    }
}