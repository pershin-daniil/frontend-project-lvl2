import yaml from 'js-yaml';
import { FILE_TYPE } from './constants.js';

const parsers = {
  [FILE_TYPE.JSON]: (content) => (content ? JSON.parse(content) : ''),
  [FILE_TYPE.YAML]: (content) => (content ? yaml.load(content) : ''),
};

export default (content, typeName) => parsers[typeName](content);
