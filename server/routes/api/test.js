// const axios = require('axios')
const request = require('supertest')
const app = require('../../index')
const db = require('../../db')
const USERS_API = `http://localhost:8080/api/users`

let testUser = {
  username: 'johna',
  email: 'johna@example.com',
  password: '1234567!'
}

describe('POST TO \'/api\/users\' ', () => {
  beforeEach(() => {
    return db.none(`TRUNCATE users RESTART IDENTITY CASCADE`)
  })

  afterAll(() => {
    return db.none(`TRUNCATE users RESTART IDENTITY CASCADE`)
  })

  test('creates a new user', () => {
    return request(app)
    .post(USERS_API)
    .send(testUser)
    .then((err, res) => {
      expect(err).toBeUndefined()
      expect(res.data.username).toBe(testUser.username)
      expect(res.data.demail).toBe(testUser.email)
      expect(res.data.id).toBeDefined()
      expect(res.data.token).toBeDefined()
      expect(res.data.password).toBeUndefined()
    })
  })
})
