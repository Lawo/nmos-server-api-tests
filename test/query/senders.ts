import { Query } from './../util/query';
import { Resource } from './../util/resource';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Query', () => {
  describe('Senders', () => {

    let testSender = loadJsonFile.sync('./test/resources/sender.json');

    // hooks
    before(() => {
      return Resource.addAsync(Url.Registration, 'sender', testSender);
    });

    after(() => {
      return Resource.removeAsync(Url.Registration, 'senders', testSender.id);
    });

    // test cases
    it('should list all senders', () => {
      return Query.listAllAsync( Url.Query, 'senders', 'senders.json');
    });

    it('should return the desired sender by flow_id', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'senders', 'senders.json', 'flow_id', testSender.flow_id);
    });

    it('should return the desired sender by label', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'senders', 'senders.json', 'label', testSender.label);
    });

    it('should return the desired sender by description', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'senders', 'senders.json', 'description', testSender.description);
    });

    it('should return the desired sender by transport', () => {
      return Query.getResourcesByParameterAsync(Url.Query, 'senders', 'senders.json', 'transport', testSender.transport);
    });

    it('should get a single sender by id', () => {
      return Query.getResourceByIdAsync(Url.Query, 'senders', 'sender.json', testSender.id);
    });

    it('should return an error when the requested sender id does not exist', () => {
      return Query.getResourceByIdAsync(Url.Query, 'senders', 'sender.json', 'nonexistent id');
    });

  });
});
