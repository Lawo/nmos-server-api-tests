import { expect } from 'chai';
import { Url } from './../util/url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Node', () => {
  describe('Base (/)', () => {

    it('GET should return list of paths available from this API', (done) => {
      chai.request(Url.Node)
        .get('/')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.include('self/');
          expect(res.body).to.include('sources/');
          expect(res.body).to.include('flows/');
          expect(res.body).to.include('devices/');
          expect(res.body).to.include('senders/');
          expect(res.body).to.include('receivers/');
          done();
        });
    });

    it('OPTIONS should return empty answer and Status OK.', (done) => {
      chai.request(Url.Node)
        .options('/')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('POST should not be supported.', (done) => {
      chai.request(Url.Node)
        .post('/')
        .end(function (err, res) {
          expect(res).to.have.status(405);
          done();
        });
    });

  });
});
