import { Node } from './../util/node';
import { Url } from './../util/url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Node', () => {
  describe('Receivers', () => {

    it('should list receivers', () => {
      return Node.listResourcesAsync(Url.Node, 'receivers', 'receivers.json');
    });

    it('should return an error when the requested receiver id does not exist', () => {
      return Node.getResourceAsync(Url.Node, 'receivers', 'receiver.json', 'nonexistent id');
    });

    it('schould return an error when trying to request a change to a receivers subscription', () => {
      return Node.requestChangeAsync(Url.Node, 'nonexistent id', 'target', 404);
    });

  });
});
