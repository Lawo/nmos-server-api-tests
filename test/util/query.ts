import { expect } from 'chai';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);

import loadJsonFile = require('load-json-file');

export class Query {
  // test cases
  public static listAll(done: MochaDone, url: string, resourceType: string) {
    chai.request(url)
      .get('/' + resourceType)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  }

  public static async listAllAsync(url: string, resourceType: string) {
    let res = await chai.request(url).get('/' + resourceType);
    expect(res).to.have.status(200);
    expect(res).to.be.json;
  }

  public static validateSchema(done: MochaDone, url: string, resourceType: string, schemaFile: string) {
    chai.request(url)
      .get('/' + resourceType)
      .end((err, res) => {
        expect(res).to.have.status(200);
        let schema = loadJsonFile.sync(schemaFile);

        res.body.forEach((entry: any) => {
          expect(entry).to.be.jsonSchema(schema);
        });

        done();
      });
  }

  public static containTestResource(done: MochaDone, url: string, resourceType: string, label: string) {
    chai.request(url)
      .get('/' + resourceType)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.some((entry: any) => entry.label === label)).to.be.true;
        done();
      });
  }

  public static getResourceByParameter(done: MochaDone, url: string, resourceType: string, parameterKey: string, parameterValue: string) {
    chai.request(url)
      .get('/' + resourceType)
      .field(parameterKey, parameterValue)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.some((entry: any) => entry[parameterKey] === parameterValue)).to.be.true;
        done();
      });
  }

  public static getSingleResourceById(done: MochaDone, url: string, resourceType: string, id: string) {
    chai.request(url)
      .get('/' + resourceType + '/' + id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.id).to.equal(id);
        done();
      });
  }

  public static failGetNonExistentResource(done: MochaDone, url: string, resourceType: string) {
    chai.request(url)
      .get('/' + resourceType + '/nonexistent id')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  }

}
