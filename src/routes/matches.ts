import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Match from '../models/match.model'
import { IUser } from '../types/models.d'

@Path('/api/users')
export default class MachesController {
    @Inject
    private database: Database

}