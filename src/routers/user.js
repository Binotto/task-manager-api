const express = require ('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//Finding all users
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (error){
        res.status(400).send(error)
    }
})

//Logout
router.post('/users/logout', auth,  async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        
        await req.user.save()

        res.send()
    }catch (error){
        res.status(500).send()
    }
})

//Logout of all
router.post('/users/logoutAll', auth, async (req, res) => {

    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch (error){
        res.status(500).send()
    }
})

//Finding a user by id
router.get('/users/:id', async (req, res) => {
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
router.post('/users', async (req, res) => { 
    const user = new User(req.body)

    try {   
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }catch (e) {
        res.status(400).send(e)
    }
    
})

//Updating user by id
router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'e-mail', 'password', 'age']
    const isValidateOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidateOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const user = await User.findById(req.params.id)
        
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

    
        if (!user) {
            return res.status(404).send()
        }

    res.send(user)
    }catch(error){
        res.status(400).send(error)
    }
})

//Deleting user by id
router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch (error){

    }
})

module.exports = router

