import { Node } from './../util/node';
import { Url } from './../util/url';

describe('Node', () => {
  describe('Flows', () => {

    it('should list flows', () => {
      return Node.listResourcesAsync(Url.Node, 'flows', 'flows.json');
    });

    it('should return an error when the requested flow id does not exist', () => {
      return Node.getResourceAsync(Url.Node, 'flows', 'flow.json', 'nonexistent id');
    });

  });
});
