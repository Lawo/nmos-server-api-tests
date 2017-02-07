import { Node } from './../util/node';
import { Url } from './../util/url';

describe('Node', () => {
  describe('Devices', () => {

    it('should list devices', () => {
      return Node.listResourcesAsync(Url.Node, 'devices', 'devices.json');
    });

    it('should return an error when the requested device id does not exist', () => {
      return Node.getResourceAsync(Url.Node, 'devices', 'device.json', 'nonexistent id');
    });

  });
});
