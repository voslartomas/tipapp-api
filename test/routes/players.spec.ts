import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('Player API', () => {

  it('GET /players should return list of players', async () => {
    const response = await request(app).get('/api/players')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /players/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/players/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /players/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/players/2')
    expect(response.status).toBe(404)
  })

  it('POST /players should return 200', async () => {
    const response = await request(app).post('/api/players').send({ name: 'Jaromir Jar' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /players should return 204', async () => {
    const response = await request(app).put('/api/players/1').send({ name: 'Jaromir Jagr' })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /players should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/players/2').send({ username: 'Sidney Crosby' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /players should return 204 user found', async () => {
    const response = await request(app).delete('/api/players/1')
    expect(response.status).toBe(204)
  })
})
