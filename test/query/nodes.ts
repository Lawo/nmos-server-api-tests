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
    it('should list all nodes on /nodes GET', (done) => {
      chai.request(Url.Query)
        .get('/nodes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });

    it('should have all required properties', (done) => {
      chai.request(Url.Query)
        .get('/nodes')
        .end((err, res) => {
          expect(res).to.have.status(200);

          res.body.forEach((entry: any) => {
            expect(entry).to.have.property('id');
            expect(entry).to.have.property('version');
            expect(entry).to.have.property('label');
            expect(entry).to.have.property('href');
            expect(entry).to.have.property('caps');
            expect(entry).to.have.property('services');

            expect(entry.id).to.be.a('string');
            expect(entry.version).to.be.a('string');
            expect(entry.label).to.be.a('string');
            expect(entry.href).to.be.a('string');
            expect(entry.caps).to.be.an('object');
            expect(entry.services).to.be.an('array');
          });
          done();
        });
    });

    it('should contain the test nodes', (done) => {
      chai.request(Url.Query)
        .get('/nodes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.label === 'TestNode1')).to.be.true;
          done();
        });
    });

    it('should get a single node by id', (done) => {
      chai.request(Url.Query)
        .get('/nodes/3b8be755-08ff-452b-b217-c9151eb21193')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.label).to.equal('TestNode1');
          done();
        });
    });

    it('should return an error when the requested node id does not exist', (done) => {
      chai.request(Url.Query)
        .get('/nodes/wrong id')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

  });
});
