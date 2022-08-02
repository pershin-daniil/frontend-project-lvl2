import gendiff from '../src/gendiff';
import { readFile } from '../src/utils';
import { availableFormats } from '../src/formaters/index.js';

const getRelativePath = (filename) => `__fixtures__/${filename}`;

describe('test with different files', () => {
  const jsonFile1 = getRelativePath('file1.json');
  const jsonFile2 = getRelativePath('file2.json');

  const yamlFile1 = getRelativePath('file1.yml');
  const yamlFile2 = getRelativePath('file2.yaml');

  const actual = {
    json: (formatName) => gendiff(jsonFile1, jsonFile2, formatName),
    yaml: (formatName) => gendiff(yamlFile1, yamlFile2, formatName),
  };
  test.each(availableFormats)('in %s format', (formatName) => {
    const expected = readFile(getRelativePath(formatName));
    expect(actual.json(formatName)).toBe(expected);
    expect(actual.yaml(formatName)).toBe(expected);
  });
});
