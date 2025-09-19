const User = require('../models/userModel')

async function registerUser(req, res) {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Já existe um usuário com este e-mail cadastrado.' });
        }

        const newUser = new User({
            userName,
            email,
            password,
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            id: savedUser._id,
            name: savedUser.user_name,
            email: savedUser.email,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
}

module.exports = {
    registerUser,

};