const Task = require('../models/taskModel')

async function createTask(req, res) {
    try {
        const { taskTitle } = req.body
        if (!taskTitle) {
            return res.status(400).json({ message: 'O título da tarefa é obrigatório.' });
        }

        const newTask = new Task({
            user: req.user.id,
            taskTitle,
        })

        const savedTask = await newTask.save()

        res.status(201).json(savedTask);


    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao criar a tarefa.' })
    }



}


module.exports = {
    createTask
}