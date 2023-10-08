import { hash, genSalt } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../models/User';

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

export const loginUser = (req, res) => {

};
export const logoutUser;