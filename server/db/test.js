// const url = process.env.URL || 'localhost:8080/'
const ENV = process.env.NODE_ENV || 'development'
const dbUrl = process.env.DB_URL || `mongodb://localhost/lillink-${ENV}`
const db = require('./index')
const User = require('./user')

describe('Database ', () => {
  beforeAll(() => {
    db.connect(dbUrl)
  })

  afterEach(() => {
    User.remove({}, () => {})
  })

  afterAll(() => db.disconnect())

  test('creates a new user', () => {
    const user = new User({
      username: 'johna',
      email: 'johna@example.com',
      password: '1234567!'
    })

    user.save()

    User.findOne({ username: 'johna' })
    .then((err, user) => {
      expect(err).toBeNull()
      expect(user.email).toBe('johna@example.com')
    })
  })

  test('updates a new user', () => {
    User.updateOne({ username: 'johna' }, { username: 'johnb' })
    .then((err, user) => {
      expect(err).toBeNull()
      expect(user.username).toBe('johnb')
    })
  })
})
