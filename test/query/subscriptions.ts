import { expect } from 'chai';
import { Hooks } from './../util/hooks';
import { Query } from './../util/query';
import { Url } from './../util/url';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

import loadJsonFile = require('load-json-file');
import WebSocket = require('ws');

///////////////////////////////////////////////////////////////////////////////

function delay(ms: number) {
  return new Promise<void>(function (resolve) {
    setTimeout(resolve, ms);
  });
}

async function asyncAwait(done: MochaDone) {
  console.log('Knock, knock!');

  await delay(1000);
  console.log("Who's there?");

  await delay(1000);
  console.log('async/await!');

  done();
}

///////////////////////////////////////////////////////////////////////////////

describe('Query', () => {
  describe.skip('Subscriptions', () => {

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
    it('should work with async and await', (done) => {
      asyncAwait(done);
    });

    it('should list all subscriptions on /subscriptions GET', (done) => {
      Query.listAll(done, Url.Query, 'subscriptions');
    });

    it('should get subscription by Id', (done) => {
      chai.request(Url.Query)
        .get('/subscriptions')
        .end((err, res) => {

          let subscription = res.body.find((item: any) => item.params.label === testSubscription.params.label);

          chai.request(Url.Query)
            .get('/subscriptions/' + subscription.id)
            .end((err2, res2) => {
              expect(res2).to.have.status(200);
              done();
            });
        });
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
