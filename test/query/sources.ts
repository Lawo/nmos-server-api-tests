import { Hooks } from './../util/hooks';
import { Query } from './../util/query';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Query', () => {
  describe('Sources', () => {

    let testSource = loadJsonFile.sync('./test/resources/source.json');

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
