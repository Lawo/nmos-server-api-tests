import { Url } from './../util/url';
import { Hooks } from './../util/hooks';
import { Query } from './../util/query';

describe('Query', () => {
  describe('Flows', () => {

    let testFlow = {
      'description': 'Off-air proxy',
      'format': 'urn:x-nmos:format:video',
      'tags': {},
      'label': 'Off-air proxy',
      'version': '1441724130:194944510',
      'parents': <any>[],
      'source_id': 'c7b1c809-84d4-427d-b6bb-c8397c66ce2b',
      'id': '0c1f03d7-7e94-4b21-94d1-3ffbee8a0606'
    };

    // hooks
    before((done) => {
      Hooks.addResource(done, Url.Registration, 'flow', testFlow);
    });

    after((done) => {
      Hooks.removeResource(done, Url.Registration, 'flows', testFlow.id);
    });

    // test cases
    it('should list all flows on /flows GET', (done) => {
      Query.listAll(done, Url.Query, 'flows');
    });

    it('should validate against JSON-schema', (done) => {
      Query.validateSchema(done, Url.Query, 'flows', './specification/schemas/flow.json');
    });

    it('should contain the test flows', (done) => {
      Query.containTestResource(done, Url.Query, 'flows', testFlow.label);
    });

    it('should return the desired flow by source_id', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'flows', 'source_id', testFlow.source_id);
    });

    it('should return the desired flow by label', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'flows', 'label', testFlow.label);
    });

    it('should return the desired flow by description', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'flows', 'description', testFlow.description);
    });

    it('should return the desired flow by format', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'flows', 'format', testFlow.format);
    });

    it('should get a single flow by id', (done) => {
      Query.getSingleResourceById(done, Url.Query, 'flows', testFlow.id);
    });

    it('should return an error when the requested flow id does not exist', (done) => {
      Query.failGetNonExistentResource(done, Url.Query, 'flows');
    });

  });
});

