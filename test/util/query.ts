import { expect } from 'chai';
import { Error } from './error';
import { JsonSchema } from './jsonSchema';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

export class Query {
  // test cases
  public static async listAllAsync(url: string, resourceType: string, schemaFile: string) {
    let res = await chai.request(url).get('/' + resourceType);

    expect(res).to.have.status(200);
    expect(res).to.be.json;

    let schema = new JsonSchema('./specification/schemas', schemaFile);
    schema.validate(res.body);
  }

  public static async getResourcesByParameterAsync(
    url: string,
    resourceType: string,
    schemaFile: string,
    parameterKey: string,
    parameterValue: string) {
    let res = await chai.request(url).get('/' + resourceType).field(parameterKey, parameterValue);

    expect(res).to.have.status(200);
    expect(res.body.some((entry: any) => entry[parameterKey] === parameterValue)).to.be.true;

    let schema = new JsonSchema('./specification/schemas', schemaFile);
    schema.validate(res.body);
  }

  public static async getResourceByIdAsync(url: string, resourceType: string, schemaFile: string, id: string) {
    try {
      let res = await chai.request(url).get('/' + resourceType + '/' + id);

      expect(res).to.have.status(200);
      expect(res.body.id).to.equal(id);

      let schema = new JsonSchema('./specification/schemas', schemaFile);
      schema.validate(res.body);
    } catch (err) {
      Error.validate(err, 404);
    }
  }

}
