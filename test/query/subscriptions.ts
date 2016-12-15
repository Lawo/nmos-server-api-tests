import { Hooks } from './../util/hooks';
import { Query } from './../util/query';
import { Url } from './../util/url';

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

    // hooks
    before((done) => {
      Hooks.addSubscription(done, Url.Query, testSubscription);
    });

    // test cases
    it('should list all subscriptions on /subscriptions GET', (done) => {
      Query.listAll(done, Url.Query, 'subscriptions');
    });
  });
});
