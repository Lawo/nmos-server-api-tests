import { expect } from 'chai';

import { Url } from './../util/url';
import { NodeUtil } from './../util/nodeUtil';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Node', () => {
  describe('Receivers', () => {

    it('should be empty', (done) => {
      NodeUtil.expectEmptyResources(done, Url.Node, '/receivers');
    });

    it('should return an error when the requested receiver id does not exist', (done) => {
      NodeUtil.failGetNonExistentResource(done, Url.Node, '/receivers');
    });

    it('should return an error when trying to request a change to a receivers subscription', (done) => {
      let body = {
        'description': 'Camera',
        'label': 'Camera',
        'manifest_href': 'http://172.29.176.142:12345/x-nmos/node/v1.0/self/pipelinemanager/run/pipeline/1/pipel/ipp_rtptx0c6d/misc/sdp/',
        'flow_id': '84f1a535-748b-457c-a25f-49d6691bab30',
        'id': '72af8f63-15ad-4ec2-8a22-363b4a094fee',
        'transport': 'urn:x-nmos:transport:rtp.mcast',
        'device_id': '2b9ad611-da45-4175-b091-41577f09f15f'
      };

      chai.request(Url.Node)
        .put('/receivers/nonexistent id/target')
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

  });
});