import gendiff from '../src/gendiff.js';

test('Compare file1 and file2', () => {
    const file1 = '__fixtures__/file1.json';
    const file2 = '__fixtures__/file2.json';
    const actualResult = gendiff(file1, file2)
    const mustBeResult = 
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
    expect(actualResult).toBe(mustBeResult);
});

test('Compare file2 and file1', () => {
  const file1 = '__fixtures__/file1.json';
  const file2 = '__fixtures__/file2.json';
  const actualResult = gendiff(file2, file1)
  const mustBeResult = 
`{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`;
  expect(actualResult).toBe(mustBeResult);
});