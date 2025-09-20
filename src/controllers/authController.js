const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    try {
        const { userName, email, password } = req.body

        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos.' })
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: 'Já existe um usuário com este e-mail cadastrado.' })
        }

        const newUser = new User({
            userName,
            email,
            password,
        });

        const savedUser = await newUser.save()

        res.status(201).json({
            id: savedUser._id,
            name: savedUser.userName,
            email: savedUser.email,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' })
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' })
    }
    const existingUser = await User.findOne({ email: email })
    if (!existingUser) {
        return res.status(400).json({ message: 'Credenciais inválidas' })
    }
    const isMatch = await bcrypt.compare(password, existingUser.password)
    if (isMatch) {
        const payload = {
            id: existingUser._id,
            userName: existingUser.userName
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: 'Login bem-sucedido!',
            token: token,
            user: {
                id: existingUser._id,
                userName: existingUser.userName
            }
        });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas' })
    }


}

module.exports = {
    registerUser,
    loginUser

};