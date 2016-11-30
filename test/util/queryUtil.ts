import { expect } from 'chai';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

export class QueryUtil {

  public static listAll(done: MochaDone, url: string, resourceType: string) {
    chai.request(url)
      .get(resourceType)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  }

}
