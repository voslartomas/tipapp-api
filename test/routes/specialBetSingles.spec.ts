import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('Special bet singles API', () => {

  it('GET /bets/single should return list of special single bets', async () => {
    const response = await request(app).get('/api/bets/single')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /special-bet-results/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/bets/single/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /special-bet-results/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/bets/single/2')
    expect(response.status).toBe(404)
  })

  it('POST /bets/single should return 200', async () => {
    const response = await request(app).post('/api/bets/single').send({ key: 'test_key' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /bets/single should return 204', async () => {
    const response = await request(app).put('/api/bets/single/1').send({ key: 'real_key' })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /bets/single should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/bets/single/2').send({ key: 'random_key' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /bets/single should return 204 user found', async () => {
    const response = await request(app).delete('/api/bets/single/1')
    expect(response.status).toBe(204)
  })
})
