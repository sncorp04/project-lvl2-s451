import yaml from 'js-yaml';
import parseIni from './parseIni';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': parseIni,
};

export default extension => parsers[extension];
