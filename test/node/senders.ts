import { Url } from './../util/url';
import { NodeUtil } from './../util/nodeUtil';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Node', () => {
  describe('Senders', () => {

    it('should be empty', (done) => {
      NodeUtil.expectEmptyResources(done, Url.Node, '/senders');
    });

    it('should return an error when the requested sender id does not exist', (done) => {
      NodeUtil.failGetNonExistentResource(done, Url.Node, '/senders');
    });

  });
});
