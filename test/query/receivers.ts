import { Hooks } from './../util/hooks';
import { Query } from './../util/query';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Query', () => {
  describe('Receivers', () => {

    let testReceiver = loadJsonFile.sync('./test/resources/receiver.json');

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
