import { Parser } from '../src/parser';

const getOrder = (data) => {
  return data.map((d) => {
    return d[0];
  })
}

describe('parseData Array', () => {
  test('simple', () => {
    const data = [
      ['Miles', 'Davis', 'Trumpet'],
      ['John', 'Coltrane', 'Saxophone'],
      ['Ornette', 'Coleman', 'Saxophone']
    ];

    const result = Parser.parseData(data);
    const expectedResult = [
      [1, 'Miles', 'Davis', 'Trumpet'],
      [2, 'John', 'Coltrane', 'Saxophone'],
      [3, 'Ornette', 'Coleman', 'Saxophone']
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([1, 2, 3]);
  });

  test('sortIndex', () => {
    const data = [
      ['Miles', 'Davis', 'Trumpet'],
      ['John', 'Coltrane', 'Saxophone'],
      ['Ornette', 'Coleman', 'Saxophone']
    ];

    const result = Parser.parseData(data, 1);
    const expectedResult = [
      [2, 'John', 'Coltrane', 'Saxophone'],
      [1, 'Miles', 'Davis', 'Trumpet'],
      [3, 'Ornette', 'Coleman', 'Saxophone']
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([2, 1, 3]);
  });

  test('sorting direction', () => {
    const data = [
      ['Miles', 'Davis', 'Trumpet'],
      ['John', 'Coltrane', 'Saxophone'],
      ['Ornette', 'Coleman', 'Saxophone']
    ];

    // asc (default)
    let result = Parser.parseData(data, 0, 'asc');
    let expectedResult = [
      [1, 'Miles', 'Davis', 'Trumpet'],
      [2, 'John', 'Coltrane', 'Saxophone'],
      [3, 'Ornette', 'Coleman', 'Saxophone'],
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([1, 2, 3]);

    // desc
    result = Parser.parseData(data, 0, 'desc');
    expectedResult = [
      [3, 'Ornette', 'Coleman', 'Saxophone'],
      [2, 'John', 'Coltrane', 'Saxophone'],
      [1, 'Miles', 'Davis', 'Trumpet']
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([3, 2, 1]);

    // desc on another column
    result = Parser.parseData(data, 1, 'desc');
    expectedResult = [
      [3, 'Ornette', 'Coleman', 'Saxophone'],
      [1, 'Miles', 'Davis', 'Trumpet'],
      [2, 'John', 'Coltrane', 'Saxophone']
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([3, 1, 2]);

    // if this is passed something besides asc/desc, then default to asc
    result = Parser.parseData(data, 1, 'bad value');
    expectedResult = [
      [2, 'John', 'Coltrane', 'Saxophone'],
      [1, 'Miles', 'Davis', 'Trumpet'],
      [3, 'Ornette', 'Coleman', 'Saxophone']
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([2, 1, 3]);
  });
});

describe('parseData Object', () => {
  test('simple', () => {
    const data = [
      {firstName: 'Miles', lastName: 'Davis', instrument: 'Trumpet'},
      {firstName: 'John', lastName: 'Coltrane', instrument: 'Saxophone'},
      {firstName: 'Ornette', lastName: 'Coleman', instrument: 'Saxophone'},
    ];

    const result = Parser.parseData(data);
    const expectedResult = [
      [1, 'Miles', 'Davis', 'Trumpet'],
      [2, 'John', 'Coltrane', 'Saxophone'],
      [3, 'Ornette', 'Coleman', 'Saxophone']
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([1, 2, 3]);
  });

  test('sortIndex', () => {
    const data = [
        {firstName: 'Miles', lastName: 'Davis', instrument: 'Trumpet'},
        {firstName: 'John', lastName: 'Coltrane', instrument: 'Saxophone'},
        {firstName: 'Ornette', lastName: 'Coleman', instrument: 'Saxophone'},
    ];

    const result = Parser.parseData(data, 1);
    const expectedResult = [
      [2, 'John', 'Coltrane', 'Saxophone'],
      [1, 'Miles', 'Davis', 'Trumpet'],
      [3, 'Ornette', 'Coleman', 'Saxophone']
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([2, 1, 3]);
  });

  test('sorting direction', () => {
    const data = [
      {firstName: 'Miles', lastName: 'Davis', instrument: 'Trumpet'},
      {firstName: 'John', lastName: 'Coltrane', instrument: 'Saxophone'},
      {firstName: 'Ornette', lastName: 'Coleman', instrument: 'Saxophone'},
    ];

    // asc (default)
    let result = Parser.parseData(data, 0, 'asc');
    let expectedResult = [
      [1, 'Miles', 'Davis', 'Trumpet'],
      [2, 'John', 'Coltrane', 'Saxophone'],
      [3, 'Ornette', 'Coleman', 'Saxophone'],
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([1, 2, 3]);

    // desc
    result = Parser.parseData(data, 0, 'desc');
    expectedResult = [
      [3, 'Ornette', 'Coleman', 'Saxophone'],
      [2, 'John', 'Coltrane', 'Saxophone'],
      [1, 'Miles', 'Davis', 'Trumpet']
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([3, 2, 1]);

    // desc on another column
    result = Parser.parseData(data, 1, 'desc');
    expectedResult = [
      [3, 'Ornette', 'Coleman', 'Saxophone'],
      [1, 'Miles', 'Davis', 'Trumpet'],
      [2, 'John', 'Coltrane', 'Saxophone']
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([3, 1, 2]);

    // if this is passed something besides asc/desc, then default to asc
    result = Parser.parseData(data, 1, 'bad value');
    expectedResult = [
      [2, 'John', 'Coltrane', 'Saxophone'],
      [1, 'Miles', 'Davis', 'Trumpet'],
      [3, 'Ornette', 'Coleman', 'Saxophone']
    ];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
    expect(getOrder(result)).toEqual([2, 1, 3]);
  });
});

describe('parseHeadings', () => {
  test('Bad Data', () => {
    const dataObj = {};
    const result = Parser.parseHeadings(dataObj);
    expect(result.length).toEqual(0);
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
    expect(result.length).toEqual(expectedResult.length);
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
    expect(result.length).toEqual(expectedResult.length);
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
    expect(expectedResult.length).toEqual(result.length);
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
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
  });
});

describe('filter', () => {
  test('simple', () => {
    const data = [
      ['1', 'Miles', 'Davis'],
      ['2', 'John', 'Coltrane'],
      ['3', 'Ornette', 'Coleman']
    ];

    let result = Parser.filter(data, 'm', []);
    let expectedResult = [data[0], data[2]];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));

    // ignores case
    result = Parser.filter(data, 'M', []);
    expectedResult = [data[0], data[2]];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
  });

  test('no matches', () => {
    const data = [
      ['1', 'Miles', 'Davis'],
      ['2', 'John', 'Coltrane'],
      ['3', 'Ornette', 'Coleman']
    ];
    let result = Parser.filter(data, 'Kamasi Washington', []);
    expect(result.length).toEqual(0);
  });

  test('ignored columns', () => {
    const data = [
      ['1', 'Miles', 'Davis'],
      ['2', 'John', 'Coltrane'],
      ['3', 'Ornette', 'Coleman']
    ];

    // finds it fine without anything ignored
    let result = Parser.filter(data, 'Miles', []);
    let expectedResult = [data[0]];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));

    // does not find it if we are ignoring that column
    result = Parser.filter(data, 'Miles', [1]);
    expectedResult = [];
    expect(result.length).toEqual(0);
  });

  test('numerical filtering', () => {
    // test against numerical strings
    let data = [
      ['1', 'Miles', 'Davis'],
      ['2', 'John', 'Coltrane'],
      ['3', 'Ornette', 'Coleman']
    ];
    let result = Parser.filter(data, '1', []);
    let expectedResult = [data[0]];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));

    result = Parser.filter(data, 1, []);
    expectedResult = [data[0]];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));

    // test against ints
    data = [
      [1, 'Miles', 'Davis'],
      [2, 'John', 'Coltrane'],
      [3, 'Ornette', 'Coleman']
    ];
    result = Parser.filter(data, '1', []);
    expectedResult = [data[0]];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));

    result = Parser.filter(data, 1, []);
    expectedResult = [data[0]];
    expect(result.length).toEqual(expectedResult.length);
    expect(expectedResult).toEqual(expect.arrayContaining(result));
  });
});
