import _ from 'lodash';
import { DIFF_TYPE } from '../constants.js';

const indent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth + 2);
const wrap = (output, depth) => `{\n${output.join('\n')}\n${indent(depth).substring(2)}}`;

function stringify(value, depth) {
  if (!_.isObject(value)) {
    return String(value);
  }
  const toString = ([key, val]) => `${indent(depth)}  ${key}: ${stringify(val, depth + 1)}`;
  const output = Object.entries(value).map(toString);
  return wrap(output, depth);
}
const getStylish = (key, value, token, depth) => `${indent(depth)}${token} ${key}: ${stringify(value, depth + 1)}`;

const format = (nodes, depth) => {
  const toStylish = (node) => {
    switch (node.type) {
      case DIFF_TYPE.ADDED:
        return getStylish(node.key, node.value, '+', depth);
      case DIFF_TYPE.DELETED:
        return getStylish(node.key, node.value, '-', depth);
      case DIFF_TYPE.UPDATED:
        return [
          getStylish(node.key, node.value1, '-', depth),
          getStylish(node.key, node.value2, '+', depth),
        ].join('\n');
      case DIFF_TYPE.NESTED:
        return getStylish(node.key, format(node.children, depth + 1), ' ', depth);
      case DIFF_TYPE.NO_DIFF:
        return getStylish(node.key, node.value, ' ', depth);
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  };
  const output = nodes.map(toStylish);
  return wrap(output, depth);
};
export default (innerTree) => format(innerTree, 0);
