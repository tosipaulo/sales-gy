const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');   

const mailer = require('../../config/nodemailer');

const User = require('../schema/User');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, process.env.AUTH_SECRET, {
        expiresIn: 86400,
    })
}

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {

        if(await User.findOne({email})){
            return res.status(400).send({ error: 'User already exits' })
        }

        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        })

    }catch (err){
        return res.status(400).send( {error: 'Registration failed' + err})
    }
})

router.post('/authenticate', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email}).select('+password')

    if(!user) {
        return res.status(400).send({ error: 'User not found' })
    }

    if(! await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid passoword' })
    }
    user.password = undefined;

    res.send({
        user, 
        token: generateToken({id: user.id})
    });
})

router.post('/forgot_password', async (req, res) => {

    const { email } = req.body;

    try {

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).send({ error: 'User not found' })
        }

        const token = crypto.randomBytes(20).toString('hex');
        
        const now = new Date();
        now.setHours(now.getHours() + 1)

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        })

        mailer.sendMail({
            to: email,
            from: 'tosi.paulo@gmail.com',
            template: 'forgot_password',
            context: { token }
        }, (err) => {

            if(err){
                return res.status(400).send({ error: 'Cannot forgot password email' })
            }

            return res.send()
        })

    }catch(err) {
        return res.status(400).send({ error: 'Error forgot password'}) 
    }
})

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body

    try{

        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires')

        if (!user) {
            return res.status(400).send({ error: 'User not found' })
        }

        if(token !== user.passwordResetToken) {
            return res.status(400).send({ error: 'Token invalid' })
        }

        const now = new Date();

        if(now > user.passwordResetExpires) {
            return res.status(400).send({ error: 'Token expires' })
        }

        user.password = password;

        await user.save();

        res.send();


    }catch(err) {
        return res.status(400).send({ error: 'Error reset password' })
    }
})

module.exports = (app) => app.use('/auth', router)