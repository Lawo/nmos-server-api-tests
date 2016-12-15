import { Hooks } from './../util/hooks';
import { Query } from './../util/query';
import { Url } from './../util/url';

describe('Query', () => {
  describe('Nodes', () => {

    let testNode = {
      'version': '1441973902:879053935',
      'hostname': 'TestNode1',
      'label': 'TestNode1',
      'href': 'http://172.29.80.65:12345/',
      'services': [
        {
          'href': 'http://172.29.80.65:12345/x-manufacturer/pipelinemanager/',
          'type': 'urn:x-manufacturer:service:pipelinemanager'
        }
      ],
      'caps': {},
      'id': '3b8be755-08ff-452b-b217-c9151eb21193'
    };

    // hooks
    before((done) => {
      Hooks.addResource(done, Url.Registration, 'node', testNode);
    });

    after((done) => {
      Hooks.removeResource(done, Url.Registration, 'nodes', testNode.id);
    });

    // test cases
    it('should list all nodes on /nodes GET', (done) => {
      Query.listAll(done, Url.Query, 'nodes');
    });

    it('should validate against JSON-schema', (done) => {
      Query.validateSchema(done, Url.Query, 'nodes', './specification/schemas/node.json');
    });

    it('should contain the test nodes', (done) => {
      Query.containTestResource(done, Url.Query, 'nodes', testNode.label);
    });

    it('should get a single node by id', (done) => {
      Query.getSingleResourceById(done, Url.Query, 'nodes', testNode.id);
    });

    it('should return an error when the requested node id does not exist', (done) => {
      Query.failGetNonExistentResource(done, Url.Query, 'nodes');
    });

  });
});
