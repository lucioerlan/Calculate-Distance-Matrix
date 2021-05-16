/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src');

describe('GET /api', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/api/get-files')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
