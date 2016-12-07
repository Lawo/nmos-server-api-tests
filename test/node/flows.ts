import { Url } from './../util/url';
import { NodeUtil } from './../util/nodeUtil';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Node', () => {
  describe('Flows', () => {

    it('should be empty', (done) => {
      NodeUtil.expectEmptyResources(done, Url.Node, '/flows');
    });

    it('should return an error when the requested flow id does not exist', (done) => {
      NodeUtil.failGetNonExistentResource(done, Url.Node, '/flows');
    });

  });
});
