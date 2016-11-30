import { expect } from 'chai';
import { Url } from './../util/url';
import { QueryUtil } from './../util/queryUtil';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Query', () => {
  describe('Nodes', () => {

    let testNode = {
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
    };

    // hooks
    before((done) => {
      QueryUtil.addResource(done, Url.Registration, 'node', testNode);
    });

    after((done) => {
      QueryUtil.removeResource(done, Url.Registration, '/nodes', testNode.id);
    });

    // test cases
    it('should list all nodes on /nodes GET', (done) => {
      QueryUtil.listAll(done, Url.Query, '/nodes');
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
      QueryUtil.containTestResource(done, Url.Query, '/nodes', testNode.label);
    });

    it('should get a single node by id', (done) => {
      QueryUtil.getSingleResourceById(done, Url.Query, '/nodes', testNode.id);
    });

    it('should return an error when the requested node id does not exist', (done) => {
      QueryUtil.failGetNonExistentResource(done, Url.Query, '/nodes');
    });

  });
});
