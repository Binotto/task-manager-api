const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//Finding all users
app.get('/users', async (req, res) => {
    
    try{
        const users = await User.find({})
        res.status(201).send(users)
    }catch (error) {
        res.status(500).send(error)
    }

})

//Finding a user by id
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const user = await User.findById(_id)

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch (error) {
        res.status(500).send()
    }
})

//Creating a new user
app.post('/users', async (req, res) => { 
    const user = new User(req.body)

    try {   
        await user.save()
        res.status(201).send(user)
    }catch (e) {
        res.status(400).send(e)
    }
    
})

//Updating user by id
app.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'e-mail', 'password', 'age']
    const isValidateOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidateOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
    if (!user) {
        return res.status(404).send()
    }

    res.send(user)
    }catch(error){
        res.status(400).send(error)
    }
})

//Finding a task by id
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send()

        }

        res.send(task)
    }catch (error) {
        res.status(500).send()
    }

})

//Finding all tasks
app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }catch (error) {
        res.status(500).send(error)
    }
})

//Creating a new Task
app.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try {   
        await task.save()
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e)
    }

})

//Updating task by id
app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidateOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidateOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
    if (!task) {
        return res.status(404).send()
    }

    res.send(task)
    }catch(error){
        res.status(400).send(error)
    }

})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})