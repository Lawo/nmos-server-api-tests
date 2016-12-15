import { Node } from './../util/node';
import { Url } from './../util/url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Node', () => {
  describe('Flows', () => {

    it('should be empty', (done) => {
      Node.expectEmptyResources(done, Url.Node, 'flows');
    });

    it('should return an error when the requested flow id does not exist', (done) => {
      Node.failGetNonExistentResource(done, Url.Node, 'flows');
    });

  });
});
