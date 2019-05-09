const express = require ('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()

//Finding profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user , token })
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

//Creating a new user
router.post('/users', async (req, res) => { 
    const user = new User(req.body)

    try {   
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }catch (e) {
        res.status(400).send(e)
    }
    
})

//Updating user
router.patch('/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'e-mail', 'password', 'age']
    const isValidateOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidateOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    }catch(error){
        res.status(400).send(error)
    }
})

//Deleting user
router.delete('/users/me', auth, async (req, res) => {
    try{
        sendCancelationEmail(req.user.email, req.user.name)
        req.user.remove()
        res.send(req.user)
    }catch (error){
        res.status(500).send()
    }
})

const avatar = multer ({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)/)){
            return cb(new Error('File must be a jpg, jpeg or png.'))
        }

        cb(undefined, true)
    }

})
router.post('/users/me/avatar', auth, avatar.single('avatar'), async (req, res) => {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        req.user.avatar = buffer
        await req.user.save()
        res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, avatar.single('avatar'), async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send('Your profile image has been deleted.')
})

router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-type', 'image/png')
        res.send(user.avatar)
    }catch(error){
        res.status(404).send()
    }
})

module.exports = router

