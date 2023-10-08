import jwt from 'jsonwebtoken';

export const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15h'
    })
};

export const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })
};

export const sendAccessToken = (req, res, accessToken) => {
    res.send({
        accessToken,
        message: 'Logged in successfully',
        type: 'success'
    });
};

export const sendRefreshToken = (req, res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
    });
}