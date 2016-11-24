import { expect } from 'chai';
import { Url } from './../url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Query', () => {

  describe('Nodes', () => {

    // hooks
    before((done) => {
      // add test node
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

      chai.request(Url.Registration)
        .post('/resource')
        .send(body)
        .end((err, res) => {
          done();
        });
    });

    after((done) => {
      // remove test node
      chai.request(Url.Registration)
        .del('/resource/nodes/3b8be755-08ff-452b-b217-c9151eb21193')
        .end((err, res) => {
          done();
        });
    });

    // test cases
    it('should list ALL nodes on /nodes GET', (done) => {
      chai.request(Url.Query)
        .get('/nodes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });

    it('should contain the test nodes', (done) => {
      chai.request(Url.Query)
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
