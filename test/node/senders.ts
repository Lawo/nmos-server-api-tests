import { Node } from './../util/node';
import { Url } from './../util/url';

describe('Node', () => {
  describe('Senders', () => {

    it('should be empty', (done) => {
      Node.expectEmptyResources(done, Url.Node, 'senders');
    });

    it('should return an error when the requested sender id does not exist', (done) => {
      Node.failGetNonExistentResource(done, Url.Node, 'senders');
    });

  });
});
