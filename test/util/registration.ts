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

  public static getNodeHealth(done: MochaDone, url: string, id: string, status: number) {
    chai.request(url)
      .get('/health/nodes/' + id)
      .end(function (err, res) {
        expect(res).to.have.status(status);

        if (status === 200) {
          expect(res.body).to.have.property('health');
        }

        done();
      });
  }

  public static updateNodeHealth(done: MochaDone, url: string, id: string, status: number, testHealth: any) {
    chai.request(url)
      .post('/health/nodes/' + id)
      .send(testHealth)
      .end(function (err, res) {
        expect(res).to.have.status(status);

        if (status === 200) {
          expect(res.body).to.have.property('health', testHealth.health);
        }

        done();
      });
  }
}
