import * as Logger from 'bunyan'
import * as config from 'config'

export default class AppLogger extends Logger {
  constructor() {
    super({name: 'tipapp', level: config.get('logging.level')})
  }
}
