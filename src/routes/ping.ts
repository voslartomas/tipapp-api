import { Path, GET } from 'typescript-rest'

@Path('/ping')
export class PingController {
  @GET
  sayPong(): string {
    return 'pong'
  }

  @GET
  @Path('/timestamp')
  getCurrentTimestamp(): number {
    return new Date().getTime()
  }
}
