import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

export class Hooks {
  // hooks
  public static addResource(done: MochaDone, url: string, type: string, testResource: Object) {
    // add test resource
    let body = {
      'type': type,
      'data': testResource
    };

    chai.request(url)
      .post('/resource')
      .send(body)
      .end((err, res) => {
        done();
      });
  }

  public static removeResource(done: MochaDone, url: string, resourceType: string, id: string) {
    // remove test resource
    chai.request(url)
      .del(['/resource', resourceType, id].join('/'))
      .end((err, res) => {
        done();
      });
  }
}
