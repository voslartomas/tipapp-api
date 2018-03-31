import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('Login API', () => {
  it('POST /login should return 200 and JWT token', async () => {
    const response = await request(app).post('/login').send({ username: 'tvoslar', password: 'test' })
    expect(response.status).toBe(200)

    expect(response.body).toMatchSnapshot()
  })

  it('POST /login should return 500 when user type wrong password', async () => {
    const response = await request(app).post('/login').send({ username: 'tvoslar', password: 'wrongpass' })
    expect(response.status).toBe(500)
    expect(response.body).toMatchSnapshot()
  })

  it('POST /login should return 500 when user not found', async () => {
    const response = await request(app).post('/login').send({ username: 'none', password: 'test' })
    expect(response.status).toBe(500)
    expect(response.body).toMatchSnapshot()
  })
})
