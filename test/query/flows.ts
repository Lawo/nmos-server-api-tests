import { Hooks } from './../util/hooks';
import { Query } from './../util/query';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Query', () => {
  describe('Flows', () => {

    let testFlow = loadJsonFile.sync('./test/resources/flow.json');

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

