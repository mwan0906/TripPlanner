const expect = require('expect')
const request = require('supertest')
const { app, init } = require('../app')

before(init)

describe('GET /api', () => {
    it("Should say hello", done => {
        request('app')
            .get('/api')
            .expect(200)
            .expect((res) => {
                console.log(res.body)
            }).end(done)
    })
})