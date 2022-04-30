import { argv } from 'process';

console.log(argv);

console.log(argv[argv.indexOf('--type') + 1]);
