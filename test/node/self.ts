import { expect } from 'chai';
import { JsonSchema } from './../util/jsonSchema';
import { Url } from './../util/url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Node', () => {
  describe('Self', () => {

    it('should get information about this node', () => {
      return (async () => {
        let res = await chai.request(Url.Node).get('/self');

        expect(res).to.have.status(200);
        expect(res).to.be.json;

        let schema = new JsonSchema('./specification/schemas', 'node.json');
        schema.validate(res.body);
      })();
    });

  });
});
