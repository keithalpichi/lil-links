const db = require('./index')
const User = require('./user')
const Link = require('./link')

describe('User table ', () => {
  afterEach(() => {
    db.none(`TRUNCATE users RESTART IDENTITY CASCADE`)
  })

  test('creates a new user', () => {
    const user = User.postUser({
      username: 'johna',
      email: 'johna@example.com',
      password: '1234567!'
    })
    .then(user => {
      expect(user).not.toBeNull()
      expect(user.email).toBe('johna@example.com')
      expect(user.password).not.toBe('1234567!')
    })
  })
})

describe('Link table ', () => {
  let id

  beforeAll(() => {
    const user = User.postUser({
      username: 'johna',
      email: 'johna@example.com',
      password: '1234567!'
    })
    .then(user => {
      id = user.id
    })
  })

  afterEach(() => {
    db.none(`TRUNCATE links RESTART IDENTITY CASCADE`)
  })

  test('creates a new link', () => {
    let link = Link.postLink({
      url: 'http://google.com/search?=foobar',
      ownerid: id
    })
    .then(link => {
      expect(link).not.toBeNull()
      expect(link.url).toBe('http://google.com/search?=foobar')
      expect(link.shortLink).not.toBeNull()
    })
  })
})
