const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');
const correct = {
  name: 'Pug',
  height: '12 - 34',
  weight: '12 - 34',
  life_span: '12 - 34',
  image: 'https://www.example.com/',
  temperament: ['Active', 'Adaptable', 'Charming']
}

describe('Models', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Dog', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(res => res.dataValues)
          .then(() => done(new Error('Test should have failed')))
          .catch((error) => {
            expect(error).to.be.an('error');
            done();
          });
      });
      it('should throw an error if name length is smaller than 3 characters', (done) => {
        Dog.create({...correct, name: 'aa'})
          .then(res => res.dataValues)
          .then(() => done(new Error('Test should have failed')))
          .catch((error) => {
            expect(error).to.be.an('error');
            done();
          });
      });
      it('should throw an error if name length is greater than 40 characters', (done) => {
        Dog.create({...correct, name: 'a'.repeat(41)})
          .then(res => res.dataValues)
          .then(() => done(new Error('Test should have failed')))
          .catch((error) => {
            expect(error).to.be.an('error');
            done();
          });
      });
      it('should throw an error if name already exist', (done) => {
        Dog.create(correct).then(() => {
            Dog.create({correct})
              .then(res => res.dataValues)
              .then(() => done(new Error('Test should have failed')))
              .catch((error) => {
                expect(error).to.be.an('error');
                done();
              });
          })
      });
      it('should work when its a valid name', (done) => {
        Dog.create(correct)
          .then(res => res.dataValues)
          .then((res) => {
            expect(res).to.be.an('object');
            expect(res).to.have.property('name').and.equal(correct.name);
            done()
          })
          .catch((error) => {done(error)});
      });
    });
    describe('height', () => {
      it('should throw an error if height is null', (done) => {
        Dog.create({})
          .then(res => res.dataValues)
          .then(() => done(new Error('Test should have failed')))
          .catch((error) => {
            expect(error).to.be.an('error');
            done();
          });
      });
      it('should throw an error if height have a incorrect format', (done) => {
        Dog.create({...correct, height: 123})
          .then(res => res.dataValues)
          .then(() => done(new Error('Test should have failed')))
          .catch((error) => {
            expect(error).to.be.an('error');
            done();
          });
      });
      it('should work when its a valid height', (done) => {
        Dog.create(correct)
          .then(res => res.dataValues)
          .then((res) => {
            expect(res).to.be.an('object');
            expect(res).to.have.property('height').and.equal(correct.height);
            done()
          })
          .catch((error) => {done(error)});
      });
    });
    describe('weight', () => {
      it('should throw an error if weight is null', (done) => {
        Dog.create({})
          .then(res => res.dataValues)
          .then(() => done(new Error('Test should have failed')))
          .catch((error) => {
            expect(error).to.be.an('error');
            done();
          });
      });
      it('should throw an error if weight have a incorrect format', (done) => {
        Dog.create({...correct, weight: 123})
          .then(res => res.dataValues)
          .then(() => done(new Error('Test should have failed')))
          .catch((error) => {
            expect(error).to.be.an('error');
            done();
          });
      });
      it('should work when its a valid weight', (done) => {
        Dog.create(correct)
          .then(res => res.dataValues)
          .then((res) => {
            expect(res).to.be.an('object');
            expect(res).to.have.property('weight').and.equal(correct.weight);
            done()
          })
          .catch((error) => {done(error)});
      });
    });
    describe('life_span', () => {
      it('should work if life_span is null', (done) => {
        Dog.create({...correct, life_span: null})
          .then(res => res.dataValues)
          .then((res) => {
            expect(res).to.be.an('object');
            expect(res).to.have.property('life_span').and.to.be.a('null')
            done()
          })
          .catch((error) => {done(error)});
      });
      it('should throw an error if life_span have a incorrect format', (done) => {
        Dog.create({...correct, weight: 123})
          .then(res => res.dataValues)
          .then(() => done(new Error('Test should have failed')))
          .catch((error) => {
            expect(error).to.be.an('error');
            done();
          });
      });
      it('should work when its a valid life_span', (done) => {
        Dog.create(correct)
          .then(res => res.dataValues)
          .then((res) => {
            expect(res).to.be.an('object');
            expect(res).to.have.property('life_span').and.equal(correct.life_span);
            done()
          })
          .catch((error) => {done(error)});
      });
    });
    describe('image', () => {
      it('should work if image is null', (done) => {
        Dog.create({...correct, image: null})
          .then(res => res.dataValues)
          .then((res) => {
            expect(res).to.be.an('object');
            expect(res).to.have.property('image').and.to.be.a('null')
            done()
          })
          .catch((error) => {done(error)});
      });
      it("should throw an error if image isn't a URL", (done) => {
        Dog.create({...correct, image: "this isn't a URL"})
          .then(res => res.dataValues)
          .then(() => done(new Error('Test should have failed')))
          .catch((error) => {
            expect(error).to.be.an('error');
            done();
          });
      });
      it('should work when its a valid image', (done) => {
        Dog.create(correct)
          .then(res => res.dataValues)
          .then((res) => {
            expect(res).to.be.an('object');
            expect(res).to.have.property('image').and.equal(correct.image);
            done()
          })
          .catch((error) => {done(error)});
      });
    });
  });
});

