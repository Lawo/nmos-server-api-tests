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
    it('should list all devices on /devices GET', (done) => {
      Query.listAll(done, Url.Query, 'devices');
    });

    it('should validate against JSON-schema', (done) => {
      Query.validateSchema(done, Url.Query, 'devices', './specification/schemas/device.json');
    });

    it('should contain the test devices', (done) => {
      Query.containTestResource(done, Url.Query, 'devices', testDevice.label);
    });

    it('should return the desired device by node_id', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'devices', 'node_id', testDevice.node_id);
    });

    it('should return the desired device by label', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'devices', 'label', testDevice.label);
    });

    it('should get a single device by id', (done) => {
      Query.getSingleResourceById(done, Url.Query, 'devices', testDevice.id);
    });

    it('should return an error when the requested device id does not exist', (done) => {
      Query.failGetNonExistentResource(done, Url.Query, 'devices');
    });

  });
});
