/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../models/user')

// creating a group of different data sets to use with each test, the first three just all result in errors as they have an issue like passwords not matching, or attempting to register a username or password that already exists. We need to test that these error they way they should
const testDataIncorrect = {
  username: 'test',
  name: 'test',
  email: 'test@test.test',
  password: 'test',
  passwordConfirmation: 'code'
}

const testDataDuplicateUsername = {
  username: 'test',
  name: 'test',
  email: 'unique@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

const testDataDuplicateEmail = {
  username: 'unique',
  name: 'test',
  email: 'test@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

// our correct object for a register. This is the object to send to test what happens when we create a user
const testDataCorrect = {
  username: 'testCorrect',
  name: 'test',
  email: 'testCorrect@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('POST /register', () => {

  beforeEach(done => { // creating a user before the tests, this is so we can test the duplicate email, username fields, not the objects above will match o field with this created user.
    User.create({
      username: 'test',
      name: 'test',
      email: 'test@test.test',
      password: 'test',
      passwordConfirmation: 'test'
    })
      .then(() => done())
  })

  afterEach(done => { // as always emptying the db after the tests
    User.deleteMany().then(() => done())
  })

  it('should return a 422 response if password does not match passwordConfirmation', done => {
    api.post('/api/register')
      .send(testDataIncorrect)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response if username already exists', done => {
    api.post('/api/register')
      .send(testDataDuplicateUsername)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response if email already exists', done => {
    api.post('/api/register')
      .send(testDataDuplicateEmail)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 201 response if password matches passwordConfirmation', done => {
    api.post('/api/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object if request is correct', done => {
    api.post('/api/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return an object with a message key if request is correct', done => {
    api.post('/api/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          'message'
        ])
        done()
      })
  })
})
