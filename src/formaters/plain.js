import _ from 'lodash';
import { DIFF_TYPE } from '../constants.js';

const stringify = (value) => {
  if (value === null) return null;
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const format = (innerTree, ancestors = []) => {
  const toString = {
    [DIFF_TYPE.ADDED]: ({ value }, path) => `Property '${path.join('.')}' was added with value: ${stringify(value)}`,
    [DIFF_TYPE.DELETED]: (node, path) => `Property '${path.join('.')}' was removed`,
    [DIFF_TYPE.UPDATED]: ({ value1, value2 }, path) => `Property '${path.join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`,
    [DIFF_TYPE.NESTED]: ({ children }, path) => format(children, path),
    [DIFF_TYPE.NO_DIFF]: () => null,
  };
  const result = innerTree.map((node) => {
    const { key, type } = node;
    const newPath = [...ancestors, key];
    return toString[type](node, newPath);
  });

  return _.compact(_.flatten(result)).join('\n');
};

export default format;
