const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, taskController.createTask);

module.exports = router;