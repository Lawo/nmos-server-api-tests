import { Hooks } from './../util/hooks';
import { Query } from './../util/query';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Query', () => {
  describe('Devices', () => {

    let testDevice = loadJsonFile.sync('./test/resources/device.json');

    // hooks
    before((done) => {
      Hooks.addResource(done, Url.Registration, 'device', testDevice);
    });

    after((done) => {
      Hooks.removeResource(done, Url.Registration, 'devices', testDevice.id);
    });

    // test cases
    it('should list all devices', () => {
      return Query.listAllAsync(Url.Query, 'devices', 'devices.json');
    });

    it('should return the desired device by node_id', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'devices', 'devices.json', 'node_id', testDevice.node_id);
    });

    it('should return the desired device by label', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'devices', 'devices.json', 'label', testDevice.label);
    });

    it('should get a single device by id', () => {
      return Query.getResourceByIdAsync(Url.Query, 'devices', 'device.json', testDevice.id);
    });

    it('should return an error when the requested device id does not exist', () => {
      return Query.getResourceByIdAsync(Url.Query, 'devices', 'device.json', 'nonexistent id');
    });

  });
});
