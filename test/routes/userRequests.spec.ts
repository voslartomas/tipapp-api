import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('User request API', () => {

  it('GET /user-requests should return list of user-requests', async () => {
    const response = await request(app).get('/api/user-requests')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /user-requests/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/user-requests/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /user-requests/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/user-requests/2')
    expect(response.status).toBe(404)
  })

  it('POST /user-requests should return 200', async () => {
    const response = await request(app).post('/api/user-requests').send({ userId: 1, accepted: true })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /user-requests should return 204', async () => {
    const response = await request(app).put('/api/user-requests/1').send({ userId: 2, accepted: false })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /user-requests should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/user-requests/2').send({ userId: 1, accepted: true })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /user-requests should return 204 user found', async () => {
    const response = await request(app).delete('/api/user-requests/1')
    expect(response.status).toBe(204)
  })
})
