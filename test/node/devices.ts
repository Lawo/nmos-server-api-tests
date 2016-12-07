import { Url } from './../util/url';
import { NodeUtil } from './../util/nodeUtil';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Node', () => {
  describe('Devices', () => {

    it('should be empty', (done) => {
      NodeUtil.expectEmptyResources(done, Url.Node, '/devices');
    });

    it('should return an error when the requested device id does not exist', (done) => {
      NodeUtil.failGetNonExistentResource(done, Url.Node, '/devices');
    });

  });
});
