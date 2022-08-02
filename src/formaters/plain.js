import _ from 'lodash';
import { DIFF_TYPE } from '../constants.js';

const stringify = (value) => {
  if (value === null) return null;
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const format = (innerTree, path) => {
  const toString = ({
    key, type, value, subValue, children,
  }) => {
    const property = path ? `${path}.${key}` : key;
    switch (type) {
      case DIFF_TYPE.ADDED:
        return `Property '${property}' was added with value: ${stringify(subValue)}`;
      case DIFF_TYPE.DELETED:
        return `Property '${property}' was removed`;
      case DIFF_TYPE.UPDATED:
        return `Property '${property}' was updated. From ${stringify(value)} to ${stringify(subValue)}`;
      case DIFF_TYPE.NESTED:
        return format(children, property);
      case DIFF_TYPE.NO_DIFF:
        return format(children, property);
      default:
        throw new Error(`Unknown inner tree node type ${type}`);
    }
  };
  return innerTree.flatMap(toString);
};

export default (innerTree = []) => format(innerTree, '').join('\n');
