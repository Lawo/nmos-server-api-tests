import { expect } from 'chai';
import { Hooks } from './../util/hooks';
import { Query } from './../util/query';
import { Url } from './../util/url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

import loadJsonFile = require('load-json-file');
import WebSocket = require('ws');

describe('Query', () => {
  describe('Subscriptions', () => {

    let testSubscription = {
      'max_update_rate_ms': 100,
      'resource_path': '/nodes',
      'params': {
        'label': 'testsubscription'
      },
      'persist': true
    };

    let testNode = loadJsonFile.sync('./test/resources/node.json');

    ///////////////////////////////////////////////////////////////////////////
    // helper functions
    async function addSubscriptionAsync(url: string, subscription: any) {
      try {
        let res = await chai.request(url)
          .post('/subscriptions')
          .send(subscription);
        return res;
      } catch (err) {
        return err;
      }
    }

    async function removeSubscriptionAsync(url: string, id: string) {
      try {
        let res = await chai.request(url)
          .del('/subscriptions/' + id);
        return res;
      } catch (err) {
        return err;
      }
    }

    async function createSubscriptionAsync() {
      let addRes = await addSubscriptionAsync(Url.Query, testSubscription);
      let id = addRes.body.id;

      expect(addRes).to.have.status(201);

      let removeRes = await removeSubscriptionAsync(Url.Query, id);
      expect(removeRes).to.have.status(204);
    }

    async function updateSubscriptionAsync() {
      let addRes = await addSubscriptionAsync(Url.Query, testSubscription);
      let id = addRes.body.id;

      // add the same subscription again
      let addRes2 = await addSubscriptionAsync(Url.Query, testSubscription);

      expect(addRes2).to.have.status(200);
      expect(addRes2.id).to.equal(addRes.id);

      let removeRes = await removeSubscriptionAsync(Url.Query, id);
      expect(removeRes).to.have.status(204);
    }

    async function getSubscriptionByIdAsync() {
      let addRes = await addSubscriptionAsync(Url.Query, testSubscription);
      let id = addRes.body.id;

      let subscriptionsRes = await chai.request(Url.Query).get('/subscriptions');
      let subscription = subscriptionsRes.body.find((item: any) => item.id === id);

      let subscriptionRes = await chai.request(Url.Query).get('/subscriptions/' + subscription.id);
      expect(subscriptionRes).to.have.status(200);

      let removeRes = await removeSubscriptionAsync(Url.Query, id);
      expect(removeRes).to.have.status(204);
    }

    async function failGetMissingSubscriptionByIdAsync() {
      try {
        await chai.request(Url.Query).get('/subscriptions/' + 'invalid id');
      } catch (err) {
        expect(err).to.have.status(404);
      }
    }

    async function deleteSubscriptionAsync() {
      let addRes = await addSubscriptionAsync(Url.Query, testSubscription);
      let id = addRes.body.id;

      let removeRes = await removeSubscriptionAsync(Url.Query, id);
      expect(removeRes).to.have.status(204);
    }

    async function failDeleteMissingSubscriptionAsync() {
      try {
        await removeSubscriptionAsync(Url.Query, 'invalid id');
      } catch (err) {
        expect(err).to.have.status(403);
      }
    }

    async function getSubscriptionNotificationAsync() {
      let addRes = await addSubscriptionAsync(Url.Query, testSubscription);
      let id = addRes.body.id;

      let subscriptionsRes = await chai.request(Url.Query).get('/subscriptions');
      let subscription = subscriptionsRes.body.find((item: any) => item.id === id);

      let ws = new WebSocket(subscription.ws_href);

      await new Promise((resolve) => {
        ws.onopen = e => {
          resolve();
        };
      });

      // register resource
      let body = {
        'type': 'node',
        'data': testNode
      };

      let [resourceRes, dataEntriesRes] = await Promise.all([
        chai.request(Url.Registration).post('/resource').send(body),
        new Promise<any>((resolve) => {
          ws.onmessage = e => {
            let dataEntries = JSON.parse(e.data).grain.data;
            resolve(dataEntries);
          };
        })
      ]);

      expect(resourceRes).to.have.status(201);
      expect(dataEntriesRes[0].post.id === id);

      ws.close();

      let removeRes = await removeSubscriptionAsync(Url.Query, id);
      expect(removeRes).to.have.status(204);
    }

    ///////////////////////////////////////////////////////////////////////////

    // hooks
    afterEach((done) => {
      Hooks.removeResource(done, Url.Registration, 'nodes', testNode.id);
    });

    // test cases
    it('should list all subscriptions on /subscriptions GET', (done) => {
      Query.listAll(done, Url.Query, 'subscriptions');
    });

    describe('no subscription created yet', () => {
      it('should create a websocket subscription to an API resource', () => {
        return createSubscriptionAsync();
      });

      it('should get a single subscription', () => {
        return failGetMissingSubscriptionByIdAsync();
      });

      it('should delete a single subscription', () => {
        return failDeleteMissingSubscriptionAsync();
      });
    });

    describe('subscription already created', () => {
      it('should create a websocket subscription to an API resource', () => {
        return updateSubscriptionAsync();
      });

      it('should get a single subscription', () => {
        return getSubscriptionByIdAsync();
      });

      it('should delete a single subscription', () => {
        return deleteSubscriptionAsync();
      });

      it('should get subscription notification via websocket when adding a resource', () => {
        return getSubscriptionNotificationAsync();
      });
    });

  });
});
