import { Registration } from './../util/registration';
import { Resource } from './../util/resource';
import { Url } from './../util/url';

import loadJsonFile = require('load-json-file');

describe('Registration', () => {
  describe('Resource', () => {

    let resources = [
      {
        type: 'device',
        resourceType: 'devices',
        resourceFile: './test/resources/device.json'
      },
      {
        type: 'flow',
        resourceType: 'flows',
        resourceFile: './test/resources/flow.json'
      },
      {
        type: 'node',
        resourceType: 'nodes',
        resourceFile: './test/resources/node.json'
      },
      {
        type: 'receiver',
        resourceType: 'receivers',
        resourceFile: './test/resources/receiver.json'
      },
      {
        type: 'sender',
        resourceType: 'senders',
        resourceFile: './test/resources/sender.json'
      },
      {
        type: 'source',
        resourceType: 'sources',
        resourceFile: './test/resources/source.json'
      }
    ];

    resources.forEach(resource => {

      describe(resource.type, () => {
        let testResource = loadJsonFile.sync(resource.resourceFile);

        describe('not registered', () => {
          // hooks
          afterEach(() => {
            return Resource.removeAsync(Url.Registration, resource.resourceType, testResource.id);
          });

          // test cases
          it('should create a registered resource', () => {
            return Registration.createOrUpdateResourceAsync(Url.Registration, resource.type, testResource, 201);
          });

          it('should fail when trying to get non existent resource (for debug use only)', () => {
            return Registration.getResourceAsync(Url.Registration, resource.resourceType, testResource.id);
          });

          it('should fail when trying to delete a non existent resource', () => {
            return Registration.deleteResourceAsync(Url.Registration, resource.resourceType, testResource.id);
          });

        });

        describe('already registered', () => {
          // hooks
          beforeEach(() => {
            return Resource.addAsync(Url.Registration, resource.type, testResource);
          });

          afterEach(() => {
            return Resource.removeAsync(Url.Registration, resource.resourceType, testResource.id);
          });

          // test cases
          it('should update a registered resource', () => {
            return Registration.createOrUpdateResourceAsync(Url.Registration, resource.type, testResource, 200);
          });

          it('should get a registered resource (for debug use only)', () => {
            return Registration.getResourceAsync(Url.Registration, resource.resourceType, testResource.id);
          });

          it('should delete a registered resource', () => {
            return Registration.deleteResourceAsync(Url.Registration, resource.resourceType, testResource.id);
          });

        });
      });
    });
  });
});
