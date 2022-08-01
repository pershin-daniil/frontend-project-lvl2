#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/gendiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, { format }) => {
    console.log(gendiff(filepath1, filepath2, format));
  });
program.parse();
