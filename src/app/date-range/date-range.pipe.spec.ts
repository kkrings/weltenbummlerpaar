import { DateRangePipe } from './date-range.pipe';

describe('DateRangePipe', () => {
  it('create an instance', () => {
    const pipe = new DateRangePipe('de');
    expect(pipe).toBeTruthy();
  });
});
