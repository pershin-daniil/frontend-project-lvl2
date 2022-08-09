import { FORMAT_NAME } from '../constants.js';
import stylish from './stylish.js';
import plain from './plain.js';

const formaters = {
  [FORMAT_NAME.STYLISH]: stylish,
  [FORMAT_NAME.PLAIN]: plain,
  [FORMAT_NAME.JSON]: JSON.stringify,
};

export const availableFormats = Object.keys(formaters);

const format = (formatName) => {
  const formater = formaters[formatName];
  if (!formater) {
    throw new Error(`The ${formatName} format is not available`);
  }
  return formater;
};

export default (innerTree, formatName = FORMAT_NAME.STYLISH) => format(formatName)(innerTree);
