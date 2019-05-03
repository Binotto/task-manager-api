const express = require ('express')
const Task = require('../models/task')
const router = new express.Router()


//Finding a task by id
router.get('/tasks/:id', async (req, res) => {
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
router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }catch (error) {
        res.status(500).send(error)
    }
})

//Creating a new Task
router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try {   
        await task.save()
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e)
    }

})

//Updating task by id
router.patch('/tasks/:id', async (req, res) => {
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

//Deleting task by id
router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch (error){

    }
})

module.exports = router