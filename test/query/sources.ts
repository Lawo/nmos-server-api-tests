import { expect } from 'chai';
import { Url } from './../url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Query', () => {
  describe('Sources', () => {

    let testSource = {
          'description': 'Camera 1',
          'format': 'urn:x-nmos:format:video',
          'tags': {
            'SourceDeviceType': [
              'UHD Camera'
            ],
            'host': [
              'host1'
            ],
            'location': [
              'Location 1'
            ]
          },
          'caps': {},
          'version': '1441724551:288670563',
          'parents': <any>[],
          'label': 'TestSource1',
          'id': '042a4126-0208-443d-bda6-833ffc27ed51',
          'device_id': '21a28338-fb2e-4df5-9b55-d58e6124bc9f'
    };

    // hooks
    before((done) => {
      // add test source
      let body = {
        'type': 'source',
        'data': testSource
      };

      chai.request(Url.Registration)
        .post('/resource')
        .send(body)
        .end((err, res) => {
          done();
        });
    });

    after((done) => {
      // remove test source
      chai.request(Url.Registration)
        .del('/resource/sources/' + testSource.id)
        .end((err, res) => {
          done();
        });
    });

    // test cases
    it('should list all sources on /sources GET', (done) => {
      chai.request(Url.Query)
        .get('/sources')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });

    it('should have all required properties', (done) => {
      chai.request(Url.Query)
        .get('/sources')
        .end((err, res) => {
          expect(res).to.have.status(200);

          res.body.forEach((entry: any) => {
            expect(entry).to.have.property('id');
            expect(entry).to.have.property('version');
            expect(entry).to.have.property('label');
            expect(entry).to.have.property('description');
            expect(entry).to.have.property('format');
            expect(entry).to.have.property('caps');
            expect(entry).to.have.property('tags');
            expect(entry).to.have.property('device_id');
            expect(entry).to.have.property('parents');

            expect(entry.id).to.be.a('string');
            expect(entry.version).to.be.a('string');
            expect(entry.label).to.be.a('string');
            expect(entry.description).to.be.a('string');
            expect(entry.format).to.be.a('string');
            expect(entry.caps).to.be.an('object');
            expect(entry.tags).to.be.an('object');
            expect(entry.device_id).to.be.a('string');
            expect(entry.parents).to.be.an('array');
          });
          done();
        });
    });

    it('should contain the test sources', (done) => {
      chai.request(Url.Query)
        .get('/sources')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.label === testSource.label)).to.be.true;
          done();
        });
    });

    it('should return the desired source by device_id', (done) => {
      chai.request(Url.Query)
        .get('/sources')
        .field('device_id', testSource.device_id)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.device_id === testSource.device_id)).to.be.true;
          done();
        });
    });

    it('should return the desired source by label', (done) => {
      chai.request(Url.Query)
        .get('/sources')
        .field('label', testSource.label)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.label === testSource.label)).to.be.true;
          done();
        });
    });

    it('should return the desired source by description', (done) => {
      chai.request(Url.Query)
        .get('/sources')
        .field('description', testSource.description)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.description === testSource.description)).to.be.true;
          done();
        });
    });

    it('should return the desired source by format', (done) => {
      chai.request(Url.Query)
        .get('/sources')
        .field('format', testSource.format)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.some((entry: any) => entry.format === testSource.format)).to.be.true;
          done();
        });
    });

    it('should get a single source by id', (done) => {
      chai.request(Url.Query)
        .get('/sources/' + testSource.id)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.label).to.equal(testSource.label);
          done();
        });
    });

    it('should return an error when the requested source id does not exist', (done) => {
      chai.request(Url.Query)
        .get('/source/wrong id')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

  });
});
