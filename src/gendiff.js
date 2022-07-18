import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const spaces = {
  plus: '  + ',
  minus: '  - ',
  empty: '    ',
};

const getKeys = (file) => Object.keys(file);
const getValue = (obj, key) => obj[key];
const getType = (obj) => obj.type;
const getName = (obj) => obj.name;

const getPathFile = (filepath) => path.resolve(process.cwd(), filepath).trim();
const readFile = (filepath) => fs.readFileSync(getPathFile(filepath), 'utf-8');
export const getFile = (filepath) => JSON.parse(readFile(filepath));

const gendiff = (filepath1, filepath2) => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);

  const keys1 = getKeys(file1);
  const keys2 = getKeys(file2);

  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  let result = {};

  result = sortedKeys.map((key) => {
    const value1 = getValue(file1, key);
    const value2 = getValue(file2, key);

    if (_.has(file1, key) && _.has(file2, key)) {
      if (value1 === value2) {
        return {
          name: key,
          value: value1,
          type: 'unchanged',
        };
      }
      return {
        name: key,
        value1,
        value2,
        type: 'changed',
      };
    }
    if (!_.has(file2, key)) {
      return {
        name: key,
        value: value1,
        type: 'deleted',
      };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return {
        name: key,
        value: value2,
        type: 'added',
      };
    }
    return result;
  });
  const resultLines = [];
  result.forEach((line) => {
    const type = getType(line);
    const name = getName(line);
    switch (type) {
      case 'deleted':
        resultLines.push(`${spaces.minus}${name}: ${getValue(line, 'value')}`);
        break;
      case 'unchanged':
        resultLines.push(`${spaces.empty}${name}: ${getValue(line, 'value')}`);
        break;
      case 'added':
        resultLines.push(`${spaces.plus}${name}: ${getValue(line, 'value')}`);
        break;
      case 'changed':
        resultLines.push(`${spaces.minus}${name}: ${getValue(line, 'value1')}`);
        resultLines.push(`${spaces.plus}${name}: ${getValue(line, 'value2')}`);
        break;
      default:
        break;
    }
  });
  return `{\n${resultLines.join('\n')}\n}`;
};
export default gendiff;
