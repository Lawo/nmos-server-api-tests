import { expect } from 'chai';
import { JsonSchema } from './../util/jsonSchema';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

export class Base {

  public static async getApiPathsAsync(url: string, schemaFile: string) {
    let res = await chai.request(url).get('/');

    expect(res).to.have.status(200);
    expect(res).to.be.json;

    let baseSchema = new JsonSchema('./specification/schemas', schemaFile);
    baseSchema.validate(res.body);
  }

  public static async optionsAsync(url: string) {
    let res = await chai.request(url).options('/');
    expect(res).to.have.status(200);
  }

  public static async postAsync(url: string) {
    try {
      await chai.request(url).post('/');
    } catch (err) {
      expect(err).to.have.status(405);
    }
  }

}
