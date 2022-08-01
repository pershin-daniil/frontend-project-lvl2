import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export const isObjects = (args) => args.flat().every(_.isObject);
export const isEqual = (value1, value2) => {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return value1.length === value2.length && value1.every((item) => value2.includes(item));
  }
  return Object.is(value1, value2);
};
export const getUniqueKeys = (args) => {
  const result = _.sortBy(_.union(Object.keys(args[0]), Object.keys(args[1])));
  return result;
};

export const getExtName = (filename) => path.extname(filename).substring(1);

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
export const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8').trim();
