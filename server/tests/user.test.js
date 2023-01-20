const request = require('supertest')
const app = require('../src/app')
const UserModel = require('../src/model/v2/users')
const {AdminUserId,SimpleUserId,AdminUser,SimpleUser,InitializeDatabase} = require('./db')

beforeEach(async ()=>{
    await InitializeDatabase()
})

test('Sign Up a non Existing user', async ()=>{
     await request(app)
            .post('/users')
            .send(SimpleUser).expect(201)
})

test('Sign Up an Existing User', async ()=>{
    await request(app)
           .post('/users')
           .send(AdminUser).expect(400)
})


test('Login existing user', async ()=>{
    await request(app)
            .post('/users/login')
            .send(AdminUser).expect(200)
})

test('Login Non existing user', async ()=>{
    await request(app)
            .post('/users/login')
            .send({
                email: 'ap@mmm.com',
                password: 'NonSee'
            }).expect(403)
})

test('GET my Authorize Profile', async ()=>{
        await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${AdminUser.tokens[0].token}`)
            .send()
            .expect(200)
})

test('Should not get profile for UnAuthorize User', async()=>{
    await request(app)
            .get('/users/me')
            .send()
            .expect(401)
})

test('Deleme My Authorize Account', async ()=>{
    await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${AdminUser.tokens[0].token}`)
            .expect(200)
})

test('Should Not Delete My Account for UnAuthorize User', async ()=>{
    await request(app)
            .delete('/users/me')
            .expect(401)
})

test('Get All users only from Admin', async()=>{
    await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${AdminUser.tokens[0].token}`)
            .send()
            expect(200)
})

test('Should not Get All Users if User is not admin', async ()=>{
    await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${SimpleUser.tokens[0].token}`)
            .send()
            .expect(401)
})





