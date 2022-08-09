import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import { readFile } from '../src/utils.js';
import { availableFormats } from '../src/formaters/index.js';
import { FILE_TYPE } from '../src/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getAbsolutePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('test with different files - default case', () => {
  test
    .each(Object.values(FILE_TYPE))('Files %s', (extension) => {
      const filePath1 = getAbsolutePath(`file1.${extension}`);
      const filePath2 = getAbsolutePath(`file2.${extension}`);
      const actual = gendiff(filePath1, filePath2);
      const expected = readFile(getAbsolutePath('stylish'));
      expect(actual).toEqual(expected);
    });
});

describe('test with different files and formaters', () => {
  test
    .each(availableFormats
      .flatMap((formater) => [[formater, FILE_TYPE.JSON], [formater, FILE_TYPE.YAML], [formater, FILE_TYPE.YML]]))('Format: %s Files: .%s', (formatName, extension) => {
      const filePath1 = getAbsolutePath(`file1.${extension}`);
      const filePath2 = getAbsolutePath(`file2.${extension}`);
      const actual = gendiff(filePath1, filePath2, formatName);
      const expected = readFile(getAbsolutePath(formatName));
      expect(actual).toEqual(expected);
    });
});
test('when file does not exist', () => {
  const filepath1 = getAbsolutePath('file1.json');
  expect(() => gendiff(filepath1, 'wrong-file')).toThrow(/ENOENT/);
});

test('when output format is wrong', () => {
  const filepath1 = getAbsolutePath('file1.json');
  expect(() => gendiff(filepath1, filepath1, 'wrongFormat')).toThrow(/format is not available/);
});

test('when file type is wrong', () => {
  const filepath1 = getAbsolutePath('file1.yml');
  const filepath2 = getAbsolutePath('file.ini');
  expect(() => gendiff(filepath1, filepath2)).toThrow(/File type/);
});
