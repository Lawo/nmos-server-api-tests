import { Node } from './../util/node';
import { Url } from './../util/url';

describe('Node', () => {
  describe('Sources', () => {

    it('should be empty', (done) => {
      Node.expectEmptyResources(done, Url.Node, 'sources');
    });

    it('should return an error when the requested source id does not exist', (done) => {
      Node.failGetNonExistentResource(done, Url.Node, 'sources');
    });

  });
});
