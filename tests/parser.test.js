import { Parser } from '../src/parser';

describe('parseHeadings', () => {
  test('Bad Data', () => {
    const dataObj = {};
    const result = Parser.parseHeadings(dataObj);
    expect(result.length).toBe(0);
  });

  test('Explicit headings', () => {
    const dataObj = {
      headings: ['First Name', 'Last Name', 'Instrument'],
      data: [
        ['Miles', 'Davis', 'Trumpet'],
        ['John', 'Coltrane', 'Saxophone'],
        ['Ornette', 'Coleman', 'Saxophone']
      ]
    }
    const result = Parser.parseHeadings(dataObj);
    const expectedResult = ['Row', 'First Name', 'Last Name', 'Instrument'];
    expect(result.length).toBe(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
  });

  test('Does not add "Row" if its passed in', () => {
    const dataObj = {
      headings: ['Row', 'First Name', 'Last Name', 'Instrument'],
      data: [
        ['Miles', 'Davis', 'Trumpet'],
        ['John', 'Coltrane', 'Saxophone'],
        ['Ornette', 'Coleman', 'Saxophone']
      ]
    }
    const result = Parser.parseHeadings(dataObj);
    const expectedResult = ['Row', 'First Name', 'Last Name', 'Instrument'];
    expect(result.length).toBe(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
  });

  test('Non-explicit headings from object', () => {
    const dataObj = {
      data: {
        firstName: ['Miles', 'John', 'Ornette'],
        lastName: ['Davis', 'Coltrane', 'Coleman'],
        instrument: ['Trumpet', 'Saxophone', 'Saxophone']
      }
    }
    const result = Parser.parseHeadings(dataObj);
    const expectedResult = ['Row', 'First Name', 'Last Name', 'Instrument'];
    expect(expectedResult.length).toBe(result.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
  });

  test('Non-explicit headings from array of objects', () => {
    const dataObj = {
      data: [
        {
          firstName: 'Miles',
          lastName: 'Davis',
          instrument: 'Trumpet'
        },
        {
          firstName: 'John',
          lastName: 'Coltrane',
        },
        {
          firstName: 'Ornette',
          lastName: 'Coleman',
          instrument: 'Saxophone',
          album: 'The Shape of Jazz to Come'
        }
      ]
    }
    const result = Parser.parseHeadings(dataObj);
    const expectedResult = ['Row', 'First Name', 'Last Name', 'Instrument', 'Album'];
    expect(result.length).toBe(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
  });
});
