import { Url } from './../util/url';
import { Node } from './../util/node';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Node', () => {
  describe('Devices', () => {

    it('should be empty', (done) => {
      Node.expectEmptyResources(done, Url.Node, 'devices');
    });

    it('should return an error when the requested device id does not exist', (done) => {
      Node.failGetNonExistentResource(done, Url.Node, 'devices');
    });

  });
});
