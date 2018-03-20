import * as config from 'config'
import { Server } from '../src/server'
import * as request from 'supertest'
import { Server as RestServer, HttpMethod } from 'typescript-rest'

describe('App server', () => {
  it('it should start and stop server', async () => {
    const server = new Server()
    await server.start()
    await server.stop()
  })

  it('should return true, when stoping server without start', async () => {
    const server = new Server()
    const response = await server.stop()

    expect(response).toBeTruthy
  })
})
