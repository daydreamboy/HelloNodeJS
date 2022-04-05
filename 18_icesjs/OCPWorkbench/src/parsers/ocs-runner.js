#!/usr/bin/env node

import fs from 'fs';
import readline from 'readline';
import OcsParser from './ocs-parser';
import Weiwo from '../weiwo';

function read_file(io_file) {
  return io_file == '-' ? fs.readFileSync(0).toString() : fs.readFileSync(io_file).toString()
}

function compile_to_ast(ocs_code) {
  let ast = null;
  try {
    ast = OcsParser.parse(ocs_code);
  }
  catch (e) {
    process.stderr.write(e.message + '\n');
  }

  return ast;
}

function run_ast(ast, completeFunc) {
  Weiwo.$.executeCode(ast).then((result) => {
    if (result instanceof Weiwo) {
      const { type } = result.target;
      if (type == 'object') {
        process.stdout.write(result.target.description + '\n');
      }
      else if (type == 'class') {
        process.stdout.write(`Class: ${result.target.name}\n`);
      }
    }
    else {
      const json = JSON.stringify(result, undefined, 2);
      process.stdout.write(json + '\n');
    }

    if (completeFunc) {
      completeFunc();
    }
  }).catch((reason) => {
    process.stderr.write(reason.message + '\n');
    if (completeFunc) {
      completeFunc();
    }
  });
}

if (process.argv.length > 2) {
  const action = process.argv[2];
  switch (action) {
    case '-compile': {
      const ast = compile_to_ast(read_file(process.argv[3]));
      if (ast != null) {
        if (typeof ast == 'string') {
          process.stdout.write(ast);
        }
        else {
          process.stdout.write(JSON.stringify(ast));
        }
      }
      else {
        process.exit(1);
      }
      break;
    }
    case '-run': {
      const ast = compile_to_ast(read_file(process.argv[3]));
      run_ast(ast);
      break;
    }
    case '-command': {
      const ast = compile_to_ast(process.argv[3]);
      run_ast(ast);
      break;
    }
  }
}
else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OCS > '
  });

  rl.prompt();
  rl.on('line', async (input) => {
    const ast = compile_to_ast(input);
    if (ast) {
      run_ast(ast, () => {
        rl.prompt();
      });
    }
  });
}



