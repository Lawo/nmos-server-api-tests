import { Url } from './../util/url';
import { Version } from './../util/version';

describe('Registration', () => {
  describe('Version', () => {

    it('should be v1.0', () => {
      return Version.checkVersionAsync(Url.Registration);
    });

  });
});
