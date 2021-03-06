import { expect } from 'chai';
import { Error } from './../util/error';
import { JsonSchema } from './../util/jsonSchema';
import { Query } from './../util/query';
import { Resource } from './../util/resource';
import { Subscription } from './../util/subscription';
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
    let invalidId = '00000000-0000-1000-8000-000000000000';

    let testNode = loadJsonFile.sync('./test/resources/node.json');
    let subscriptionResponseSchema2 = new JsonSchema('./specification/schemas', 'queryapi-subscription-response.json');

    // functions
    async function createSubscriptionAsync() {
      let res = await Subscription.addAsync(Url.Query, testSubscription);
      testId = res.body.id;

      expect(res).to.have.status(201);
      subscriptionResponseSchema2.validate(res.body);
    };

    async function updateSubscriptionAsync() {
      // add the same subscription again
      let res = await Subscription.addAsync(Url.Query, testSubscription);

      expect(res).to.have.status(200);
      expect(res.body.id).to.equal(testId);
      subscriptionResponseSchema2.validate(res.body);
    }

    async function getSubscriptionsAsync(subscriptionId: string) {
      try {
        let res = await chai.request(Url.Query).get('/subscriptions/' + subscriptionId);

        expect(res).to.have.status(200);
        subscriptionResponseSchema2.validate(res.body);
      } catch (err) {
        Error.validate(err, 404);
      }
    }

    async function deleteSubscriptionAsync(subscriptionId: string) {
      try {
        let res = await chai.request(Url.Query).del('/subscriptions/' + subscriptionId);
        expect(res).to.have.status(204);
      } catch (err) {
        Error.validate(err, 404);
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

      let [resourceRes, dataRes] = await Promise.all([
        chai.request(Url.Registration).post('/resource').send(body),
        new Promise<any>((resolve) => {
          ws.onmessage = e => {
            let data = JSON.parse(e.data);
            resolve(data);
          };
        })
      ]);

      expect(resourceRes).to.have.status(201);
      expect(dataRes.grain.data[0].post.id === testId);

      let websocketSchema = new JsonSchema('./specification/schemas', 'queryapi-v1.0-subscriptions-websocket.json');
      websocketSchema.validate(dataRes);

      ws.close();
    }

    // hooks
    afterEach(() => {
      return Resource.removeAsync(Url.Registration, 'nodes', testNode.id);
    });

    // test cases
    describe('no subscription created yet', () => {

      // hooks
      afterEach(() => {
        return (async () => {
          await Subscription.removeAsync(Url.Query, testId);
          testId = undefined;
        })();
      });

      it('should create a websocket subscription to an API resource', () => {
        return createSubscriptionAsync();
      });

      it('should get a single subscription', () => {
        return getSubscriptionsAsync(invalidId);
      });

      it('should delete a single subscription', () => {
        return deleteSubscriptionAsync(invalidId);
      });
    });

    describe('subscription already created', () => {

      // hooks
      beforeEach(() => {
        return (async () => {
          let res = await Subscription.addAsync(Url.Query, testSubscription);
          testId = res.body.id;
        })();
      });

      afterEach(() => {
        return (async () => {
          await Subscription.removeAsync(Url.Query, testId);
          testId = undefined;
        })();
      });

      it('should list all subscriptions', () => {
        return Query.listAllAsync(Url.Query, 'subscriptions', 'queryapi-subscriptions-response.json');
      });

      it('should create a websocket subscription to an API resource', () => {
        return updateSubscriptionAsync();
      });

      it('should get a single subscription', () => {
        return getSubscriptionsAsync(testId);
      });

      it('should delete a single subscription', () => {
        return deleteSubscriptionAsync(testId);
      });

      it('should get subscription notification via websocket when adding a resource', () => {
        return getSubscriptionNotificationAsync();
      });
    });

  });
});
