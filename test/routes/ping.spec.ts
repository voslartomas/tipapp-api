import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

let app = undefined
describe('Basic API', () => {
  beforeAll(() => {
    app = new Server().getApp()
  })

  it('should return 200 for health check', async () => {
    const response = await request(app).get('/ping')
    expect(response.status).toBe(200)
    expect(response.text).toMatch('pong')
  })
})
