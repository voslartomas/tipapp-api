import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
  describe('Match API', () => {

  it('GET /matches should return list of matches', async () => {
    const response = await request(app).get('/api/matches')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /matches/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/matches/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /matches/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/matches/2')
    expect(response.status).toBe(404)
  })

  it('POST /matches should return 200', async () => {
    const response = await request(app).post('/api/matches').send({ name: 'Regular match' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it.only('PUT /matches should return 204', async () => {
    const response = await request(app).put('/api/matches/1').send({ name: 'Update match', scorers: [1, 2], scorerId: 1, homeScore: 2, awayScore: 3 })
    console.log(response)
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /matches should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/matches/2').send({ username: 'Good match' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /matches should return 204 user found', async () => {
    const response = await request(app).delete('/api/matches/1')
    expect(response.status).toBe(204)
  })
})
