import { Query } from './../util/query';
import { Resource } from './../util/resource';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Query', () => {
  describe('Nodes', () => {

    let testNode = loadJsonFile.sync('./test/resources/node.json');

    // hooks
    before(() => {
      return Resource.addAsync(Url.Registration, 'node', testNode);
    });

    after(() => {
      return Resource.removeAsync(Url.Registration, 'nodes', testNode.id);
    });

    // test cases
    it('should list all nodes', () => {
      return Query.listAllAsync(Url.Query, 'nodes', 'nodes.json');
    });

    it('should get a single node by id', () => {
      return Query.getResourceByIdAsync(Url.Query, 'nodes', 'node.json', testNode.id);
    });

    it('should return an error when the requested node id does not exist', () => {
      return Query.getResourceByIdAsync(Url.Query, 'nodes', 'node.json', 'nonexisten id');
    });

  });
});
