import { expect } from 'chai';

import * as chai from 'chai';
import chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);

import loadJsonFile = require('load-json-file');

export class JsonSchema {
  private schema: any;

  constructor(schemaFolder: string, schemaFileName: string) {
    this.schema = loadJsonFile.sync(schemaFolder + '/' + schemaFileName);

      chai.tv4.addSchema(schemaFileName, this.schema);

      let missingUris = chai.tv4.getMissingUris();
      missingUris.forEach(missingUri => {
        chai.tv4.addSchema(missingUri, loadJsonFile.sync(schemaFolder + '/' + missingUri));
      });
  }

  public validate(data: any) {
    expect(data).to.be.jsonSchema(this.schema);
  }
}
