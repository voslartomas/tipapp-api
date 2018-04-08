import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('League users API', () => {

  it('GET /leagues/:leagueId/users should return list of users', async () => {
    const response = await request(app).get('/api/leagues/1/users')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /user-payments/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/leagues/1/users/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /user-payments/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/leagues/1/users/2')
    expect(response.status).toBe(404)
  })

  it('PUT /leagues/:leagueId/users should return 204', async () => {
    const response = await request(app).put('/api/leagues/1/users/1').send({ paid: false })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /leagues/:leagueId/users should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/leagues/1/users/2').send({ paid: true })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /leagues/:leagueId/users should return 204 user found', async () => {
    const response = await request(app).delete('/api/leagues/1/users/1')
    expect(response.status).toBe(204)
  })
})
