import { FORMAT_NAME } from '../constants.js';
import stylish from './stylish.js';

const formaters = {
  [FORMAT_NAME.STYLISH]: stylish,
};

export default (innerTree, formarName = FORMAT_NAME.STYLISH) => {
  const format = formaters[formarName];
  return format(innerTree);
};
