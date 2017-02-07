import { Node } from './../util/node';
import { Url } from './../util/url';

describe('Node', () => {
  describe('Sources', () => {

    it('should list sources', () => {
      return Node.listResourcesAsync(Url.Node, 'sources', 'sources.json');
    });

    it('should return an error when the requested source id does not exist', () => {
      return Node.getResourceAsync(Url.Node, 'sources', 'source.json', 'nonexistent id');
    });

  });
});
