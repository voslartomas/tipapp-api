import { Path, GET } from 'typescript-rest'

@Path('/ping')
export class PingController {
  @GET
  sayPong(): string {
    return 'pong'
  }
}
