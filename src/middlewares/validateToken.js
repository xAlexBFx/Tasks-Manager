import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    if(!token) return res.status(401).json({
        'message': 'You are not logged in!',
        'errorStatus' : true
    });

    jwt.verify(token, TOKEN_SECRET, (err, decoded_user) => {
        if(err) res.status(403).json({
            'message': 'Invalid token!',
            'errorStatus' : true
        });
        req.user = decoded_user;
        next();
    })
}