import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParse from './parsers';
import render from './renderers/renderers';

const diffActions = [
  {
    type: 'parent',
    check: (dataOne, dataTwo, key) => (
      dataOne[key] instanceof Object && dataTwo[key] instanceof Object
    ),
    action: (dataOne, dataTwo, key, func) => ({ key, children: func(dataOne[key], dataTwo[key]) }),
  },
  {
    type: 'added',
    check: (dataOne, dataTwo, key) => !_.has(dataOne, key) && _.has(dataTwo, key),
    action: (dataOne, dataTwo, key) => ({ key, value: dataTwo[key] }),
  },
  {
    type: 'deleted',
    check: (dataOne, dataTwo, key) => _.has(dataOne, key) && !_.has(dataTwo, key),
    action: (dataOne, dataTwo, key) => ({ key, value: dataOne[key] }),
  },
  {
    type: 'unchanged',
    check: (dataOne, dataTwo, key) => dataOne[key] === dataTwo[key],
    action: (dataOne, dataTwo, key) => ({ key, value: dataOne[key] }),
  },
  {
    type: 'changed',
    check: (dataOne, dataTwo, key) => dataOne[key] !== dataTwo[key],
    action: (dataOne, dataTwo, key) => (
      { key, valueBefore: dataOne[key], valueAfter: dataTwo[key] }
    ),
  },
];

const getItemAction = (firstObj, secondObj, key) => (
  diffActions.find(({ check }) => check(firstObj, secondObj, key))
);

const getDataFile = (pathToFile) => {
  const parse = getParse(path.extname(pathToFile));
  const readfile = fs.readFileSync(pathToFile, 'utf-8');
  return parse(readfile);
};

const buildAst = (firstData, secondData) => {
  const keys = _.union(_.keys(firstData), _.keys(secondData));
  return (keys.map((key) => {
    const { type, action } = getItemAction(firstData, secondData, key);
    return { type, ...action(firstData, secondData, key, buildAst) };
  }));
};

export default (firstFile, secondFile, format) => {
  const dataFileOne = getDataFile(firstFile);
  const dataFileTwo = getDataFile(secondFile);
  const ast = buildAst(dataFileOne, dataFileTwo);
  return render[format](ast);
};
