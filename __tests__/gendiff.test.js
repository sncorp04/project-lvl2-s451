import fs from 'fs';
import gendiff from '../src';

test.each([
  ['beforeSimple.json', 'afterSimple.json', 'expectedSimple'],
  ['beforeSimple.yml', 'afterSimple.yml', 'expectedSimple'],
  ['beforeSimple.ini', 'afterSimple.ini', 'expectedSimple'],
  ['beforeTree.json', 'afterTree.json', 'expectedTree'],
  ['beforeTree.yml', 'afterTree.yml', 'expectedTree'],
  ['beforeTree.ini', 'afterTree.ini', 'expectedTree'],
])(
  'gendiff(%s, %s)',
  (first, second, expected) => {
    const pathOfTests = '__tests__/__fixtures__/';
    expect(gendiff(`${pathOfTests}${first}`, `${pathOfTests}${second}`))
      .toBe(fs.readFileSync(`${pathOfTests}${expected}`, 'utf-8').trim());
  },
);
