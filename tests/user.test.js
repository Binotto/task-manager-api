const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Matheus Teste',
    email: 'matheusteste@example.com',
    password: '123mudar'
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
