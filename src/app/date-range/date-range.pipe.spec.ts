import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { DateRangePipe } from './date-range.pipe';

registerLocaleData(localeDe);

describe('DateRangePipe', () => {
  let pipe: DateRangePipe;

  beforeEach(() => {
    pipe = new DateRangePipe('de');
  });

  describe('#dateMin equals #dateMax', () => {
    let dateRange: string;

    beforeEach(() => {
      dateRange = pipe.transform({
        dateMin: '2020-02-14',
        dateMax: '2020-02-14',
      });
    });

    it('#dateRange should have been transformed correctly', () => {
      expect(dateRange).toEqual('14.02.2020');
    });
  });

  describe('#dateMin before #dateMax', () => {
    let dateRange: string;

    beforeEach(() => {
      dateRange = pipe.transform({
        dateMin: '2020-02-14',
        dateMax: '2020-02-15',
      });
    });

    it('#dateRange should have been transformed correctly', () => {
      expect(dateRange).toEqual('14.02.2020 bis 15.02.2020');
    });
  });
});
