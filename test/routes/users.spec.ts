import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('User API', () => {

  it('GET /users should return list of users', async () => {
    const response = await request(app).get('/api/users')
    expect(response.status).toBe(200)

  })

  it('GET /user/1 should return 200 when user in db', async () => {
    const response = await request(app).get('/api/users/1')
    expect(response.status).toBe(200)

  })

  it('GET /user/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/users/2')
    expect(response.status).toBe(404)

  })
})
