import { expect } from 'chai';
import { JsonSchema } from './jsonSchema';

export class Error {
  private static errorSchema = new JsonSchema('./specification/schemas', 'error.json');

  public static validate(err: any, status: number) {
    expect(err).to.have.status(status);
    expect(err.response.body.code).to.equal(status);

    this.errorSchema.validate(err.response.body);
  }

}
