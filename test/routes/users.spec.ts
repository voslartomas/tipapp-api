import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

const app = new Server().getApp()
describe('User API', () => {
  it('GET /users should return list of users', async () => {
    const response = await request(app).get('/api/users')
    
  })
})
