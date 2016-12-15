import { Url } from './../util/url';
import { Hooks } from './../util/hooks';
import { Query } from './../util/query';

describe('Query', () => {
  describe('Sources', () => {

    let testSource = {
          'description': 'Camera 1',
          'format': 'urn:x-nmos:format:video',
          'tags': {
            'SourceDeviceType': [
              'UHD Camera'
            ],
            'host': [
              'host1'
            ],
            'location': [
              'Location 1'
            ]
          },
          'caps': {},
          'version': '1441724551:288670563',
          'parents': <any>[],
          'label': 'TestSource1',
          'id': '042a4126-0208-443d-bda6-833ffc27ed51',
          'device_id': '21a28338-fb2e-4df5-9b55-d58e6124bc9f'
    };

    // hooks
    before((done) => {
      Hooks.addResource(done, Url.Registration, 'source', testSource);
    });

    after((done) => {
      Hooks.removeResource(done, Url.Registration, 'sources', testSource.id);
    });

    // test cases
    it('should list all sources on /sources GET', (done) => {
      Query.listAll(done, Url.Query, 'sources');
    });

    it('should validate against JSON-schema', (done) => {
      Query.validateSchema(done, Url.Query, 'sources', './specification/schemas/source.json');
    });

    it('should contain the test sources', (done) => {
      Query.containTestResource(done, Url.Query, 'sources', testSource.label);
    });

    it('should return the desired source by device_id', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'sources', 'device_id', testSource.device_id);
    });

    it('should return the desired source by label', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'sources', 'label', testSource.label);
    });

    it('should return the desired source by description', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'sources', 'description', testSource.description);
    });

    it('should return the desired source by format', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'sources', 'format', testSource.format);
    });

    it('should get a single source by id', (done) => {
      Query.getSingleResourceById(done, Url.Query, 'sources', testSource.id);
    });

    it('should return an error when the requested source id does not exist', (done) => {
      Query.failGetNonExistentResource(done, Url.Query, 'sources');
    });

  });
});
