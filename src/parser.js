import yaml from 'js-yaml';
import { FILE_TYPE } from './constants.js';

const parsers = {
  [FILE_TYPE.JSON]: (content) => {
    if (content) {
      return JSON.parse(content);
    }
    throw new Error('Unvalid data JSON');
  },
  [FILE_TYPE.YAML]: (content) => {
    if (content) {
      return yaml.load(content);
    }
    throw new Error('Unvalid data YAML');
  },
  [FILE_TYPE.YML]: (content) => {
    if (content) {
      return yaml.load(content);
    }
    throw new Error('Unvalid data YML');
  },
};

export default (content, typeName) => parsers[typeName](content);
