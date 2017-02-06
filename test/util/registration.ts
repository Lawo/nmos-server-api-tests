import { expect } from 'chai';
import { JsonSchema } from './../util/jsonSchema';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

export class Registration {
  // test cases
  public static async createOrUpdateResourceAsync(url: string, type: string, testResource: any, status: number) {
    let body = {
      'type': type,
      'data': testResource
    };

    let res = await chai.request(url).post('/resource').send(body);

    expect(res).to.have.status(status);
    expect((<any>res).headers).property('location');

    let schema = new JsonSchema('./specification/schemas', 'registrationapi-resource-response.json');
    schema.validate(res.body);
  }

  public static async getResourceAsync(url: string, resourceType: string, id: string) {
    try {
      let res = await chai.request(url).get(['/resource', resourceType, id].join('/'));
      expect(res).to.have.status(200);

      let schema = new JsonSchema('./specification/schemas', 'registrationapi-resource-response.json');
      schema.validate(res.body);
    } catch (err) {
      expect(err).to.have.status(404);

      let schema = new JsonSchema('./specification/schemas', 'error.json');
      schema.validate(err.response.body);
    }
  }

  public static async deleteResourceAsync(url: string, resourceType: string, id: string) {
    try {
      let res = await chai.request(url).del(['/resource', resourceType, id].join('/'));
      expect(res).to.have.status(204);
    } catch (err) {
      expect(err).to.have.status(404);

      let schema = new JsonSchema('./specification/schemas', 'error.json');
      schema.validate(err.response.body);
    }
  }

  public static async getNodeHealthAsync(url: string, id: string) {
    try {
      let res = await chai.request(url).get('/health/nodes/' + id);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('health');

      let schema = new JsonSchema('./specification/schemas', 'registrationapi-health-response.json');
      schema.validate(res.body);
    } catch (err) {
      expect(err).to.have.status(404);

      let schema = new JsonSchema('./specification/schemas', 'error.json');
      schema.validate(err.response.body);
    }
  }

  public static async updateNodeHealthAsync(url: string, id: string) {
    try {
      let res = await chai.request(url).post('/health/nodes/' + id);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('health');

      let schema = new JsonSchema('./specification/schemas', 'registrationapi-health-response.json');
      schema.validate(res.body);
    } catch (err) {
      expect(err).to.have.status(404);

      let schema = new JsonSchema('./specification/schemas', 'error.json');
      schema.validate(err.response.body);
    }
  }

}
