import { assert } from 'chai';
import { expect } from 'chai';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Query', () => {

  describe('Nodes', () => {
    // hooks
    before((done) => {
      let body = {
        'type': 'node',
        'data': {
          'version': '1441973902:879053935',
          'hostname': 'TestNode1',
          'label': 'TestNode1',
          'href': 'http://172.29.80.65:12345/',
          'services': [
            {
              'href': 'http://172.29.80.65:12345/x-manufacturer/pipelinemanager/',
              'type': 'urn:x-manufacturer:service:pipelinemanager'
            }
          ],
          'caps': {},
          'id': '3b8be755-08ff-452b-b217-c9151eb21193'
        }
      };

      chai.request('http://localhost:15631/x-nmos/registration/v1.0')
        .post('/resource')
        .send(body)
        .end((err, res) => {
          let test = res.status;
          console.log(test);
          done();
        });
    });

    after(function () {
      // console.log('runs after all tests in this block');
    });

    beforeEach(function () {
      // console.log('runs before each test in this block');
    });

    afterEach(function () {
      // console.log('runs after each test in this block');
    });

    // test cases
    it('should list ALL nodes on /nodes GET', (done) => {
      chai.request('http://localhost:15631/x-nmos/query/v1.0')
        .get('/nodes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });

    it('should contain the test nodes', (done) => {
      chai.request('http://localhost:15631/x-nmos/query/v1.0')
        .get('/nodes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.some((e: any) => e.label === 'TestNode1')).to.be.true;
          done();
        });
    });
  });
});
