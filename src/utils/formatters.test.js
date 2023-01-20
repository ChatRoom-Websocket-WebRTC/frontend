import {
  convertNumberToPersian,
  convertNumberToEnglish,
  isPersianNumber,
  formatPrice,
  formatDate,
  convertJalaliDateToGeorgian,
  getPersianDateWithSlash,
} from './formatters';

// convertNumberToPersian

describe('convert input number or numbers in a string to Persian numbers', () => {
  it('should return empty string when input is empty', () => {
    expect(convertNumberToPersian('')).toBe('');
  });
  it('should return the original string when there is no number in it', () => {
    expect(convertNumberToPersian('string without number')).toBe('string without number');
  });
  it('should convert numbers to Persian when string is just numbers', () => {
    expect(convertNumberToPersian('0123456789')).toBe('۰۱۲۳۴۵۶۷۸۹');
  });
  it('should convert numbers to Persian when input is combination of numbers and characters', () => {
    expect(convertNumberToPersian('Tehran-021')).toBe('Tehran-۰۲۱');
  });
  it('should convert numbers to Persian correctly if type of input is number', () => {
    expect(convertNumberToPersian(9876543210)).toBe('۹۸۷۶۵۴۳۲۱۰');
  });
  it('should not crash when input is undefined', () => {
    expect(convertNumberToPersian(undefined)).toBe('undefined');
  });
  it('should not crash when input is null', () => {
    expect(convertNumberToPersian(null)).toBe('null');
  });
  it('should convert numbers to Persian correctly if input contains symbols', () => {
    expect(convertNumberToPersian('~!@#$%^&*()_+{}[]')).toBe('~!@#$%^&*()_+{}[]');
  });
});

// convertNumberToEnglish

describe('convert input number or numbers in a string to English numbers', () => {
  it('should return empty string when input is empty', () => {
    expect(convertNumberToEnglish('')).toBe('');
  });
  it('should return the original string when there is no number in it', () => {
    expect(convertNumberToEnglish('string without number')).toBe('string without number');
  });
  it('should convert numbers to English when string is just numbers', () => {
    expect(convertNumberToEnglish('۰۱۲۳۴۵۶۷۸۹')).toBe('0123456789');
  });
  it('should convert numbers to English when input is combination of numbers and characters', () => {
    expect(convertNumberToEnglish('Tehran-۰۲۱')).toBe('Tehran-021');
  });
  it('should not crash when input is undefined', () => {
    expect(convertNumberToEnglish(undefined)).toBe('undefined');
  });
  it('should not crash when input is null', () => {
    expect(convertNumberToEnglish(null)).toBe('null');
  });
  it('should convert numbers to English correctly if input contains symbols', () => {
    expect(convertNumberToEnglish('~!@#$%^&*()_+{}۱۲۳[]')).toBe('~!@#$%^&*()_+{}123[]');
  });
});

// isPersianNumber

describe('Check if the input number is a Persian number or not', () => {
  it('should return false when input is empty', () => {
    expect(isPersianNumber('')).toBe(false);
  });
  it('should return false when there is no number in it', () => {
    expect(isPersianNumber('string without number')).toBe(false);
  });
  it('should return true when string is just made of Persian numbers', () => {
    expect(isPersianNumber('۰۱۲۳۴۵۶۷۸۹')).toBe(true);
  });
  it('should return false when input is English numbers', () => {
    expect(isPersianNumber(9876543210)).toBe(false);
  });
  it('should return true when string is just Persian numbers', () => {
    expect(isPersianNumber('۰۱۲۳۴۵۶۷۸۹')).toBe(true);
  });
  it('should return false when input is combination of English numbers and characters', () => {
    expect(isPersianNumber('Tehran-021')).toBe(false);
  });
  it('should return false when input is combination of Persian numbers and characters', () => {
    expect(isPersianNumber('Tehran-۰۲۱')).toBe(false);
  });
  it('should not crash when input is undefined and return false', () => {
    expect(isPersianNumber(undefined)).toBe(false);
  });
  it('should not crash when input is null and return false', () => {
    expect(isPersianNumber(null)).toBe(false);
  });
  it('should return false if input contains symbols', () => {
    expect(isPersianNumber('~!@#$%^&*()_+{}[]')).toBe(false);
  });
});

// formatPrice

describe('format the number with comma (,) as a separator between every three numbers', () => {
  it('should return empty string when input is empty', () => {
    expect(formatPrice('')).toBe('');
  });
  it('should format correctly when string is just English numbers', () => {
    expect(formatPrice('9123456780')).toBe('9,123,456,780');
  });
  it('should format correctly when input string is just Persian numbers', () => {
    expect(formatPrice('۱۲۳۴۵۶۷۸۹۰۰')).toBe('۱۲,۳۴۵,۶۷۸,۹۰۰');
  });
  it('should return false when input is combination of numbers and other characters', () => {
    expect(isPersianNumber('Tehran-65234')).toBe(false);
  });
  it('should format correctly if the type of input is number', () => {
    expect(formatPrice(9876543210)).toBe('9,876,543,210');
  });
  it('should not crash when input is undefined', () => {
    expect(formatPrice(undefined)).toBe(undefined);
  });
  it('should not crash when input is null', () => {
    expect(formatPrice(null)).toBe(null);
  });
});

