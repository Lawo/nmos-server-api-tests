import { expect } from 'chai';
import { JsonSchema } from './../util/jsonSchema';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

export class Node {
  // hooks

  // test cases
  public static async listResourcesAsync(url: string, resourceType: string, schemaFile: string) {
    let res = await chai.request(url).get('/' + resourceType);

    expect(res).to.have.status(200);
    expect(res).to.be.json;

    let schema = new JsonSchema('./specification/schemas', schemaFile);
    schema.validate(res.body);
  }

  public static async getResourceAsync(url: string, resourceType: string, schemaFile: string, id: string) {
    try {
      let res = await chai.request(url).get('/' + resourceType + '/' + id);
      expect(res).to.have.status(200);

      let schema = new JsonSchema('./specification/schemas', schemaFile);
      schema.validate(res.body);
    } catch (err) {
      expect(err).to.have.status(404);
    }
  }

  public static async requestChangeAsync(url: string, id: string, target: string, errorCode: number) {
    try {
      let body = {
        'description': 'Camera',
        'label': 'Camera',
        'manifest_href': 'http://172.29.176.142:12345/x-nmos/node/v1.0/self/pipelinemanager/run/pipeline/1/pipel/ipp_rtptx0c6d/misc/sdp/',
        'flow_id': '84f1a535-748b-457c-a25f-49d6691bab30',
        'id': '72af8f63-15ad-4ec2-8a22-363b4a094fee',
        'transport': 'urn:x-nmos:transport:rtp.mcast',
        'device_id': '2b9ad611-da45-4175-b091-41577f09f15f'
      };

      let res = await chai.request(url).put('/receivers/' + '/' + id + '/' + target).send(body);

      expect(res).to.have.status(202);

      let schema = new JsonSchema('./specification/schemas', 'sender.json');
      schema.validate(res.body);
    } catch (err) {
      expect(err).to.have.status(errorCode);
    }
  };

}
