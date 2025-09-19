const app = require('./app');

require('dotenv').config();

const PORT = process.env.PORT;

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`rodando na porta: ${PORT}`);

});