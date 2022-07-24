import { gendiff, readFile } from '../src/gendiff';

const getRelativePath = (filename) => `__fixtures__/${filename}`;

describe('test with different files', () => {
  const jsonFile1 = getRelativePath('file1.json');
  const jsonFile2 = getRelativePath('file2.json');

  const actual = {
    json: (formatName) => gendiff(jsonFile1, jsonFile2)
  };

  test.each(['json'])('in %s format', (formatName) => {
    const expected = readFile(getRelativePath(formatName));
    expect(actual.json(formatName)).toBe(expected);
  });
});