//format date
describe('format the date to jalali calendar', () => {
  it('should return Invalid Date when input is empty', () => {
    expect(formatDate('')).toBe('Invalid Date');
  });
  it('should return Invalid Date when input is undefined', () => {
    expect(formatDate(undefined)).toBe('Invalid Date');
  });
  it('should return Invalid Date when input is object', () => {
    expect(formatDate({})).toBe('Invalid Date');
  });
  it('should return Invalid Date when input is array', () => {
    expect(formatDate([])).toBe('Invalid Date');
  });
  it('should return Invalid Date when input is symbol', () => {
    expect(formatDate(Symbol)).toBe('Invalid Date');
  });
  it('should return Invalid Date when input is not a valid string', () => {
    expect(formatDate('a')).toBe('Invalid Date');
  });
  it('should return Invalid Date when input is not a valid string', () => {
    expect(formatDate('_')).toBe('Invalid Date');
  });
  it('should return Invalid Date when input is not a valid input', () => {
    expect(formatDate('+-+')).toBe('Invalid Date');
  });
  it('should return epock Date when input is null', () => {
    expect(formatDate(null)).toBe(
      new Date(0).toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })
    );
  });
  it('should return correct Date when input is a date', () => {
    const date = new Date();
    const expected = date.toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    expect(formatDate(date)).toBe(expected);
  });
  it('should return correct Date when input is a date', () => {
    const date = new Date(0);
    const expected = date.toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    expect(formatDate(date)).toBe(expected);
  });
  it('should return correct Date when input is a date', () => {
    const date = new Date(-100);
    const expected = date.toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    expect(formatDate(date)).toBe(expected);
  });
  it('should return correct Date when input is a date', () => {
    const date = new Date(100000);
    const expected = date.toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    expect(formatDate(date)).toBe(expected);
  });
  it('should return correct Date when input is a date', () => {
    const date = new Date('08-02-2022');
    const expected = date.toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    expect(formatDate(date)).toBe(expected);
  });
  it('should return correct Date when input is a date', () => {
    const date = new Date('10-31-1990');
    const expected = date.toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    expect(formatDate(date)).toBe(expected);
  });
  it('should return correct Date when input is a date', () => {
    const date = new Date('01-01-1800');
    const expected = date.toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    expect(formatDate(date)).toBe(expected);
  });
});

//get persian date with slash 1400/12/15
describe('get persian date of georgian date with slash format', () => {
  it('should return correct persian date', () => {
    const date = new Date();
    const persianDate = getPersianDateWithSlash(date);
    const expectedDate = date
      .toLocaleString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .split(' ')
      .join('/');
    expect(persianDate).toBe(expectedDate);
  });
  it('should return correct persian date', () => {
    const date = new Date('08-03-2021');
    const persianDate = getPersianDateWithSlash(date);
    const expectedDate = date
      .toLocaleString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .split(' ')
      .join('/');
    expect(persianDate).toBe(expectedDate);
  });
  it('should return correct persian date', () => {
    const date = new Date(1000);
    const persianDate = getPersianDateWithSlash(date);
    const expectedDate = date
      .toLocaleString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .split(' ')
      .join('/');
    expect(persianDate).toBe(expectedDate);
  });
  it('should return correct persian date', () => {
    const date = new Date(0);
    const persianDate = getPersianDateWithSlash(date);
    const expectedDate = date
      .toLocaleString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .split(' ')
      .join('/');
    expect(persianDate).toBe(expectedDate);
  });
  it('should throw error when input is empty', () => {
    expect(() => getPersianDateWithSlash('')).toThrow();
  });
  it('should throw error when input is invalid string', () => {
    expect(() => getPersianDateWithSlash('(())')).toThrow();
  });
  it('should throw error when input is invalid string', () => {
    expect(() => getPersianDateWithSlash('06-12-33')).toThrow();
  });
  it('should throw error when input is invalid string', () => {
    expect(() => getPersianDateWithSlash('1000')).toThrow();
  });
  it('should throw error when input is number', () => {
    expect(() => getPersianDateWithSlash(1200)).toThrow();
  });
  it('should throw error when input is negative number', () => {
    expect(() => getPersianDateWithSlash(-400)).toThrow();
  });
  it('should throw error when input is big integer', () => {
    expect(() => getPersianDateWithSlash(BigInt(230230230))).toThrow();
  });
  it('should throw error when input is object', () => {
    expect(() => getPersianDateWithSlash({})).toThrow();
  });
  it('should throw error when input is array', () => {
    expect(() => getPersianDateWithSlash([])).toThrow();
  });
  it('should throw error when input is symbol', () => {
    expect(() => getPersianDateWithSlash(Symbol)).toThrow();
  });
  it('should throw error when input is function', () => {
    expect(() => getPersianDateWithSlash(() => {})).toThrow();
  });
});

//convert jalali date to georgian
describe('convert date from jalali to georgian', () => {
  it('should return correct georgian date', () => {
    const date = new Date();
    const persianDate = getPersianDateWithSlash(date);
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
    const expectedDate = [date.getFullYear(), '-', (mm > 9 ? '' : '0') + mm, '-', (dd > 9 ? '' : '0') + dd].join('');
    expect(convertJalaliDateToGeorgian(persianDate)).toBe(expectedDate);
  });
});
