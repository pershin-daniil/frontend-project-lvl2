import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff';
import { readFile } from '../src/utils';
import { availableFormats } from '../src/formaters/index.js';
import { FILE_TYPE } from '../src/constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getAbsolutPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('test with different files', () => {
  test
    .each(availableFormats
      .flatMap((formater) => [[formater, FILE_TYPE.JSON], [formater, FILE_TYPE.YAML]]))('Format: %s Files: .%s', (formatName, extension) => {
      const filePath1 = getAbsolutPath(`file1.${extension}`);
      const filePath2 = getAbsolutPath(`file2.${extension}`);
      const actual = gendiff(filePath1, filePath2, formatName);
      const expected = readFile(getAbsolutPath(formatName));
      expect(actual).toEqual(expected);
    });
});
