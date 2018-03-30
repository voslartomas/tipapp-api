import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('Special bet API', () => {

  it('GET /special-bets should return list of special-bets', async () => {
    const response = await request(app).get('/api/special-bets')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /special-bets/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/special-bets/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /special-bets/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/special-bets/2')
    expect(response.status).toBe(404)
  })

  it('POST /special-bets should return 200', async () => {
    const response = await request(app).post('/api/special-bets').send({ key: 'test_key' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /special-bets should return 204', async () => {
    const response = await request(app).put('/api/special-bets/1').send({ key: 'real_key' })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /special-bets should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/special-bets/2').send({ key: 'random_key' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /special-bets should return 204 user found', async () => {
    const response = await request(app).delete('/api/special-bets/1')
    expect(response.status).toBe(204)
  })
})
