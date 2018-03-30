import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('Match scorer API', () => {

  it('GET /match-scorers should return list of match-scorers', async () => {
    const response = await request(app).get('/api/match-scorers')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /match-scorers/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/match-scorers/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /match-scorers/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/match-scorers/2')
    expect(response.status).toBe(404)
  })

  it('POST /match-scorers should return 200', async () => {
    const response = await request(app).post('/api/match-scorers').send({ scorerId: 1, numberOfGoals: 3 })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /match-scorers should return 204', async () => {
    const response = await request(app).put('/api/match-scorers/1').send({ scorerId: 2, numberOfGoals: 2 })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /match-scorers should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/match-scorers/2').send({ scrorerId: 1, numberOfGoals: 32 })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /match-scorers should return 204 user found', async () => {
    const response = await request(app).delete('/api/match-scorers/1')
    expect(response.status).toBe(204)
  })
})
