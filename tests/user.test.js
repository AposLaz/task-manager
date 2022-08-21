const request = require('supertest')
const app = require('../src/app')

beforeEach(()=>{
    console.log('beforeEach')
})

afterEach(()=>{
    console.log('afterEach')
})

test('Sign Up a new user',async ()=>{
    await request(app)
            .post('/users')
            .send({
                name: 'Apostolos Lazidis',
                email: 'aplazidisa@gmail.com',
                password: '1234567',
                age: 26,
                role: 'ADMIN'
            }).expect(201)
})