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

    let testId: string = undefined;

    let testNode = loadJsonFile.sync('./test/resources/node.json');

    ///////////////////////////////////////////////////////////////////////////
    // helper functions
    async function addSubscriptionAsync(url: string, subscription: any): Promise<ChaiHttp.Response> {
      try {
        let res = await chai.request(url)
          .post('/subscriptions')
          .send(subscription);
        return res;
      } catch (err) {
        return err;
      }
    }

    async function removeSubscriptionAsync(url: string, id: string): Promise<ChaiHttp.Response> {
      try {
        let res = await chai.request(url)
          .del('/subscriptions/' + id);
        return res;
      } catch (err) {
        return err;
      }
    }

    async function createSubscriptionAsync() {
      let res = await addSubscriptionAsync(Url.Query, testSubscription);
      testId = res.body.id;

      expect(res).to.have.status(201);
    }

    async function updateSubscriptionAsync() {
      // add the same subscription again
      let res = await addSubscriptionAsync(Url.Query, testSubscription);

      expect(res).to.have.status(200);
      expect(res.body.id).to.equal(testId);
    }

    async function getSubscriptionAsync() {
      let res = await chai.request(Url.Query).get('/subscriptions/' + testId);

      expect(res).to.have.status(200);
    }

    async function failGetMissingSubscriptionAsync() {
      try {
        await chai.request(Url.Query).get('/subscriptions/' + 'invalid id');
      } catch (err) {
        expect(err).to.have.status(404);
      }
    }

    async function deleteSubscriptionAsync() {
      let removeRes = await removeSubscriptionAsync(Url.Query, testId);
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
      let subscriptionsRes = await chai.request(Url.Query).get('/subscriptions');
      let subscription = subscriptionsRes.body.find((item: any) => item.id === testId);

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
      expect(dataEntriesRes[0].post.id === testId);

      ws.close();
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

      // hooks
      afterEach(() => {
        return (async () => {
          await removeSubscriptionAsync(Url.Query, testId);
          testId = undefined;
        })();
      });

      it('should create a websocket subscription to an API resource', () => {
        return createSubscriptionAsync();
      });

      it('should get a single subscription', () => {
        return failGetMissingSubscriptionAsync();
      });

      it('should delete a single subscription', () => {
        return failDeleteMissingSubscriptionAsync();
      });
    });

    describe('subscription already created', () => {

      // hooks
      beforeEach(() => {
        return (async () => {
          let res = await addSubscriptionAsync(Url.Query, testSubscription);
          testId = res.body.id;
        })();
      });

      afterEach(() => {
        return (async () => {
          await removeSubscriptionAsync(Url.Query, testId);
          testId = undefined;
        })();
      });

      it('should create a websocket subscription to an API resource', () => {
        return updateSubscriptionAsync();
      });

      it('should get a single subscription', () => {
        return getSubscriptionAsync();
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
