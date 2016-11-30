import { expect } from 'chai';
import { Url } from './../util/url';
import { QueryUtil } from './../util/queryUtil';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Query', () => {
  describe('Receivers', () => {

    let testReceiver = {
      'description': 'RTP receiver 1',
      'tags': {
        'Location': [
          'Location 1'
        ]
      },
      'format': 'urn:x-nmos:format:video',
      'caps': {},
      'device_id': '0d0cb97e-b96a-4a39-887f-d491492d9081',
      'version': '1441895693:480000000',
      'label': 'Viewer 1',
      'id': '3350d113-1593-4271-a7f5-f4974415bb8e',
      'transport': 'urn:x-nmos:transport:rtp',
      'subscription': {
        'sender_id': '55311762-8003-48fa-a645-0a0c7621ce45'
      }
    };

    // hooks
    before((done) => {
      QueryUtil.addResource(done, Url.Registration, 'receiver', testReceiver);
    });

    after((done) => {
      QueryUtil.removeResource(done, Url.Registration, '/receivers', testReceiver.id);
    });

    // test cases
    it('should list all receivers on /receivers GET', (done) => {
      QueryUtil.listAll(done, Url.Query, '/receivers');
    });

    it.skip('should have all required properties', (done) => {
    });

    it('should contain the test receivers', (done) => {
      QueryUtil.containTestResource(done, Url.Query, '/receivers', testReceiver.label);
    });

    it('should return the desired receiver by label', (done) => {
      QueryUtil.getResourceByParameter(done, Url.Query, '/receivers', 'label', testReceiver.label);
    });

    it('should return the desired receiver by description', (done) => {
      QueryUtil.getResourceByParameter(done, Url.Query, '/receivers', 'description', testReceiver.description);
    });

    it('should return the desired receiver by format', (done) => {
      QueryUtil.getResourceByParameter(done, Url.Query, '/receivers', 'format', testReceiver.format);
    });

    it('should return the desired receiver by transport', (done) => {
      QueryUtil.getResourceByParameter(done, Url.Query, '/receivers', 'transport', testReceiver.transport);
    });

    it('should get a single receiver by id', (done) => {
      QueryUtil.getSingleResourceById(done, Url.Query, '/receivers', testReceiver.id);
    });

    it('should return an error when the requested receiver id does not exist', (done) => {
      QueryUtil.failGetNonExistentResource(done, Url.Query, '/receivers');
    });

  });
});
