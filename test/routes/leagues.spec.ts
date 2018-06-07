import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod, ServiceContext } from 'typescript-rest'
import { Container } from 'typescript-ioc'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('League API', () => {

  it('GET /leagues should return list of leagues', async () => {
    const response = await request(app).get('/api/leagues')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /leagues matches should return list of matches', async () => {
    const response = await request(app).get('/api/leagues/1/matches')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /leagues players should return list of players', async () => {
    const response = await request(app).get('/api/leagues/1/players')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /leagues teams should return list of teams', async () => {
    const response = await request(app).get('/api/leagues/1/teams')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /leagues/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/leagues/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /leagues/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/leagues/2')
    expect(response.status).toBe(404)
  })

  it('POST /leagues should return 200', async () => {
    const response = await request(app).post('/api/leagues').send({ name: 'NHL' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /leagues should return 204', async () => {
    const response = await request(app).put('/api/leagues/1').send({ name: 'NHL 2018' })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /leagues should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/leagues/2').send({ username: 'NHL 2019' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /leagues should return 204 user found', async () => {
    const response = await request(app).delete('/api/leagues/1')
    expect(response.status).toBe(204)
  })
})
