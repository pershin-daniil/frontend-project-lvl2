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

const format = (innerTree, formatName = FORMAT_NAME.STYLISH) => {
  const formater = formaters[formatName];
  if (!formater) {
    throw new Error(`The ${formatName} format is not available`);
  }
  const render = formaters[formatName];
  return render(innerTree);
};

export default format;
