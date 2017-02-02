import { Base } from './../util/base';
import { Url } from './../util/url';

describe('Query', () => {
  describe('Base (/)', () => {

    it('GET should return list of paths available from this API', () => {
      return Base.getApiPathsAsync(Url.Query, 'queryapi-base.json');
    });

    it('OPTIONS should return empty answer and Status OK.', () => {
      return Base.optionsAsync(Url.Query);
    });

    it('POST should not be supported.', () => {
      return Base.postAsync(Url.Query);
    });

  });
});
