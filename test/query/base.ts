import { expect } from 'chai';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Query', () => {
  describe('Base (/)', () => {

    it('should return list of paths available from this API', (done) => {
      chai.request('http://localhost:15631/x-nmos/query/v1.0')
        .get('/')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.include('nodes/');
          expect(res.body).to.include('sources/');
          expect(res.body).to.include('flows/');
          expect(res.body).to.include('devices/');
          expect(res.body).to.include('senders/');
          expect(res.body).to.include('receivers/');
          expect(res.body).to.include('subscriptions/');
          done();
        });
    });
  });
});
