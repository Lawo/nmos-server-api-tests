import { Url } from './../util/url';
import { Hooks } from './../util/hooks';
import { Query } from './../util/query';

describe('Query', () => {
  describe('Receivers', () => {

    let testReceiver = {
      'description': 'RTP receiver 1',
      'tags': {
        'Location': [
          'Location 1'
        ]
      },
      'format': 'urn:x-nmos:format:video',
      'caps': {},
      'device_id': '0d0cb97e-b96a-4a39-887f-d491492d9081',
      'version': '1441895693:480000000',
      'label': 'Viewer 1',
      'id': '3350d113-1593-4271-a7f5-f4974415bb8e',
      'transport': 'urn:x-nmos:transport:rtp',
      'subscription': {
        'sender_id': '55311762-8003-48fa-a645-0a0c7621ce45'
      }
    };

    // hooks
    before((done) => {
      Hooks.addResource(done, Url.Registration, 'receiver', testReceiver);
    });

    after((done) => {
      Hooks.removeResource(done, Url.Registration, 'receivers', testReceiver.id);
    });

    // test cases
    it('should list all receivers on /receivers GET', (done) => {
      Query.listAll(done, Url.Query, 'receivers');
    });

    it('should validate against JSON-schema', (done) => {
      Query.validateSchema(done, Url.Query, 'receivers', './specification/schemas/receiver.json');
    });

    it('should contain the test receivers', (done) => {
      Query.containTestResource(done, Url.Query, 'receivers', testReceiver.label);
    });

    it('should return the desired receiver by label', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'receivers', 'label', testReceiver.label);
    });

    it('should return the desired receiver by description', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'receivers', 'description', testReceiver.description);
    });

    it('should return the desired receiver by format', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'receivers', 'format', testReceiver.format);
    });

    it('should return the desired receiver by transport', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'receivers', 'transport', testReceiver.transport);
    });

    it('should get a single receiver by id', (done) => {
      Query.getSingleResourceById(done, Url.Query, 'receivers', testReceiver.id);
    });

    it('should return an error when the requested receiver id does not exist', (done) => {
      Query.failGetNonExistentResource(done, Url.Query, 'receivers');
    });

  });
});
