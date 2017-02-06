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
    it('should list all sources', () => {
      return Query.listAllAsync(Url.Query, 'sources', 'sources.json');
    });

    it('should return the desired source by device_id', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'sources', 'sources.json', 'device_id', testSource.device_id);
    });

    it('should return the desired source by label', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'sources', 'sources.json', 'label', testSource.label);
    });

    it('should return the desired source by description', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'sources', 'sources.json', 'description', testSource.description);
    });

    it('should return the desired source by format', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'sources', 'sources.json', 'format', testSource.format);
    });

    it('should get a single source by id', () => {
      return Query.getResourceByIdAsync(Url.Query, 'sources', 'source.json', testSource.id);
    });

    it('should return an error when the requested source id does not exist', () => {
      return Query.getResourceByIdAsync(Url.Query, 'sources', 'source.json', 'nonexistent id');
    });

  });
});
