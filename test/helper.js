// ! Required to run in testing 

process.env.NODE_ENV = 'test' // NEED TO UPDATED THE ENVIROMENT.JS FILE FOR THIE TO BE CORRECT

const chai = require('chai')
global.expect = chai.expect

const supertest = require('supertest')
const app = require('../index') // INDEX FILE WHERE ROUTERS ARE PULLED FOR TESTS

global.api = supertest(app)