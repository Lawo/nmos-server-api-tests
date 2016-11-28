import { expect } from 'chai';
import { Url } from './../url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Query', () => {
  describe('Base (/)', () => {

    it('GET should return list of paths available from this API', (done) => {
      chai.request(Url.Query)
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

    it('OPTIONS should return empty answer and Status OK.', (done) => {
      chai.request(Url.Query)
        .options('/')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('POST should not be supported.', (done) => {
      chai.request(Url.Query)
        .post('/')
        .end(function (err, res) {
          expect(res).to.have.status(405);
          done();
        });
    });

  });
});
