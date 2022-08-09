import _ from 'lodash';
import { DIFF_TYPE } from './constants.js';

const buildTree = (data1, data2) => {
  const toTreeNode = (key) => {
    switch (true) {
      case (!_.has(data1, key) && _.has(data2, key)):
        return { key, value: data2[key], type: DIFF_TYPE.ADDED };
      case (_.has(data1, key) && !_.has(data2, key)):
        return { key, value: data1[key], type: DIFF_TYPE.DELETED };
      case _.isPlainObject(data1[key]) && _.isPlainObject(data2[key]):
        return { key, type: DIFF_TYPE.NESTED, children: buildTree(data1[key], data2[key]) };
      case !_.isEqual(data1[key], data2[key]):
        return {
          key, value1: data1[key], value2: data2[key], type: DIFF_TYPE.UPDATED,
        };
      case _.isEqual(data1[key], data2[key]):
        return { key, value: data1[key], type: DIFF_TYPE.NO_DIFF };
      default:
        throw new Error(`Unknown state case ${key} in buildTree`);
    }
  };
  const unionKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(unionKeys);
  return sortedKeys.map(toTreeNode);
};
export default buildTree;
