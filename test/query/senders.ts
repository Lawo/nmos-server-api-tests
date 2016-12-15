import { Url } from './../util/url';
import { Hooks } from './../util/hooks';
import { Query } from './../util/query';

describe('Query', () => {
  describe('Senders', () => {

    let testSender = {
      'description': 'Camera 1',
      'label': 'Camera 1',
      'manifest_href':
      'http://172.29.80.25:12345/x-nmos/node/v1.0/self/pipelinemanager/run/pipeline/1/pipel/ipp_rtptx2701/misc/sdp/stream.sdp',
      'version': '1441724086:828491206',
      'flow_id': '75bfddce-7142-4368-bb4a-8a82c837c6df',
      'id': '4002d6b5-5775-4975-9859-5b330fcea288',
      'transport': 'urn:x-nmos:transport:rtp.mcast',
      'device_id': '3a98e804-9871-4699-ba31-d608309d8933',
      'tags': {}
    };

    // hooks
    before((done) => {
      Hooks.addResource(done, Url.Registration, 'sender', testSender);
    });

    after((done) => {
      Hooks.removeResource(done, Url.Registration, 'senders', testSender.id);
    });

    // test cases
    it('should list all senders on /senders GET', (done) => {
      Query.listAll(done, Url.Query, 'senders');
    });

    it('should validate against JSON-schema', (done) => {
      Query.validateSchema(done, Url.Query, 'senders', './specification/schemas/sender.json');
    });

    it('should contain the test senders', (done) => {
      Query.containTestResource(done, Url.Query, 'senders', testSender.label);
    });

    it('should return the desired sender by flow_id', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'senders', 'flow_id', testSender.flow_id);
    });

    it('should return the desired sender by label', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'senders', 'label', testSender.label);
    });

    it('should return the desired sender by description', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'senders', 'description', testSender.description);
    });

    it('should return the desired sender by transport', (done) => {
      Query.getResourceByParameter(done, Url.Query, 'senders', 'transport', testSender.transport);
    });

    it('should get a single sender by id', (done) => {
      Query.getSingleResourceById(done, Url.Query, 'senders', testSender.id);
    });

    it('should return an error when the requested sender id does not exist', (done) => {
      Query.failGetNonExistentResource(done, Url.Query, 'senders');
    });

  });
});
