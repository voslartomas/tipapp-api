import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('User bet API', () => {

  it.skip('GET /user-bets should return list of user-bets', async () => {
    const response = await request(app).get('/api/leagues/1/user/bets/match')
    console.log(response)
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /user-bets/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/leagues/1/user/bets/match/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /user-bets/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/leagues/1/user/bets/match/2')
    expect(response.status).toBe(404)
  })

  it.skip('POST /user-bets should return 200', async () => {
    const response = await request(app).post('/api/leagues/1/user/bets/match').send({ name: 'Team1 vs Team2' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it.skip('PUT /user-bets should return 204', async () => {
    const response = await request(app).put('/api/leagues/1/user/bets/match/1').send({ name: 'Zlin vs Mountfield' })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it.skip('PUT /user-bets should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/leagues/1/user/bets/match/2').send({ username: 'Vitkovice vs Sparta' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /user-bets should return 204 user found', async () => {
    const response = await request(app).delete('/api/leagues/1/user/bets/match/1')
    expect(response.status).toBe(204)
  })
})
