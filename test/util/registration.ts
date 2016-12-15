import { expect } from 'chai';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

import loadJsonFile = require('load-json-file');

export class Registration {
  // test cases
  public static createOrUpdateResource(done: MochaDone, url: string, type: string, testResource: any, schemaFile: string, status: number) {
    let body = {
      'type': type,
      'data': testResource
    };

    chai.request(url)
      .post('/resource')
      .send(body)
      .end((err, res) => {
        expect(res).to.have.status(status);
        expect((<any>res).headers).property('location');
        let schema = loadJsonFile.sync('./specification/schemas/node.json');
        expect(res.body).to.be.jsonSchema(schema);
        done();
      });
  }

  public static getResource(done: MochaDone, url: string, resourceType: string, id: string, status: number) {
    chai.request(url)
      .get(['/resource', resourceType, id].join('/'))
      .end((err, res) => {
        expect(res).to.have.status(status);
        done();
      });
  }

  public static deleteResource(done: MochaDone, url: string, resourceType: string, id: string, status: number) {
    chai.request(url)
      .del(['/resource', resourceType, id].join('/'))
      .end((err, res) => {
        expect(res).to.have.status(status);
        done();
      });
  }
}


