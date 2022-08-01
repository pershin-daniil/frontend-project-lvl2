/* eslint-disable no-use-before-define */
import _ from 'lodash';
import { DIFF_TYPE } from '../constants.js';

const indent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth + 2);
const wrap = (output, depth) => `{\n${output.join('\n')}\n${indent(depth).substring(2)}}`;

function stringify(value, depth) {
  if (!_.isObject(value)) {
    return String(value);
  }
  const toString = ([key, val]) => getStylish(key, val, ' ', depth);
  const output = Object.entries(value).map(toString);
  return wrap(output, depth);
}
const getStylish = (key, value, token, depth) => `${indent(depth)}${token} ${key}: ${stringify(value, depth + 1)}`;

const format = (nodes, depth) => {
  const toStylish = ({
    key, type, value, subValue, children,
  }) => {
    const nestedValue = (children.length) ? format(children, depth + 1) : value;
    switch (type) {
      case DIFF_TYPE.ADDED:
        return getStylish(key, subValue, '+', depth);
      case DIFF_TYPE.DELETED:
        return getStylish(key, value, '-', depth);
      case DIFF_TYPE.UPDATED:
        return [
          getStylish(key, value, '-', depth),
          getStylish(key, subValue, '+', depth),
        ].join('\n');
      case DIFF_TYPE.NESTED:
      case DIFF_TYPE.NO_DIFF:
        return getStylish(key, nestedValue, ' ', depth);
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  };
  const output = nodes.map(toStylish);
  return wrap(output, depth);
};
export default (innerTree = []) => (innerTree.length ? format(innerTree, 0) : '');
