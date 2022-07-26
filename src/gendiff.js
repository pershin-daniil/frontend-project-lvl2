import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import _ from 'lodash';
import { parser, getValue } from './parser.js';

const getKeys = (file) => Object.keys(file);
const getExtName = (filename) => path.extname(filename);

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
export const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8').trim();

const FILE_TYPES_PARSER = {
  json: (filepath) => JSON.parse(readFile(filepath)),
  yaml: (filepath) => yaml.load(readFile(filepath)),
};

const FILE_TYPE = {
  JSON: '.json',
  YAML: ['.yml', '.yaml'],
};

export const gendiff = (filepath1, filepath2) => {
  let file1;
  let file2;
  const ext2 = getExtName(filepath2);
  const ext1 = getExtName(filepath1);

  if (ext1 === FILE_TYPE.JSON && ext2 === FILE_TYPE.JSON) {
    file1 = FILE_TYPES_PARSER.json(filepath1);
    file2 = FILE_TYPES_PARSER.json(filepath2);
  }
  if (FILE_TYPE.YAML.includes(ext1) && FILE_TYPE.YAML.includes(ext2)) {
    file1 = FILE_TYPES_PARSER.yaml(filepath1);
    file2 = FILE_TYPES_PARSER.yaml(filepath2);
  }

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

  return parser(result);
};
