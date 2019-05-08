const express = require ('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


//Finding a task by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    console.log(_id)
    try{
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()

        }

        res.send(task)
    }catch (error) {
        res.status(500).send()
    }

})

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(201).send(req.user.tasks)
    }catch (error) {
        res.status(500).send(error)
    }
})

//Creating a new Task
router.post('/tasks', auth, async(req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {   
        await task.save()
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e)
    }

})

//Updating task by id
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidateOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidateOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        
    
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

    res.send(task)
    }catch(error){
        res.status(400).send(error)
    }

})

//Deleting task by id
router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch (error){

    }
})

module.exports = router