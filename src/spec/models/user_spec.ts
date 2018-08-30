import assert from 'power-assert';

describe('A suite', () => {
  it('contains spec with an expectation', done => {
    assert.throws(
      () => {
        throw new Error('Wrong value');
      },
      (err: any) => {
        assert.equal(err.message, 'Wrong value');

        done();
      },
      'unexpected error',
    );
  });
});
