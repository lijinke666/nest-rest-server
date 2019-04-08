import * as log4js from 'log4js';
import { join } from 'path';
import { existsSync } from 'fs';
const config = join(process.cwd(), 'log4js.json');

if (existsSync(config)) {
  log4js.configure(config);
}

export default log4js
