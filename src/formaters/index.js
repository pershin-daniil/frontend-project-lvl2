import { FORMAT_NAME } from '../constants.js';
import stylish from './stylish.js';
import plain from './plain.js';

export const formatters = {
  [FORMAT_NAME.STYLISH]: stylish,
  [FORMAT_NAME.PLAIN]: plain,
  [FORMAT_NAME.JSON]: JSON.stringify,
};

const form = (formatName) => {
  const format = formatters[formatName];
  if (!format) {
    throw new Error(`The ${formatName} format is not available`);
  }
  return format;
};

export default (innerTree, formatName = FORMAT_NAME.STYLISH) => form(formatName)(innerTree);
