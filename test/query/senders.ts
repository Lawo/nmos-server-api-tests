import { Hooks } from './../util/hooks';
import { Query } from './../util/query';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Query', () => {
  describe('Senders', () => {

    let testSender = loadJsonFile.sync('./test/resources/sender.json');

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
