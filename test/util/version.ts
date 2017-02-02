import { expect } from 'chai';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

export class Version {
  // test cases
  public static async checkVersionAsync(url: string) {
    // remove the version part
    let versionUrl = url.substring(0, url.lastIndexOf('/'));

    let res = await chai.request(versionUrl).get('');

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.contain('v1.0/');
  }
}
