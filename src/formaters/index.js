import { strict as assert } from 'node:assert';
import { FORMAT_NAME } from '../constants.js';
import stylish from './stylish.js';
import plain from './plain.js';

const formaters = {
  [FORMAT_NAME.STYLISH]: stylish,
  [FORMAT_NAME.PLAIN]: plain,
};

export const availableFormats = Object.keys(formaters);
const errorMessage = (formatName) => `The ${formatName} format is not available`;

export default (innerTree, formatName = FORMAT_NAME.STYLISH) => {
  assert(availableFormats.includes(formatName), errorMessage);
  const format = formaters[formatName];
  return format(innerTree);
};
