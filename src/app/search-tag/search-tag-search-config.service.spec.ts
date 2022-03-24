/**
 * Unit tests for search tag search config
 * @packageDocumentation
 */

import { SearchTagSearchConfig } from './search-tag-search-config.service';

describe('SearchTagSearchConfig', () => {
  let config: SearchTagSearchConfig;

  beforeEach(() => {
    config = new SearchTagSearchConfig();
  });

  it('#waitForNumMs should be set to 300', () => {
    expect(config.waitForNumMs).toEqual(300);
  });
});
