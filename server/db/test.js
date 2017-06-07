const db = require('./index')
const User = require('./user')
const Link = require('./link')

let testUser1 = {
  username: 'johna',
  email: 'johna@example.com',
  password: '1234567!'
}

describe('User table ', () => {
  beforeEach(() => {
    return db.none(`TRUNCATE users RESTART IDENTITY CASCADE`)
  })

  afterEach(() => {
    return db.none(`TRUNCATE users RESTART IDENTITY CASCADE`)
  })

  test('creates a new user', () => {
    return User.postUser(testUser1)
    .then(user => {
      expect(user).not.toBeNull()
      expect(user.email).toBe(testUser1.email)
      expect(user.password).not.toBe(testUser1.password)
    })
  })

  test('authorizes correct password with hash in DB', () => {
    return User.postUser(testUser1)
    .then(user => {
      return User.comparePassword(testUser1.password, user.password)
    })
    .then(isMatch => {
      expect(isMatch).toBeTruthy()
    })
    .catch(err => {
      expect(err).toBeNull()
    })
  })

  test('rejects incorrect password with hash in DB', () => {
    return User.postUser(testUser1)
    .then(user => {
      return User.comparePassword('ababa', user.password)
    })
    .then(isMatch => {
      expect(isMatch).toBeFalsy()
    })
  })
})

describe('Queries on User table ', () => {
  let id

  beforeEach(() => {
    return User.postUser(testUser1)
    .then(user => {
      id = user.id
    })
  })

  afterEach(() => {
    return db.none(`TRUNCATE users RESTART IDENTITY CASCADE`)
  })

  test('queries user by ID', () => {
    return User.selectUser({ id: id })
    .then(user => {
      expect(user).not.toBeNull()
      expect(user.email).toBe(testUser1.email)
      expect(user.password).not.toBe(testUser1.password)
    })
  })

  test('queries user by email', () => {
    return User.selectUserByEmail({ email: testUser1.email })
    .then(user => {
      expect(user).not.toBeNull()
      expect(user.email).toBe(testUser1.email)
      expect(user.password).not.toBe(testUser1.password)
    })
  })
})

describe('Link table ', () => {
  let testLink1

  beforeAll(() => {
    return User.postUser(testUser1)
    .then(user => {
      testLink1 = {
        url: 'http://google.com/search?=foobar',
        ownerId: user.id
      }
    })
  })

  afterEach(() => {
    return db.none(`TRUNCATE links RESTART IDENTITY CASCADE`)
    .then(() => db.none(`TRUNCATE users RESTART IDENTITY CASCADE`))
  })

  test('creates a new link', () => {
    return Link.postLink(testLink1)
    .then(link => {
      expect(link).not.toBeNull()
      expect(link.url).toBe(testLink1.url)
      expect(link.shortlink).not.toBeNull()
    })
  })
})

describe('Queries on Link table ', () => {
  let linkInDB
  let testLink1

  beforeEach(() => {
    return User.postUser(testUser1)
    .then(user => {
      testLink1 = {
        url: 'http://google.com/search?=foobar',
        ownerId: user.id
      }
      return Link.postLink(testLink1)
    })
    .then(link => {
      linkInDB = link
    })
  })

  afterEach(() => {
    return db.none(`TRUNCATE links RESTART IDENTITY CASCADE`)
    .then(() => db.none(`TRUNCATE users RESTART IDENTITY CASCADE`))
  })

  test('selects all users links', () => {
    return Link.selectLinks({ ownerId: testLink1.ownerId })
    .then(links => {
      expect(links).not.toBeNull()
      expect(links.length).toBe(1)
      expect(links[0].url).toBe(testLink1.url)
      expect(links[0].shortlink).not.toBeNull()
      expect(links[0].visits).toBe(0)
    })
  })

  test('select a link by its short link', () => {
    return Link.selectByShortLink({ shortLink: linkInDB.shortlink })
    .then(link => {
      expect(link).not.toBeNull()
      expect(link.url).toBe(testLink1.url)
      expect(link.shortlink).not.toBeNull()
      expect(link.visits).toBe(0)
    })
  })
})
