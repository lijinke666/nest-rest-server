import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
}
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
