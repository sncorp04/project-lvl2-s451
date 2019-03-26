import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParse from './parsers';

const diffActions = [
  {
    check: (dataOne, dataTwo, key) => !_.has(dataOne, key) && _.has(dataTwo, key),
    action: (dataOne, dataTwo, key) => `  + ${key}: ${dataTwo[key]}`,
  },
  {
    check: (dataOne, dataTwo, key) => _.has(dataOne, key) && !_.has(dataTwo, key),
    action: (dataOne, dataTwo, key) => `  - ${key}: ${dataOne[key]}`,
  },
  {
    check: (dataOne, dataTwo, key) => dataOne[key] === dataTwo[key],
    action: (dataOne, dataTwo, key) => `    ${key}: ${dataOne[key]}`,
  },
  {
    check: (dataOne, dataTwo, key) => dataOne[key] !== dataTwo[key],
    action: (dataOne, dataTwo, key) => `  + ${key}: ${dataTwo[key]}\n  - ${key}: ${dataOne[key]}`,
  },
];

const getDataFile = (pathToFile) => {
  const parse = getParse(path.extname(pathToFile));
  return parse(fs.readFileSync(pathToFile, 'utf-8'));
};

export default (firstFile, secondFile) => {
  const dataOfFileOne = getDataFile(firstFile);
  const dataOfFileTwo = getDataFile(secondFile);
  const keys = _.union(_.keys(dataOfFileOne), _.keys(dataOfFileTwo));
  const arrayDiff = keys.map((key) => {
    const { action } = diffActions.find(({ check }) => check(dataOfFileOne, dataOfFileTwo, key));
    return action(dataOfFileOne, dataOfFileTwo, key);
  });
  return `{\n${arrayDiff.join('\n')}\n}`;
};
