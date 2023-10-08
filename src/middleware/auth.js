import { verify } from 'jsonwebtoken';

import { User } from '../modles/User.js';

export const auth = async (req, res, next) => {
    const authorization = req.headers['authorization'];

    if (!authorization) return res.status(401).json({ message: 'You are not authenticated' });

    const token = authorizaiton.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'You are not authenticated' });

    try {
        let id = verify(token, process.env.ACCESS_TOKEN_SECRET).id;
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const user = User.findById(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user;
    next();
}

