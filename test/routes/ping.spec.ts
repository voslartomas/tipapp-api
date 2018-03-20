import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

const app = new Server().getApp()
describe('Basic API', () => {
  it('should return 200 for health check', async () => {
    const response = await request(app).get('/ping')
    expect(response.status).toBe(200)
    expect(response.text).toMatch('pong')
  })
})
