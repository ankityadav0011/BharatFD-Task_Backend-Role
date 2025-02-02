const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('FAQ API', () => {
  after(() => mongoose.connection.close());

  it('should create a new FAQ', async () => {
    const res = await request(app)
      .post('/api/faqs')
      .send({ question: 'What is Node.js?', answer: 'A runtime for JavaScript.' });

    res.should.have.status(201);
    res.body.should.have.property('question', 'What is Node.js?');
  });

  it('should get FAQs with translation', async () => {
    const res = await request(app).get('/api/faqs?lang=hi');
    res.should.have.status(200);
  });
});
