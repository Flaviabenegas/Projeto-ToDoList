
const API_BASE_URL = 'http://localhost:3000/api'
const registerForm = document.querySelector('#register-form')
const btnAddTask = document.getElementById('add-task')
const ano = document.getElementById('ano')

ano.textContent = new Date().getFullYear()

function showEditForm(taskId) {
    const taskElement = document.querySelector(`li[data-task-id="${taskId}"]`)
    if (taskElement) {
        const displayView = taskElement.querySelector('.task-display');
        const editForm = taskElement.querySelector('.edit-form');
        displayView.classList.add('hide');
        editForm.classList.remove('hide');
    }
}

async function handleSave(taskId) {
    const token = localStorage.getItem('authToken');
    const taskElement = document.querySelector(`li[data-task-id="${taskId}"]`)
    if (!taskElement) return;
    const input = taskElement.querySelector('.task-title-input');
    const newTitle = input.value;
    if (!newTitle) return alert('O título não pode estar vazio.');

    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskTitle: newTitle })
        });
        if (response.ok) {
            fetchTasks()
        } else {
            alert('Não foi possível salvar a tarefa')
        }
    } catch (error) {
        console.error('Erro ao salvar tarefa:', error)
    }
}
async function handleDelete(taskId) {

    try {
        const userConfirmed = confirm("Deseja mesmo apagar a tarefa?")

        if (userConfirmed) {
            const token = localStorage.getItem('authToken')

            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });


            if (response.ok) {
                alert('Tarefa deletada com sucesso!')
                fetchTasks()
            } else {

                if (response.status === 404) {
                    alert('Erro: Tarefa não encontrada ou não pertence a você.')
                } else {

                    const data = await response.json();
                    alert(data.message || 'Não foi possível apagar a tarefa.')
                }
            }
        }

    } catch (error) {
        console.error('Erro ao deletar tarefa:', error)
        alert('Falha na comunicação com o servidor.')
    }
}

if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const userNameValue = document.querySelector('#userName').value
        const emailValue = document.querySelector('#email').value
        const passwordValue = document.querySelector('#password').value

        const userData = { userName: userNameValue, email: emailValue, password: passwordValue }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json()

            if (response.ok) {
                alert('Usuário criado com sucesso! Faça o login.')
                window.location.href = 'index.html';
            } else {
                alert(data.message)
            }

        } catch (error) {
            console.error('Erro de rede:', error)
            alert('Falha na comunicação com o servidor. Tente novamente mais tarde.')
        }
    });
}

const loginForm = document.querySelector('#login-form')

if (loginForm) {

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const emailValue = document.querySelector('#email').value
        const passwordValue = document.querySelector('#password').value

        const loginData = { email: emailValue, password: passwordValue }

        try {

            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });


            const data = await response.json()

            if (response.ok) {

                alert('Login bem-sucedido!')


                localStorage.setItem('authToken', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                window.location.href = 'tarefas.html'
            } else {

                alert(data.message)
            }

        } catch (error) {
            console.error('Erro de rede:', error)
            alert('Falha na comunicação com o servidor. Tente novamente mais tarde.')
        }
    });
}


async function fetchTasks() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = 'index.html'
            return;
        }
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const tasks = await response.json()
            renderTasks(tasks)
        } else {
            localStorage.removeItem('authToken')
            window.location.href = 'index.html'
        }
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error)
    }
}

function renderTasks(tasks) {
    const taskList = document.querySelector('#task-list')
    taskList.innerHTML = ''
    tasks.forEach(task => {
        const li = document.createElement('li')
        li.dataset.taskId = task._id
        li.dataset.completed = task.taskCompleted

        const displayView = document.createElement('div')
        displayView.classList.add('task-display')
        const taskText = document.createElement('span')
        taskText.textContent = task.taskTitle
        if (task.taskCompleted) {
            taskText.classList.add('task-completed')
        }
        const actionsDiv = document.createElement('div')
        actionsDiv.classList.add('task-actions')
        const completeButton = document.createElement('button')
        completeButton.textContent = task.taskCompleted ? '✅' : '☑️'
        completeButton.classList.add('complete-btn')
        const editButton = document.createElement('button')
        editButton.textContent = '✏️'
        editButton.classList.add('edit-btn')
        const deleteButton = document.createElement('button')
        deleteButton.textContent = '🗑️'
        deleteButton.classList.add('delete-btn')
        actionsDiv.appendChild(completeButton)
        actionsDiv.appendChild(editButton)
        actionsDiv.appendChild(deleteButton)
        displayView.appendChild(taskText)
        displayView.appendChild(actionsDiv)

        const editForm = document.createElement('form')
        editForm.classList.add('edit-form', 'hide')
        const input = document.createElement('input')
        input.type = 'text';
        input.value = task.taskTitle
        input.classList.add('task-title-input')
        const saveButton = document.createElement('button')
        saveButton.type = 'submit'
        saveButton.textContent = 'Salvar'
        saveButton.classList.add('btn')
        editForm.appendChild(input)
        editForm.appendChild(saveButton)

        li.appendChild(displayView)
        li.appendChild(editForm)
        taskList.appendChild(li)
    });
}

