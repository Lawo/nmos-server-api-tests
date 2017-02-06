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
    it('should list all flows', () => {
      return Query.listAllAsync(Url.Query, 'flows', 'flows.json');
    });

    it('should return the desired flow by source_id', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'flows', 'flows.json', 'source_id', testFlow.source_id);
    });

    it('should return the desired flow by label', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'flows', 'flows.json', 'label', testFlow.label);
    });

    it('should return the desired flow by description', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'flows', 'flows.json', 'description', testFlow.description);
    });

    it('should return the desired flow by format', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'flows', 'flows.json', 'format', testFlow.format);
    });

    it('should get a single flow by id', () => {
      return Query.getResourceByIdAsync(Url.Query, 'flows', 'flow.json', testFlow.id);
    });

    it('should return an error when the requested flow id does not exist', () => {
      return Query.getResourceByIdAsync(Url.Query, 'flows', 'flow.json', 'nonexistent id');
    });

  });
});

