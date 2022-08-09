import yaml from 'js-yaml';
import { FILE_TYPE } from './constants.js';

const parsers = {
  [FILE_TYPE.JSON]: JSON.parse,
  [FILE_TYPE.YAML]: yaml.load,
  [FILE_TYPE.YML]: yaml.load,
};
export const availableParsers = Object.keys(parsers);

export default (content, typeName) => {
  if (!content) throw new Error('Unvalid data');
  const parser = parsers[typeName];
  if (!parser) {
    throw new Error(`File type ${typeName} unavailable`);
  }
  return parser(content);
};
