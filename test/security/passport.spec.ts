import * as config from 'config'
import Passport from '../../src/security/passport'

jest.mock('../../src/services/database')

describe('Login API', () => {
  it('passport should not fail when creating new instance', async () => {
    const passport = new Passport()
  })
})
