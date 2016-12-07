import { expect } from 'chai';
import { assert } from 'chai';
import { should } from 'chai';

import chai = require('chai');
import ChaiJsonSchema = require('chai-json-schema');

chai.use(ChaiJsonSchema);

let goodApple = {
  skin: 'thin',
  colors: ['red', 'green', 'yellow'],
  taste: 10
};

let badApple = {
  colors: ['brown'],
  taste: 0,
  worms: 2
};

let fruitSchema = {
  title: 'fresh fruit schema v1',
  type: 'object',
  required: ['skin', 'colors', 'taste'],
  properties: {
    colors: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string'
      }
    },
    skin: {
      type: 'string'
    },
    taste: {
      type: 'number',
      minimum: 5
    }
  }
};

describe('Schema', () => {
  it('should validate against schema', () => {
    // bdd style
    expect(goodApple).to.be.jsonSchema(fruitSchema);
    expect(badApple).to.not.be.jsonSchema(fruitSchema);

    // tdd style
    assert.jsonSchema(goodApple, fruitSchema);
    assert.notJsonSchema(badApple, fruitSchema);
  });
});