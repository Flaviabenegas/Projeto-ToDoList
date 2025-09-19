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

async function getTasks(req, res) {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao visulizar a tarefa.' })
    }

}

async function updateTask(req, res) {
    try {
        const { id } = req.params
        const novosDados = req.body
        const userId = req.user.id
        const updateTask = await Task.findOneAndUpdate({ _id: id, user: userId }, novosDados, { new: true })
        if (updateTask) {
            res.status(200).json(updateTask)
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro Interno' })
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params
        const userId = req.user.id
        const deleteTask = await Task.findOneAndDelete({ _id: id, user: userId })
        if (deleteTask) {
            res.status(200).json({ message: 'tarefa deletada com sucesso' })
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' })
        }
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        res.status(500).json({ message: 'Erro Interno' });
    }
}




module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}