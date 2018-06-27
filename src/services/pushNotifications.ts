import Database from '../services/database'
import Cache from '../services/cache'
import { Inject, Singleton } from 'typescript-ioc'
import * as config from 'config'
import * as moment from 'moment'
import * as request from 'request'

@Singleton
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

      for (const i in users) {
        const leagueUser = users[i]
        // settings of user
        const user = await this.database.models.User.findById(leagueUser.userId)

        if (!user.pushId) {
          continue
        }

        const notifyBefore = moment(new Date()).add(user.notifyHours, 'hours').utc().format('YYYY-MM-DD HH:mm:ss')
        const now = moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss')

        const matches = await this.database.query(`
          SELECT "Match".* FROM "Match" LEFT JOIN "UserBet" ON "Match"."id" = "UserBet"."matchId" AND "UserBet"."leagueUserId" = ${leagueUser.id}
          WHERE "UserBet"."matchId" IS NULL
          AND "Match"."leagueId" = ${league.id} AND "Match"."dateTime" > '${now}' AND "Match"."dateTime" < '${notifyBefore}'
        `, { type: this.database.QueryTypes.SELECT})

        console.log('Count: ', matches.length)
        for (const m in matches) {
          const match = matches[m]
          const cacheKey = `${match.id}-${leagueUser.id}`
          const notified = await this.cache.get(cacheKey)
          console.log(match.id, notified, cacheKey)
          if (!notified) {
            console.log('Notifying', user.firstName, user.pushId, match.id)
            const campaign = `${user.firstName} ${user.lastName} ${match.id}`
            this.sendPushNotification(campaign, user.pushId, 'tiapp') // Android
            this.sendPushNotification(campaign, user.pushId, 'tipapp') // iOS
            await this.cache.set(cacheKey, { count: matches.length }, 24 * 60 * 60 * 60)
          }
        }
      }
    }
  }

  sendPushNotification(campaign, deviceId, app) {
    request({
      url: `https://api.appcenter.ms/v0.1/apps/t.voslar/${app}/push/notifications`,
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
              'body' : 'Za chvíli začíná zápas a ty ještě nemáš natipováno!',
              'custom_data': { sound: 'default' }
          },
            'notification_target' : {
              'type' : 'devices_target',
              'devices' : [deviceId]
            }
        }
    })
  }

  async sendPushNotifications() {
    // add API call to appcenter push notification
    await this.getAll()
  }
}
