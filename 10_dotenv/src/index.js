import 'dotenv/config';
import './not_import_dotenv';

console.log('Hello index.js!');
console.log('index.js: ' + process.env.MY_SECRET);
