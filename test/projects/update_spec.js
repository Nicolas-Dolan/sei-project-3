/* global api, describe, it, expect, beforeEach, afterEach */
const Project = require('../../models/project')
const User = require('../../models/user') 
const jwt = require('jsonwebtoken') 
const { secret } = require('../../config/environment') 

const testUserData = [{ // creating two users here for this test, will use the second user to test that they cannot update an project they did not create, will also do the same with delete
  username: 'test343',
  name: 'test343',
  email: 'test343@email',
  password: 'test',
  passwordConfirmation: 'test'
}, {
  username: 'test566',
  name: 'test566',
  email: 'test566@email',
  password: 'test',
  passwordConfirmation: 'test'
}]

describe('PUT /projects/:id', () => {
  let token, incorrectToken, project // to store our token for the user who creates the project. need this for the request

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' }) // signing the jwt token for our created user
        return Project.create({
          name: 'Project 1',
          collaborators: [],
          description: 'This is a description of project 1',
          location: 'Glasgow',
          images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360'],
          completed: true,
          recruiting: false,
          owner: users[0] 
        })
      })
      .then(createdProject => {
        project = createdProject // and storing our created project
        done()
      })
  })

  afterEach(done => { // as always removing any projects and users after the tests are complete
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.put(`/api/projects/${project._id}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 202 response with a token', done => {
    api.put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'owner',
          'collaborators',
          'description',
          'location',
          'images',
          'skillsInvolved',
          'lookingFor',
          'likes',
          'comments',
          'completed',
          'recruiting'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        const project = res.body
        expect(project._id).to.be.a('string')
        expect(project.name).to.be.a('string')
        expect(project.owner).to.be.an('string')
        expect(project.collaborators).to.be.an('array')
        expect(project.description).to.be.a('string')
        expect(project.location).to.be.a('string')
        expect(project.images).to.be.an('array')
        expect(project.skillsInvolved).to.be.an('array')
        expect(project.lookingFor).to.be.an('array')
        expect(project.likes).to.be.an('array')
        expect(project.comments).to.be.an('array')
        expect(project.completed).to.be.a('boolean')
        expect(project.recruiting).to.be.a('boolean')
        done()        
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})




