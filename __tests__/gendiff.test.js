import fs from 'fs';
import gendiff from '../src';

test.each([
  ['before.json', 'after.json', 'expected'],
  ['before.yml', 'after.yml', 'expected'],
  ['before.ini', 'after.ini', 'expected'],
])(
  'gendiff(%s, %s)',
  (first, second, expected) => {
    const pathOfTests = '__tests__/__fixtures__/';
    expect(gendiff(`${pathOfTests}${first}`, `${pathOfTests}${second}`))
      .toBe(fs.readFileSync(`${pathOfTests}${expected}`, 'utf-8').trim());
  },
);
