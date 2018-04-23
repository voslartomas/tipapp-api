import * as Logger from 'bunyan'
import * as config from 'config'

export default class AppLogger extends Logger {
  constructor() {
    const options = {name: 'tipapp', level: config.get('logging.level')}
    super(options)

    return Logger.createLogger(options)
  }
}
