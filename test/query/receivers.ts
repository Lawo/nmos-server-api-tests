import { Query } from './../util/query';
import { Resource } from './../util/resource';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Query', () => {
  describe('Receivers', () => {

    let testReceiver = loadJsonFile.sync('./test/resources/receiver.json');

    // hooks
    before(() => {
      return Resource.addAsync(Url.Registration, 'receiver', testReceiver);
    });

    after(() => {
      return Resource.removeAsync(Url.Registration, 'receivers', testReceiver.id);
    });

    // test cases
    it('should list all receivers', () => {
      return Query.listAllAsync(Url.Query, 'receivers', 'receivers.json');
    });

    it('should return the desired receiver by label', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'receivers', 'receivers.json', 'label', testReceiver.label);
    });

    it('should return the desired receiver by description', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'receivers', 'receivers.json', 'description', testReceiver.description);
    });

    it('should return the desired receiver by format', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'receivers', 'receivers.json', 'format', testReceiver.format);
    });

    it('should return the desired receiver by transport', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'receivers', 'receivers.json', 'transport', testReceiver.transport);
    });

    it('should get a single receiver by id', () => {
      return Query.getResourceByIdAsync(Url.Query, 'receivers', 'receiver.json', testReceiver.id);
    });

    it('should return an error when the requested receiver id does not exist', () => {
      return Query.getResourceByIdAsync(Url.Query, 'receivers', 'receiver.json', 'nonexisten id');
    });

  });
});
