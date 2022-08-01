import yaml from 'js-yaml';
import _ from 'lodash';
import { getExtName, readFile } from './utils.js'
import { format, getValue } from './formater.js';
import { FILE_TYPE } from './constants.js';

const getKeys = (file) => Object.keys(file);

const parsers = {
  [FILE_TYPE.JSON]: JSON.parse,
  [FILE_TYPE.YAML]: yaml.load,
  [FILE_TYPE.YML]: yaml.load,
};

const parse = (content, typeName) => parsers[typeName](content);


export const gendiff = (filepath1, filepath2) => {

  const data1 = parse(readFile(filepath1), getExtName(filepath1));
  const data2 = parse(readFile(filepath2), getExtName(filepath2));

  const keys1 = getKeys(data1);
  const keys2 = getKeys(data2);

  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  let result = {};

  result = sortedKeys.map((key) => {
    const value1 = getValue(data1, key);
    const value2 = getValue(data2, key);

    if (_.has(data1, key) && _.has(data2, key)) {
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
    if (!_.has(data2, key)) {
      return {
        name: key,
        value: value1,
        type: 'deleted',
      };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return {
        name: key,
        value: value2,
        type: 'added',
      };
    }
    return result;
  });

  return format(result);
};
