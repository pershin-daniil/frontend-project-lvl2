import yaml from 'js-yaml';
import { FILE_TYPE } from './constants.js';

const parsers = {
  [FILE_TYPE.JSON]: JSON.parse,
  [FILE_TYPE.YAML]: yaml.load,
  [FILE_TYPE.YML]: yaml.load,
};

export default (content, typeName) => {
  const parse = parsers[typeName];
  if (!parse) {
    throw new Error(`File type ${typeName} unavailable`);
  }
  return parse(content);
};
