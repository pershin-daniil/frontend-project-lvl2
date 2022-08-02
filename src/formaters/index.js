import { strict as assert } from 'assert';
import { FORMAT_NAME } from '../constants.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formaters = {
  [FORMAT_NAME.STYLISH]: stylish,
  [FORMAT_NAME.PLAIN]: plain,
  [FORMAT_NAME.JSON]: json,
};

export const availableFormats = Object.keys(formaters);
const errorMessage = (formatName) => `The ${formatName} format is not available`;

export default (innerTree, formatName = FORMAT_NAME.STYLISH) => {
  assert(availableFormats.includes(formatName), errorMessage);
  const format = formaters[formatName];
  return format(innerTree);
};
