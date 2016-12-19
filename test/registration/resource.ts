import { Hooks } from './../util/hooks';
import { Registration } from './../util/registration';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Registration', () => {
  let resources = [
    {
      type: 'device',
      resourceType: 'devices',
      resourceFile: './test/resources/device.json',
      schemaFile: './specification/schemas/device.json'
    },
    {
      type: 'flow',
      resourceType: 'flows',
      resourceFile: './test/resources/flow.json',
      schemaFile: './specification/schemas/flow.json'
    },
    {
      type: 'node',
      resourceType: 'nodes',
      resourceFile: './test/resources/node.json',
      schemaFile: './specification/schemas/node.json'
    },
    {
      type: 'receiver',
      resourceType: 'receivers',
      resourceFile: './test/resources/receiver.json',
      schemaFile: './specification/schemas/receiver.json'
    },
    {
      type: 'sender',
      resourceType: 'senders',
      resourceFile: './test/resources/sender.json',
      schemaFile: './specification/schemas/sender.json'
    },
    {
      type: 'source',
      resourceType: 'sources',
      resourceFile: './test/resources/source.json',
      schemaFile: './specification/schemas/source.json'
    }
  ];

  describe('Resource', () => {
    resources.forEach(resource => {

      describe(resource.type, () => {
        const testResource = loadJsonFile.sync(resource.resourceFile);

        describe('not registered', () => {
          // hooks
          afterEach((done) => {
            Hooks.removeResource(done, Url.Registration, resource.resourceType, testResource.id);
          });

          // test cases
          it('should create a registered resource', (done) => {
            Registration.createOrUpdateResource(done, Url.Registration, resource.type, testResource, resource.schemaFile, 201);
          });

          it('should fail when trying to get non existent resource (for debug use only)', (done) => {
            Registration.getResource(done, Url.Registration, resource.resourceType, testResource.id, 404);
          });

          it('should fail when trying to delete a non existent resource', (done) => {
            Registration.deleteResource(done, Url.Registration, resource.resourceType, testResource.id, 404);
          });

        });

        describe('already registered', () => {
          // hooks
          beforeEach((done) => {
            Hooks.addResource(done, Url.Registration, resource.type, testResource);
          });

          afterEach((done) => {
            Hooks.removeResource(done, Url.Registration, resource.resourceType, testResource.id);
          });

          // test cases
          it('should update a registered resource', (done) => {
            Registration.createOrUpdateResource(done, Url.Registration, resource.type, testResource, resource.schemaFile, 200);
          });

          it('should get a registered resource (for debug use only)', (done) => {
            Registration.getResource(done, Url.Registration, resource.resourceType, testResource.id, 200);
          });

          it('should delete a registered resource', (done) => {
            Registration.deleteResource(done, Url.Registration, resource.resourceType, testResource.id, 204);
          });

        });
      });
    });
  });
});
