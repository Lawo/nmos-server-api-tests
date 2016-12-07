import { Url } from './../util/url';
import { QueryUtil } from './../util/queryUtil';

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
      QueryUtil.addSubscription(done, Url.Query, testSubscription);
    });

    // test cases
    it('should list all subscriptions on /subscriptions GET', (done) => {
      QueryUtil.listAll(done, Url.Query, '/subscriptions');
    });
  });
});
