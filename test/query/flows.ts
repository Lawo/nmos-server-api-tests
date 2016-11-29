import { expect } from 'chai';
import { Url } from './../url';

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
      // add test flow
      let body = {
        'type': 'flow',
        'data': testFlow
      };

      chai.request(Url.Registration)
        .post('/resource')
        .send(body)
        .end((err, res) => {
          done();
        });
    });

    after((done) => {
      // remove test flow
      chai.request(Url.Registration)
        .del('/resource/flows/' + testFlow.id)
        .end((err, res) => {
          done();
        });
    });

    // test cases
    it('should list all flows on /flows GET', (done) => {
      chai.request(Url.Query)
        .get('/flows')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
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
      chai.request(Url.Query)
        .get('/flows')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.label === testFlow.label)).to.be.true;
          done();
        });
    });

    it('should return the desired flow by source_id', (done) => {
      chai.request(Url.Query)
        .get('/flows')
        .field('source_id', testFlow.source_id)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.source_id === testFlow.source_id)).to.be.true;
          done();
        });
    });

    it('should return the desired flow by label', (done) => {
      chai.request(Url.Query)
        .get('/flows')
        .field('label', testFlow.label)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.label === testFlow.label)).to.be.true;
          done();
        });
    });

    it('should return the desired flow by description', (done) => {
      chai.request(Url.Query)
        .get('/flows')
        .field('description', testFlow.description)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.description === testFlow.description)).to.be.true;
          done();
        });
    });

    it('should return the desired flow by format', (done) => {
      chai.request(Url.Query)
        .get('/flows')
        .field('format', testFlow.format)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.format === testFlow.format)).to.be.true;
          done();
        });
    });

    it('should get a single flow by id', (done) => {
      chai.request(Url.Query)
        .get('/flows/' + testFlow.id)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.label).to.equal(testFlow.label);
          done();
        });
    });

    it('should return an error when the requested flow id does not exist', (done) => {
      chai.request(Url.Query)
        .get('/flows/wrong id')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

  });
});

