import { Hooks } from './../util/hooks';
import { Query } from './../util/query';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Query', () => {
  describe('Nodes', () => {

    let testNode = loadJsonFile.sync('./test/resources/node.json');

    // hooks
    before((done) => {
      Hooks.addResource(done, Url.Registration, 'node', testNode);
    });

    after((done) => {
      Hooks.removeResource(done, Url.Registration, 'nodes', testNode.id);
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
