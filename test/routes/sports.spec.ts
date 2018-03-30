import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('Sport API', () => {

  it('GET /sports should return list of sports', async () => {
    const response = await request(app).get('/api/sports')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /sports/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/sports/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /sports/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/sports/2')
    expect(response.status).toBe(404)
  })

  it('POST /sports should return 200', async () => {
    const response = await request(app).post('/api/sports').send({ name: 'Ledni hok' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /sports should return 204', async () => {
    const response = await request(app).put('/api/sports/1').send({ name: 'Ledni hokej' })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /sports should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/sports/2').send({ username: 'Hazena' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /sports should return 204 user found', async () => {
    const response = await request(app).delete('/api/sports/1')
    expect(response.status).toBe(204)
  })
})
