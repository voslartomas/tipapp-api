import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('Team API', () => {

  it('GET /teams should return list of teams', async () => {
    const response = await request(app).get('/api/teams')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /teams/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/teams/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /teams/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/teams/2')
    expect(response.status).toBe(404)
  })

  it('POST /teams should return 200', async () => {
    const response = await request(app).post('/api/teams').send({ name: 'HC Mountfield Hradec' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /teams should return 204', async () => {
    const response = await request(app).put('/api/teams/1').send({ name: 'HC Mountfield Hradec Kralove' })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /teams should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/teams/2').send({ username: 'Zlin' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /teams should return 204 user found', async () => {
    const response = await request(app).delete('/api/teams/1')
    expect(response.status).toBe(204)
  })
})
