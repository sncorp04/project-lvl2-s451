import fs from 'fs';
import gendiff from '../src';

test('gendiff json', () => {
  const fileBefore = '__tests__/__fixtures__/before.json';
  const fileAfter = '__tests__/__fixtures__/after.json';
  const actual = gendiff(fileBefore, fileAfter);
  const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8').trim();
  expect(actual).toBe(expected);
});

test('gendiff yaml', () => {
  const fileBefore = '__tests__/__fixtures__/before.yml';
  const fileAfter = '__tests__/__fixtures__/after.yml';
  const actual = gendiff(fileBefore, fileAfter);
  const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8').trim();
  expect(actual).toBe(expected);
});
