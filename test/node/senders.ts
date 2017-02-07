import { Node } from './../util/node';
import { Url } from './../util/url';

describe('Node', () => {
  describe('Senders', () => {

    it('should list senders', () => {
      return Node.listResourcesAsync(Url.Node, 'senders', 'senders.json');
    });

    it('should return an error when the requested sender id does not exist', () => {
      return Node.getResourceAsync(Url.Node, 'senders', 'sender.json', 'nonexistent id');
    });

  });
});
