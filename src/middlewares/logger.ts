import middleware = require('bunyan-middleware')
import * as Logger from 'bunyan'

export default (logger: Logger) => {
 return middleware({
   logger: logger,
   level: 'debug',
   headerName: 'X-RRID',
   logName: 'X-RRID'
 })
}