function showEditForm(taskId) {
    const taskElement = document.querySelector(`li[data-task-id="${taskId}"]`)
    if (taskElement) {
        const displayView = taskElement.querySelector('.task-display')
        const editForm = taskElement.querySelector('.edit-form')
        displayView.classList.add('hide')
        editForm.classList.remove('hide')
    }
}

async function handleSave(taskId) {
    const token = localStorage.getItem('authToken')
    const taskElement = document.querySelector(`li[data-task-id="${taskId}"]`)
    if (!taskElement) return;
    const input = taskElement.querySelector('.task-title-input')
    const newTitle = input.value;
    if (!newTitle) return alert('O título não pode estar vazio.')
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskTitle: newTitle })
        });
        if (response.ok) {
            fetchTasks()
        } else {
            alert('Não foi possível salvar a tarefa')
        }
    } catch (error) {
        console.error('Erro ao salvar tarefa:', error)
    }
}

async function handleDelete(taskId) {
    if (confirm("Deseja apagar esta tarefa?")) {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                fetchTasks();
            } else {
                alert('Não foi possível apagar a tarefa.')
            }
        } catch (error) {
            console.error('Erro ao apagar tarefa:', error)
        }
    }
}

async function handleComplete(taskId, currentStatus) {
    try {
        const token = localStorage.getItem('authToken')
        const newStatus = { taskCompleted: !currentStatus }
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(newStatus)
        });
        if (response.ok) {
            fetchTasks()
        } else {
            alert('Não foi possível atualizar o status da tarefa.');
        }
    } catch (error) {
        console.error('Erro ao completar tarefa:', error)
    }
}

async function handleAddTask(title) {
    try {
        const token = localStorage.getItem('authToken')
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ taskTitle: title })
        });
        if (response.ok) {
            document.querySelector('#taskTitle').value = ''
            fetchTasks();
        } else {
            alert('Não foi possível criar a tarefa.')
        }
    } catch (error) {
        console.error('Erro ao criar tarefa:', error)
    }
}

const taskList = document.querySelector('#task-list')
if (taskList) {

    const addTaskForm = document.querySelector('#add-task-form')
    const logoutBtn = document.querySelector('#logout-btn')

    const token = localStorage.getItem('authToken')
    if (!token) {
        alert('Acesso negado. Faça o login.')
        window.location.href = 'index.html'
    } else {
        fetchTasks()
        displayUserName()
    }

    const addTaskBtn = document.getElementById('add-task')
    const newTaskInputContainer = document.getElementById('new-tasks')
    const taskTitleInput = document.querySelector('#taskTitle')

    if (addTaskBtn) {


        const addTaskForm = document.getElementById('add-task-form')

        addTaskForm.addEventListener('click', (event) => {
            event.preventDefault()

            const isInputHidden = newTaskInputContainer.classList.contains('hide')

            if (isInputHidden) {


                newTaskInputContainer.classList.remove('hide')
                addTaskBtn.textContent = 'Salvar Tarefa'
                taskTitleInput.focus();

            } else {

                const title = taskTitleInput.value.trim()

                if (!title) {
                    return alert('O título da tarefa é obrigatório.')
                }

                handleAddTask(title)

                taskTitleInput.value = ''
                newTaskInputContainer.classList.add('hide')

                addTaskBtn.textContent = 'Adicionar Nova Tarefa'
            }
        });
    }


    taskList.addEventListener('click', (event) => {
        const target = event.target
        const li = target.closest('li')
        if (!li) return
        const taskId = li.dataset.taskId;
        const taskCompleted = li.dataset.completed === 'true'

        if (target.matches('.delete-btn')) {
            handleDelete(taskId)
        } else if (target.matches('.complete-btn')) {
            handleComplete(taskId, taskCompleted)
        } else if (target.matches('.edit-btn')) {
            showEditForm(taskId)
        }
    });


    taskList.addEventListener('submit', (event) => {
        event.preventDefault()
        if (event.target.matches('.edit-form')) {
            const li = event.target.closest('li')
            if (!li) return
            const taskId = li.dataset.taskId;
            handleSave(taskId)
        }
    });


    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authToken')
        window.location.href = 'index.html'
    });
}

function displayUserName() {

    const userString = localStorage.getItem('user');

    if (userString) {

        const user = JSON.parse(userString);

        const userNameElement = document.querySelector('#user-name-display')

        if (userNameElement) {

            userNameElement.textContent = user.userName;
        }
    }
}