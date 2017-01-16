import { Hooks } from './../util/hooks';
import { Registration } from './../util/registration';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Registration', () => {
  describe('Health', () => {

    let testNode = loadJsonFile.sync('./test/resources/node.json');

    describe('node is existing', () => {

      // hooks
      before((done) => {
        Hooks.addResource(done, Url.Registration, 'node', testNode);
      });

      after((done) => {
        Hooks.removeResource(done, Url.Registration, 'nodes', testNode.id);
      });

      // test cases
      it('should show a node\'s health (for debug use only)', (done) => {
        Registration.getNodeHealth(done, Url.Registration, testNode.id, 200);
      });

      it('should update node health', (done) => {
        Registration.updateNodeHealth(done, Url.Registration, testNode.id, 200);
      });

    });

    describe('node is missing', () => {

      // test cases
      it('should fail when trying to show a missing node\'s health (for debug use only)', (done) => {
        Registration.getNodeHealth(done, Url.Registration, testNode.id, 404);
      });

      it('should fail to update a missing node\'s health', (done) => {
        Registration.updateNodeHealth(done, Url.Registration, testNode.id, 404);
      });

    });

  });
});
