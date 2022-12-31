/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
process.env.NODE_ENV = 'test';

const agent = session(app);

const correct = {
  name: 'Dog Test',
  height: '12 - 34',
  weight: '12 - 34',
  life_span: '12 - 34',
  image: 'https://www.example.com/',
  temperament: ['Active', 'Adaptable', 'Charming']
}

describe('Routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true }));
  describe('GET /dogs', () => {
    it('should get 200', () => {
      agent
        .get('/dogs')
        .expect(200)
    });
  });
  describe('GET /dogs with queries', () => {
    it('should get 200',  () => {
       agent
        .get('/dogs?name=dogo')
        .expect(200)
    });
    it('should get one or many results', async () => {
      const response = await agent
        .get('/dogs?name=dogo')
        .expect(200)
      expect(response.body).to.be.an('array').and.not.empty
    });
    it('should get no results for a non-existent name', async () => {
      const response = await agent
        .get('/dogs?name=asd')
        .expect(200)
      expect(response.body).to.be.an('array').and.empty
    });
  });
  describe('GET /dogs with params', () => {
    it('should get 200',  () => {
       agent
        .get('/dogs/1')
        .expect(200)
    });
    it('should get results for dog from API', async () => {
      const response = await agent
        .get('/dogs/1')
        .set('Accept', 'application/json')
        .expect(200)
      expect(response.body).to.be.an('object')
      expect(response.body.id).to.be.equal(1)
    });
    it('should get results for dog from DB', () => {
      agent
        .post('/dogs')
        .send(correct)
        .expect(200) 
        .then(postRes => {
          agent
            .get(`/dogs/${postRes.id}`)
            .expect(200)
            .then(getRes => {
              expect(getRes).to.be.equal(postRes)
            })
        })
    });
  });
  describe('POST /dogs', () => {
    it('should respond with the new object when the POST was successful', () => {
      agent
        .post('/dogs')
        .send(correct)
        .expect(200) 
        .then(response => {
          expect(response).to.be.equal(correct)
        })
    });
    it('should get 400 when POST failed', () => {
      agent
        .post('/dogs')
        .send({})
        .expect(400) 
    });
  });
  describe('GET /temperaments', () => {
    it('should get 200', () => {
      agent
        .get('/dogs')
        .expect(200)
    });
  });
});
