import { Hooks } from './../util/hooks';
import { Registration } from './../util/registration';
import { Url } from './../util/url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Registration', () => {
  describe('Health', () => {

    let testNode = {
      'version': '1441973902:879053935',
      'hostname': 'TestNode1',
      'label': 'TestNode1',
      'href': 'http://172.29.80.65:12345/',
      'services': [
        {
          'href': 'http://172.29.80.65:12345/x-manufacturer/pipelinemanager/',
          'type': 'urn:x-manufacturer:service:pipelinemanager'
        }
      ],
      'caps': {},
      'id': '3b8be755-08ff-452b-b217-c9151eb21193'
    };

    let testHealth = {
      'health': '1441974486'
    };

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
        Registration.updateNodeHealth(done, Url.Registration, testNode.id, 200, testHealth);
      });

    });

    describe('node is missing', () => {

      // test cases
      it('should fail when trying to show a missing node\'s health (for debug use only)', (done) => {
        Registration.getNodeHealth(done, Url.Registration, testNode.id, 404);
      });

      it('should fail to update a missing node\'s health', (done) => {
        Registration.updateNodeHealth(done, Url.Registration, testNode.id, 404, testHealth);
      });

    });

  });
});
