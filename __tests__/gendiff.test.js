import gendiff from '../src/gendiff';
import { readFile } from '../src/utils';

const getRelativePath = (filename) => `__fixtures__/${filename}`;

describe('test with different files', () => {
  const jsonFile1 = getRelativePath('file1.json');
  const jsonFile2 = getRelativePath('file2.json');

  const yamlFile1 = getRelativePath('file1.yml');
  const yamlFile2 = getRelativePath('file2.yaml');

  const actual = {
    json: () => gendiff(jsonFile1, jsonFile2),
    yaml: () => gendiff(yamlFile1, yamlFile2),
  };

  test('simple test for JSON', () => {
    const expectedJSON = readFile(getRelativePath('json'));
    expect(actual.json()).toBe(expectedJSON);
  });

  test('simple test for YAML', () => {
    const expectedYAML = readFile(getRelativePath('yaml'));
    expect(actual.yaml()).toBe(expectedYAML);
  });
});
