### Hexlet tests and linter status:
[![Actions Status](https://github.com/pppershin/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/pppershin/frontend-project-lvl2/actions)
[![Node.js CI](https://github.com/pppershin/frontend-project-lvl2/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/pppershin/frontend-project-lvl2/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/581d555abe0d27c7c2fc/maintainability)](https://codeclimate.com/github/pppershin/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/581d555abe0d27c7c2fc/test_coverage)](https://codeclimate.com/github/pppershin/frontend-project-lvl2/test_coverage)

# gendiff 🧑‍💻

Compares two configuration files and shows a difference. And this is my second project on Hexlet.io. 🧑‍🎓

## Installation ✅

To install gendiff, you need to clone repository first.

    git clone git@github.com:pppershin/frontend-project-lvl2.git

Then use Make to install gendiff localy.

    make install

And now you can use gendiff 👍

### Installation 

[![asciicast](https://asciinema.org/a/510966.svg)](https://asciinema.org/a/510966)

## Usage 🎯

Check `--help` or `-h` for manual.

    gendiff -h
    Usage: gendiff [options] <filepath1> <filepath2>

    Compares two configuration files and shows a difference.

    Options:
      -V, --version        output the version number
      -f, --format <type>  output format
      -h, --help           display help for command

### Available formats

- stylish (default)
- plain
- json

### Usage process

There's `stylish` and `plain` usage.

[![asciicast](https://asciinema.org/a/512158.svg)](https://asciinema.org/a/512158)

and here is `json` usage.

[![asciicast](https://asciinema.org/a/512180.svg)](https://asciinema.org/a/512180)