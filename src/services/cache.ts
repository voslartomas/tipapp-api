import * as redis from 'redis'
import { Inject, Singleton } from 'typescript-ioc'
import AppLogger from './logger'
import * as config from 'config'
import * as Bluebird from 'bluebird'

const CACHE_PREFIX = 'offertron:'

@Singleton
export default class Cache {
  @Inject
  private logger: AppLogger

  readonly client: any

  constructor() {
    Bluebird.promisifyAll(redis.RedisClient.prototype)
    this.client = <any>redis.createClient(config.get('redis.port'), config.get('redis.host'))
  }

  /**
   * @param  key    Key to store data.
   * @param  data   Data to store.
   * @param  ttl=60 Time to live
   */
  public async set(key, data, ttl: number = 60) {
    return this.client.setAsync(this.composeKey(key), JSON.stringify(data), 'EX', ttl)
  }

  /**
   * @param  key Key to get data.
   * @return
   */
  public async get(key) {
    const cached = await this.client.getAsync(this.composeKey(key))

    if (cached) {
      return JSON.parse(cached)
    }

    return
  }

  /**
   * @param  key Key to delete.
   */
  public async del (key: string) {
    return this.client.delAsync(this.composeKey(key))
  }

  private composeKey(key) {
    return CACHE_PREFIX + key
  }
}
