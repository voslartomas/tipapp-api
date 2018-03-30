import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('User special bet API', () => {

  it('GET /user-special-bets should return list of user-special-bets', async () => {
    const response = await request(app).get('/api/user-special-bets')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /user-special-bets/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/user-special-bets/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /user-special-bets/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/user-special-bets/2')
    expect(response.status).toBe(404)
  })

  it('POST /user-special-bets should return 200', async () => {
    const response = await request(app).post('/api/user-special-bets').send({ userId: 1, specialBet: 3 })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /user-special-bets should return 204', async () => {
    const response = await request(app).put('/api/user-special-bets/1').send({ userId: 1, specialBet: 2 })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /user-special-bets should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/user-special-bets/2').send({ userId: 3, specialBet: 4 })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /user-special-bets should return 204 user found', async () => {
    const response = await request(app).delete('/api/user-special-bets/1')
    expect(response.status).toBe(204)
  })
})
