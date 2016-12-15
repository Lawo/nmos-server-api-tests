import { Url } from './../util/url';
import { Hooks } from './../util/hooks';
import { Query } from './../util/query';

describe('Query', () => {
  describe('Devices', () => {

    let testDevice = {
      'receivers': <any>[],
      'label': 'pipeline 1 default device',
      'version': '1441723957:582701772',
      'senders': [
        'c72cca5b-01db-47aa-bb00-03893defbfae',
        '171d5c80-7fff-4c23-9383-46503eb1c63e',
        'a2655c48-8a46-4c82-b9bc-98760d59d7f8'
      ],
      'id': 'c501ae64-f525-48b7-9816-c5e8931bc017',
      'node_id': '1d452562-e1d5-4e84-b057-5c24de5f6b48',
      'type': 'urn:x-nmos:device:pipeline'
    };

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
