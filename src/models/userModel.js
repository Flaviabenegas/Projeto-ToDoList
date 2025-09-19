const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Por favor, informe seu nome.'],
    },
    email: {
        type: String,
        required: [true, 'Por favor, informe um e-mail.'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} não é um e-mail válido.`
        },
    },
    password: {
        type: String,
        required: [true, 'Por favor, informe uma senha.'],
        minlength: 6,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;
