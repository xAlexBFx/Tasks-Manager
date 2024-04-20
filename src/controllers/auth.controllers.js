import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    if(req.body.username && req.body.password && req.body.email) {
        const {username, password, email} = req.body;
        try {
            const foundUser = await User.findOne({email});
            if(foundUser) return res.status(400).json({
                'message': ['This email is already in use!'],
                'errorStatus': true
            });

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                password: passwordHash,
                email
            });
            const savedUser = await newUser.save();
            const token = await createAccessToken({ id: savedUser._id });
            res.cookie('token', token)
            res.json({
                'message': 'New user created successfully!',
                'user': {
                    'username': savedUser.username,
                    'email': savedUser.email,
                    'id': savedUser._id,
                    'createdAt': savedUser.createdAt,
                    'updatedAt': savedUser.updatedAt
                },
                'errorStatus': false
            });
        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error!',
                'errorStatus': true
            });
        }
    } else {
        res.json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const login = async (req, res) => {
    if(req.body.password && req.body.email) {
        const { password, email } = req.body;
        try {
            const foundUser = await User.findOne({ email });
            if(!foundUser) return res.status(400).json({
                'message' : 'User not found!',
                'errorStatus' : true
            });
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if(!isMatch) return res.status(400).json({
                'message' : 'Incorrect Password!',
                'errorStatus' : true
            });

            const token = await createAccessToken({ id: foundUser._id });
            res.cookie('token', token)
            res.json({
                'message': 'Logged In',
                'user': {
                    'username': foundUser.username,
                    'email': foundUser.email,
                    'id': foundUser._id,
                    'createdAt': foundUser.createdAt,
                    'updatedAt': foundUser.updatedAt
                },
                'errorStatus': false
            });
        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error!',
                'errorStatus': true
            });
        }
    } else {
        res.json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('token', '',{
            expires: new Date(0)
        });
        res.json({
            'message' : 'Logged out',
            'errorStatus' : false
        });
    } catch (err) {
        console.log(err);
        res.json({
            'message': 'Internal server error!',
            'errorStatus': true
        });
    }
};

export const profile = async (req, res) => {
    const foundUser =  await User.findById(req.user.id);

    if(!foundUser) return res.json({
        'message': 'User not found!',
        'errorStatus': true
    });

    res.json({
        'username': foundUser.username,
        'email': foundUser.email,
        'id': foundUser._id,
        'createdAt': foundUser.createdAt,
        'updatedAt': foundUser.updatedAt
    });
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if(!token) return res.status(401).json({
        'message' : 'Unauthorized',
        'errorStatus' : true
    });
    jwt.verify(token, TOKEN_SECRET, async (err, decoded_user) => {
        if(err) return res.status(401).json({
            'message' : 'Unauthorized',
            'errorStatus' : true
        });
        const foundUser = await User.findById(decoded_user.id)
        if(!foundUser) return res.status(401).json({
            'message' : 'Unauthorized',
            'errorStatus' : true
        });
        res.json({
            'username': foundUser.username,
            'email': foundUser.email,
            'id': foundUser.id,
            'createdAt': foundUser.createdAt,
            'updatedAt': foundUser.updatedAt
        });
    })

}