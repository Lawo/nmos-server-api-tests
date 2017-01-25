import { expect } from 'chai';
import * as chai from 'chai';
import chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);

describe('tv4', () => {

  it('should validate using tv4', (done) => {
    let schema = {
      items: {
        type: 'boolean'
      }
    };

    let data1 = [true, false];
    let data2 = [true, 123];

    expect(chai.tv4.validate(data1, schema)).to.be.true;
    expect(chai.tv4.validate(data2, schema)).to.be.false;

    done();
  });
});

