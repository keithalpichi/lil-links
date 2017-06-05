// const url = process.env.URL || 'localhost:8080/'
const ENV = process.env.NODE_ENV || 'development'
const dbUrl = process.env.DB_URL || `mongodb://localhost/lillink-${ENV}`
const db = require('./index')
const User = require('./user')
const Link = require('./link')

describe('User table ', () => {
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
    .then(user => {
      expect(user).not.toBeNull()
      expect(user.email).toBe('johna@example.com')
    })
  })

  test('updates a new user', () => {
    User.updateOne({ username: 'johna' }, { username: 'johnb' }).exec()
    .then((err, user) => {
      expect(err).toBeNull()
      expect(user.username).toBe('johnb')
    })
  })
})

describe('Link table ', () => {
  beforeAll(() => {
    db.connect(dbUrl)
  })

  afterEach(() => {
    Link.remove({}, () => {})
  })

  afterAll(() => db.disconnect())

  test('creates a new link', () => {
    let link = new Link({ url: 'http://google.com/search?=foobar' })

    link.save()
    .then(link => {
      expect(link).not.toBeNull()
      expect(link.url).toBe('http://google.com/search?=foobar')
      expect(link.shortLink).not.toBeNull()
    })
  })
})
