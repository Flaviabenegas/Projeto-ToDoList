const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: [true, 'Sua tarefa precisa de um titulo'],
    },
    taskCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;