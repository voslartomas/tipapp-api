import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('User settings API', () => {

  it('GET /user-settings should return list of user-settings', async () => {
    const response = await request(app).get('/api/user-settings')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /user-settings/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/user-settings/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /user-settings/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/user-settings/2')
    expect(response.status).toBe(404)
  })

  it('POST /user-settings should return 200', async () => {
    const response = await request(app).post('/api/user-settings').send({ userId: 1, emailBetNotification: true })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /user-settings should return 204', async () => {
    const response = await request(app).put('/api/user-settings/1').send({ userId: 1, emailBetNotification: false })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /user-settings should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/user-settings/2').send({ userId: 2, emailBetNotification: true })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /user-settings should return 204 user found', async () => {
    const response = await request(app).delete('/api/user-settings/1')
    expect(response.status).toBe(204)
  })
})
