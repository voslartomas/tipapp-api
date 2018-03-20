import { Server } from './server'

export const start = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const server = new Server()
    server.start()
        .then(resolve)
        .catch(reject)

    const graceful = () => {
      server.stop().then(() => process.exit(0))
    }

    // Stop graceful
    process.on('SIGTERM', graceful)
    process.on('SIGINT', graceful)
  })
}
