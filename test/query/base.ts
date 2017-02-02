import { expect } from 'chai';
import { JsonSchema } from './../util/jsonSchema';
import { Url } from './../util/url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Query', () => {
  describe('Base (/)', () => {

    it('GET should return list of paths available from this API', () => {
      return (async () => {
        let res = await chai.request(Url.Query).get('/');

        expect(res).to.have.status(200);
        expect(res).to.be.json;

        let baseSchema = new JsonSchema('./specification/schemas', 'queryapi-base.json');
        baseSchema.validate(res.body);
      })();
    });

    it('OPTIONS should return empty answer and Status OK.', () => {
      return (async () => {
        let res = await chai.request(Url.Query).options('/');
        expect(res).to.have.status(200);
      })();

    });

    it('POST should not be supported.', () => {
      return (async () => {
        try {
          await chai.request(Url.Query).post('/');
        } catch (err) {
          expect(err).to.have.status(405);
        }
      })();
    });

  });
});
