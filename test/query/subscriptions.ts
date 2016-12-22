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
        'label': 'host1-ueli'
      },
      'persist': true
    };

    let testNode = loadJsonFile.sync('./test/resources/node.json');

    // hooks
    beforeEach((done) => {
      Hooks.addSubscription(done, Url.Query, testSubscription);
    });

    afterEach((done) => {
      Hooks.removeResource(done, Url.Registration, 'nodes', testNode.id);
    });

    // test cases
    it('should list all subscriptions on /subscriptions GET', (done) => {
      Query.listAll(done, Url.Query, 'subscriptions');
    });

    it('should get subscription notification via websocket when adding a resource', (done) => {
      chai.request(Url.Query)
        .get('/subscriptions')
        .end((err, res) => {

          let subscription = res.body.find((item: any) => item.params.label === testSubscription.params.label);
          let ws = new WebSocket(subscription.ws_href);

          ws.onopen = e => {
            // register resource
            let body = {
              'type': 'node',
              'data': testNode
            };

            chai.request(Url.Registration)
              .post('/resource')
              .send(body)
              .end((err2, res2) => {
              });
          };

          ws.onmessage = e => {
            let dataEntries = JSON.parse(e.data).grain.data;
            expect(dataEntries.some((entry: any) => entry.post.id === testNode.id)).to.be.true;
            ws.close();
            done();
          };

        });
    });

  });
});
