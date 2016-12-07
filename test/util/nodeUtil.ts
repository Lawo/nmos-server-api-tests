import { expect } from 'chai';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

export class NodeUtil {
  // hooks

  // test cases
  public static expectEmptyResources(done: MochaDone, url: string, resourceType: string) {
    chai.request(url)
      .get(resourceType)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.empty;
        done();
      });
  }

  public static failGetNonExistentResource(done: MochaDone, url: string, resourceType: string) {
    chai.request(url)
      .get(resourceType + '/nonexistent id')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  }

}
