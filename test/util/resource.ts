import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

export class Resource {
  public static async addAsync(url: string, type: string, testResource: Object) {
    try {
      // add test resource
      let body = {
        'type': type,
        'data': testResource
      };

      await chai.request(url).post('/resource').send(body);
    } catch (err) {
      return err;
    }
  }

  public static async removeAsync(url: string, resourceType: string, id: string) {
    try {
      // remove test resource
      await chai.request(url).del(['/resource', resourceType, id].join('/'));
    } catch (err) {
      return err;
    }
  }
}
