#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

commander
  .version('1.3.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => console.log(gendiff(first, second)))
  .parse(process.argv);
