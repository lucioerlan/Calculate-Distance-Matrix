const Distance = require('../../src/schema/distance-schema');

describe('Find MongoDB', () => {
  it('performs consultation on mongoDB', (done) => {
    Distance.find().then(() => {
      done();
    });
  });
});
