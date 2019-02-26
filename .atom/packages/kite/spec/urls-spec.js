'use strict';

const path = require('path');
const urls = require('../lib/urls');

describe('urls helpers', () => {
  describe('internalGotoURL()', () => {
    it('escapes file paths in parameters', () => {
      const url = urls.internalGotoURL({
        filename: 'C:\\path\\to\\file.py',
        line: 123,
      });

      expect(url).toEqual('kite-atom-internal://goto/C:%5Cpath%5Cto%5Cfile.py:123');
    });
  });

  describe('authorizedPath()', () => {
    it('properly excapes characters in uri', () => {
      waitsForPromise(() => atom.workspace.open(path.join('jose\u0301', 'sample.py')).then(e => {
        expect(urls.authorizedPath(e))
        .toEqual(`/clientapi/permissions/authorized?filename=${
          path.join(atom.project.getPaths()[0], 'jose%CC%81', 'sample.py')
        }`);
      }));
    });
  });
});
