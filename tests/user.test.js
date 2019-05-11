const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Matheus Teste',
    email: 'matheusteste@example.com',
    password: '123mudar',
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save() 
})

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Matheus',
        email: 'matheus@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    })
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'bruno@example.com',
        password: 'teste123'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', 'Bearer '+userOne.tokens[0].token)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', 'Bearer '+userOne.tokens[0].token)
    .send(userOne)
    .expect(200)
})

test('Should not delete account for unauthenticated user.', async () => {
    await request(app)
    .get('/user/me')
    .send(userOne)
    .expect(404)
})
