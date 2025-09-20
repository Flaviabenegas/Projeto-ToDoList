const app = require('./app')
const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT

const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')

app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)


app.listen(PORT, () => {
    console.log(`rodando na porta: ${PORT}`)

});