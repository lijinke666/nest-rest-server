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
    return process.env[key] || this.envConfig[key];
  }

  getKeys(keys: string[]): any {
    return keys.reduce((obj, key: string) => {
      obj[key] = this.get(key);
      return obj;
    }, {});
  }
  getNumber(key: string): number {
    return Number(this.get(key));
  }
  getBoolean(key: string): boolean {
    return Boolean(this.get(key));
  }
  getJson(key: string): { [prop: string]: any } | null {
    try {
      return JSON.parse(this.get(key));
    } catch (error) {
      return null;
    }
  }
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  get isDevelopment(): boolean {
    return this.get('NODE_ENV') === 'development';
  }
  get isProduction(): boolean {
    return this.get('NODE_ENV') === 'production';
  }
  get isTest(): boolean {
    return this.get('NODE_ENV') === 'test';
  }
}
