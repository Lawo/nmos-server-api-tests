import { expect } from 'chai';
import { Url } from './../util/url';
import { QueryUtil } from './../util/queryUtil';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Query', () => {
  describe('Flows', () => {

    let testFlow = {
      'description': 'Off-air proxy',
      'format': 'urn:x-nmos:format:video',
      'tags': {},
      'label': 'Off-air proxy',
      'version': '1441724130:194944510',
      'parents': <any>[],
      'source_id': 'c7b1c809-84d4-427d-b6bb-c8397c66ce2b',
      'id': '0c1f03d7-7e94-4b21-94d1-3ffbee8a0606'
    };

    // hooks
    before((done) => {
      QueryUtil.addResource(done, Url.Registration, 'flow', testFlow);
    });

    after((done) => {
      QueryUtil.removeResource(done, Url.Registration, '/flows', testFlow.id);
    });

    // test cases
    it('should list all flows on /flows GET', (done) => {
      QueryUtil.listAll(done, Url.Query, '/flows');
    });

    it('should have all required properties', (done) => {
      chai.request(Url.Query)
        .get('/flows')
        .end((err, res) => {
          expect(res).to.have.status(200);

          res.body.forEach((entry: any) => {
            expect(entry).to.have.property('id');
            expect(entry).to.have.property('version');
            expect(entry).to.have.property('label');
            expect(entry).to.have.property('description');
            expect(entry).to.have.property('format');
            expect(entry).to.have.property('tags');
            expect(entry).to.have.property('source_id');
            expect(entry).to.have.property('parents');

            expect(entry.id).to.be.a('string');
            expect(entry.version).to.be.a('string');
            expect(entry.label).to.be.a('string');
            expect(entry.description).to.be.a('string');
            expect(entry.format).to.be.a('string');
            expect(entry.tags).to.be.an('object');
            expect(entry.source_id).to.be.a('string');
            expect(entry.parents).to.be.an('array');
          });
          done();
        });
    });

    it('should contain the test flows', (done) => {
      QueryUtil.containTestResource(done, Url.Query, '/flows', testFlow.label);
    });

    it('should return the desired flow by source_id', (done) => {
      QueryUtil.getResourceByParameter(done, Url.Query, '/flows', 'source_id', testFlow.source_id);
    });

    it('should return the desired flow by label', (done) => {
      QueryUtil.getResourceByParameter(done, Url.Query, '/flows', 'label', testFlow.label);
    });

    it('should return the desired flow by description', (done) => {
      QueryUtil.getResourceByParameter(done, Url.Query, '/flows', 'description', testFlow.description);
    });

    it('should return the desired flow by format', (done) => {
      QueryUtil.getResourceByParameter(done, Url.Query, '/flows', 'format', testFlow.format);
    });

    it('should get a single flow by id', (done) => {
      QueryUtil.getSingleResourceById(done, Url.Query, '/flows', testFlow.id);
    });

    it('should return an error when the requested flow id does not exist', (done) => {
      QueryUtil.failGetNonExistentResource(done, Url.Query, '/flows');
    });

  });
});

