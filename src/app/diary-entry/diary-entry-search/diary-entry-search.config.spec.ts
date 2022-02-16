import { DiaryEntrySearchConfig } from './diary-entry-search.config';

describe('DiaryEntrySearchConfig', () => {
  let config: DiaryEntrySearchConfig;

  beforeEach(() => {
    config = new DiaryEntrySearchConfig();
  });

  it('#limitNumEntries should have been set to 10', () => {
    expect(config.limitNumEntries).toEqual(10);
  });
});
