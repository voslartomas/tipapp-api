import * as config from 'config'
import { Server } from '../../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

jest.mock('../../src/services/database')

// let app = undefined
const app = new Server().getApp()
describe('User API', () => {

  it('GET /users should return list of users', async () => {
    const response = await request(app).get('/api/users')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /users/1 should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/users/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /users/2 should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/users/2')
    expect(response.status).toBe(404)
  })

  it('GET /users/username/admin should return 200 when user is in db', async () => {
    const response = await request(app).get('/api/users/username/admin')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('GET /users/username/non-existing should return 404 when user not found in db', async () => {
    const response = await request(app).get('/api/users/username/non-existing')
    expect(response.status).toBe(404)
  })

  it('POST /users should return 200', async () => {
    const response = await request(app).post('/api/users').send({ username: 'regular', 'firstName': 'John' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /users should return 204', async () => {
    const response = await request(app).put('/api/users/1').send({ username: 'updated regular', 'firstName': 'John updated' })
    expect(response.status).toBe(204)
    expect(response.body).toMatchSnapshot()
  })

  it('PUT /users should return 200 and creates new user if does not exist already', async () => {
    const response = await request(app).put('/api/users/2').send({ username: 'new regular', 'firstName': 'John' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot()
  })

  it('DELETE /users should return 204 user found', async () => {
    const response = await request(app).delete('/api/users/1')
    expect(response.status).toBe(204)
  })
})
