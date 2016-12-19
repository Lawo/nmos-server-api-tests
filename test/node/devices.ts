import { Node } from './../util/node';
import { Url } from './../util/url';

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
