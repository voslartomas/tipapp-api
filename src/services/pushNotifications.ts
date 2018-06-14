import Database from '../services/database'
import Cache from '../services/cache'
import { Inject } from 'typescript-ioc'
import * as config from 'config'
import * as moment from 'moment'
import * as request from 'request'

export default class PushNotifications {
  @Inject
  private database: Database

  @Inject
  private cache: Cache

  constructor() {
  }

  async getAll() {
    const leagues = await this.database.models.League.findAll()

    for (const x in leagues) {
      const league = leagues[x]
      const users = await this.database.models.LeagueUser.findAll({ where: { leagueId: league.id }})

      console.log(users.map(user => user.id))
      for (const i in users) {
        const leagueUser = users[i]
        // settings of user
        const user = await this.database.models.User.findById(leagueUser.userId)

        if (!user.pushId) {
          continue
        }

        const notifyBefore = moment(new Date()).add(user.notifyHours, 'hours').utc().format('YYYY-MM-DD HH:mm:ss')
        const now = moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss')
        console.log('User:', leagueUser.id, user.id, league.id)
        const matches = await this.database.query(`
          SELECT "Match".* FROM "Match" LEFT JOIN "UserBet" ON "Match"."id" = "UserBet"."matchId" AND "UserBet"."leagueUserId" = ${leagueUser.id}
          WHERE "UserBet"."matchId" IS NULL
          AND "Match"."leagueId" = ${league.id} AND "Match"."dateTime" > '${now}' AND "Match"."dateTime" < '${notifyBefore}'
        `, { type: this.database.QueryTypes.SELECT})

        console.log('count:', matches.length, matches)
        for (const m in matches) {
          const match = matches[m]
          const cacheKey = `${match.id}-${leagueUser.id}`
          const notified = await this.cache.get(cacheKey)
          if (!notified) {
            console.log('Notifying', user.firstName, user.pushId, match.id)
            this.sendPushNotification(user.pushId)
            await this.cache.set(cacheKey, { count: matches.length }, 24 * 60 * 60 * 60)
          } else {
            await this.cache.del(cacheKey)
          }
        }

        // console.log('Matches', matches, leagueUser.id)
      }
    }

    // return await this.database.query(``, { type: this.database.QueryTypes.SELECT})
  }

  sendPushNotification(deviceId) {
    request({
      url: 'https://api.appcenter.ms/v0.1/apps/t.voslar/tipapp/push/notifications',
      method: 'POST',
      json: true,
      headers: {
        'X-API-Token': config.get('appcenter_push_token'),
        'Content-Type': 'application/json',
      },
      body: {
          'notification_content' : {
              'name' : 'Tipovani',
              'title' : 'Je čas tipovat',
              'body' : 'Za chvíli začíná zápas a ty ještě nemáš natipováno!'
          },
            'notification_target' : {
              'type' : 'devices_target',
              'devices' : [deviceId]
            }
        }
    })
    console.log({
        'notification_content' : {
            'name' : 'Tipovani',
            'title' : 'Je čas tipovat',
            'body' : 'Za chvíli začíná zápas a ty ještě nemáš natipováno!'
        },
          'notification_target' : {
            'type' : 'devices_target',
            'devices' : [deviceId]
          }
      })
  }

  async sendPushNotifications() {
    // add API call to appcenter push notification
    await this.getAll()
  }
}
