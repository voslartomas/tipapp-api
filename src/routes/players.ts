import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Player from '../models/player.model'
import { IPlayer } from '../types/models.d'

@Path('/api/players')
export default class PlayersController {
    @Inject
    private database: Database

    @GET
    async getPlayers(): Promise<IPlayer[]> {
        return await this.database.models.Player.findAll({})
    }

    @GET
    @Path(':id')
    async getPlayer(@PathParam('id') playerId: number): Promise<IPlayer> {
        try {
        const player = await this.database.models.Player.findById(playerId, {})

        if (!player) {
            throw new Error('not found')
        }

        return player
        } catch (e) {
        throw new Errors.NotFoundError('User not found.')
        }
    }

    @POST
    // TODO fix user: IUser, error while running tests
    async createPlayer(player: any): Promise<IPlayer> {
        return await this.database.models.Player.create(player)
    }

    @PUT
    @Path(':id')
    async updatePlayer(@PathParam('id') playerId: number, player: any): Promise<IPlayer> {
        const dbPlayer = await this.database.models.Player.findById(playerId)

        if (dbPlayer) {
        return await dbPlayer.update(player)
        } else {
        return await this.database.models.Player.create(player)
        }
    }

    @DELETE
    @Path(':id')
    async deletePlayer(@PathParam('id') playerId: number): Promise<void> {
        const dbPlayer = await this.database.models.Player.findById(playerId)

        if (dbPlayer) {
        await dbPlayer.destroy()
        }
    }

}