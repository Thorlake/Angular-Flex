import { DateTimeFormatPipe } from './date-time-format.pipe';

describe('DateTimeFormatPipe', () => {
  let pipe: DateTimeFormatPipe;
  let monthNames: string[];
  beforeEach(() => {
    pipe = new DateTimeFormatPipe('en');
    monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ];
  });

  describe('#transform', () => {
    it('same date should display only hours and minutes', () => {
      const value = new Date();
      value.setHours(15);
      value.setMinutes(7);
      value.setSeconds(10);
      expect(pipe.transform(value)).toBe('15:07');
    });

    it('same month should display only month and day', () => {
      const value = new Date();
      value.setDate(value.getDate() + 1);
      const expectedDateString = `${monthNames[value.getMonth()]} ${addLeadingZeroes(value.getDate())}`;
      expect(pipe.transform(value)).toBe(expectedDateString);
    });

    it('same year should display only month and day', () => {
      const value = new Date();
      value.setMonth(value.getMonth() + 1);
      const expectedDateString = `${monthNames[value.getMonth()]} ${addLeadingZeroes(value.getDate())}`;
      expect(pipe.transform(value)).toBe(expectedDateString);
    });

    it('different year should display full format', () => {
      const value = new Date();
      value.setFullYear(value.getFullYear() + 1);
      const expectedDateString = `${value.getFullYear()}/${(addLeadingZeroes(value.getMonth() + 1))}/${addLeadingZeroes(value.getDate())}`;
      expect(pipe.transform(value)).toBe(expectedDateString);
    });

    function addLeadingZeroes(value: any) {
      return value.toString().padStart(2, '0');
    }

  });
});
