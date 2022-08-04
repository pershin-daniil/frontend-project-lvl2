import _ from 'lodash';
import { DIFF_TYPE } from './constants.js';

const buildTree = (data1, data2) => {
  const toTreeNode = (key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    switch (true) {
      case (!_.has(data1, key) && _.has(data2, key)):
        return { key, value: value2, type: DIFF_TYPE.ADDED };
      case (_.has(data1, key) && !_.has(data2, key)):
        return { key, value: value1, type: DIFF_TYPE.DELETED };
      case _.isPlainObject(value1) && _.isPlainObject(value2):
        return { key, type: DIFF_TYPE.NESTED, children: buildTree(value1, value2) };
      case !_.isEqual(value1, value2):
        return {
          key, value1, value2, type: DIFF_TYPE.UPDATED,
        };
      default:
        return { key, value: value1, type: DIFF_TYPE.NO_DIFF };
    }
  };
  const unionKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(unionKeys);
  return sortedKeys.map(toTreeNode);
};
export default buildTree;
