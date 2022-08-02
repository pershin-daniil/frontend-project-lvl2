import yaml from 'js-yaml';
import {
  getExtName, readFile, getUniqueKeys, isObjects, isEqual,
} from './utils.js';
import format from './formaters/index.js';
import { FILE_TYPE, DIFF_TYPE } from './constants.js';

const parsers = {
  [FILE_TYPE.JSON]: JSON.parse,
  [FILE_TYPE.YAML]: yaml.load,
  [FILE_TYPE.YML]: yaml.load,
};

const parse = (content, typeName) => parsers[typeName](content);
const isNotEqual = (value1, value2) => !isEqual(value1, value2);

const getDiffType = (value1, value2) => {
  switch (true) {
    case value1 === undefined:
      return DIFF_TYPE.ADDED;
    case value2 === undefined:
      return DIFF_TYPE.DELETED;
    case isObjects([value1, value2]):
      return DIFF_TYPE.NESTED;
    case isNotEqual(value1, value2):
      return DIFF_TYPE.UPDATED;
    case value1 === value2:
      return DIFF_TYPE.NO_DIFF;
    default:
      throw new Error(`Unexpected case when trying to compare ${value1} and ${value2}`);
  }
};

export default (filepath1, filepath2, formatName) => {
  const data1 = parse(readFile(filepath1), getExtName(filepath1));
  const data2 = parse(readFile(filepath2), getExtName(filepath2));

  const buildTree = (value1, value2) => {
    if (!isObjects([value1, value2])) return ([]);

    const toTreeNode = (key) => {
      const value = value1[key];
      const subValue = value2[key];
      return {
        key,
        value,
        subValue,
        type: getDiffType(value, subValue),
        children: buildTree(value, subValue),
      };
    };
    const sortedKeys = getUniqueKeys([value1, value2]);
    return sortedKeys.map(toTreeNode);
  };
  const innerTree = buildTree(data1, data2);
  return format(innerTree, formatName);
};
