import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

const app = new Server().getApp()
describe('User API', () => {
  beforeAll((done) => {
    done()
  })

  it('GET /users should return list of users', async () => {
    const response = await request(app).get('/api/users')
    expect(response.status).toBe(200)

  })

  it('GET /user/100 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/users/1')
    expect(response.status).toBe(404)

  })
})
