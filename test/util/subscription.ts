import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

export class Subscription {
  public static async addAsync(url: string, subscription: any): Promise<ChaiHttp.Response> {
    try {
      let res = await chai.request(url)
        .post('/subscriptions')
        .send(subscription);
      return res;
    } catch (err) {
      return err;
    }
  }

  public static async removeAsync(url: string, id: string): Promise<ChaiHttp.Response> {
    try {
      let res = await chai.request(url)
        .del('/subscriptions/' + id);
      return res;
    } catch (err) {
      return err;
    }
  }
};
