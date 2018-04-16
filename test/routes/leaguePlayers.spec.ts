import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('League players API', () => {

  it('GET /league/:leagueId/players should return list of users', async () => {
    const response = await request(app).get('/api/league/1/players')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /players/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/league/1/players/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET players/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/league/1/players/2')
    expect(response.status).toBe(404)
  })

  it('PUT /league/:leagueId/players should return 204', async () => {
    const response = await request(app).put('/api/league/1/players/1').send({ paid: false })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /league/:leagueId/players should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/league/1/players/2').send({ paid: true })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /league/:leagueId/players should return 204 user found', async () => {
    const response = await request(app).delete('/api/league/1/players/1')
    expect(response.status).toBe(204)
  })
})
