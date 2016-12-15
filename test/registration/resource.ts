import { Url } from './../util/url';
import { Registration } from './../util/registration';
import { Hooks } from './../util/hooks';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Registration', () => {
  describe('Resource', () => {

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

    describe('not registered', () => {
      // hooks
      afterEach((done) => {
        Hooks.removeResource(done, Url.Registration, 'nodes', testNode.id);
      });

      // test cases
      it('should create a registered resource', (done) => {
        Registration.createOrUpdateResource(done, Url.Registration, 'node', testNode, './specification/schemas/node.json', 201);
      });

      it('should fail when trying to get non existent resource (for debug use only)', (done) => {
        Registration.getResource(done, Url.Registration, 'nodes', testNode.id, 404);
      });

      it('should fail when trying to delete a non existent resource', (done) => {
        Registration.deleteResource(done, Url.Registration, 'nodes', testNode.id, 404);
      });

    });

    describe('already registered', () => {
      // hooks
      beforeEach((done) => {
        Hooks.addResource(done, Url.Registration, 'node', testNode);
      });

      afterEach((done) => {
        Hooks.removeResource(done, Url.Registration, 'nodes', testNode.id);
      });

      // test cases
      it('should update a registered resource', (done) => {
        Registration.createOrUpdateResource(done, Url.Registration, 'node', testNode, './specification/schemas/node.json', 200);
      });

      it('should get a registered resource (for debug use only)', (done) => {
        Registration.getResource(done, Url.Registration, 'nodes', testNode.id, 200);
      });

      it('should delete a registered resource', (done) => {
        Registration.deleteResource(done, Url.Registration, 'nodes', testNode.id, 204);
      });

    });

  });
});
