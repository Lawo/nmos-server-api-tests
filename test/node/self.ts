import { expect } from 'chai';
import { Url } from './../util/url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import ChaiJsonSchema = require('chai-json-schema');
chai.use(ChaiJsonSchema);

import loadJsonFile = require('load-json-file');

describe('Node', () => {
  describe('Self', () => {

    it('should validate against JSON-schema', (done) => {
      chai.request(Url.Node)
        .get('/self')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          let schema = loadJsonFile.sync('./specification/schemas/node.json');
          expect(res.body).to.be.jsonSchema(schema);
          done();
        });
    });

  });
});
