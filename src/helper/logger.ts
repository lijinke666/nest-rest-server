import { LoggerService, Logger } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log(message: string) {
    Logger.log('@MyLogger-log:', message);
  }
  error(message: string, trace: string) {
    Logger.log('@MyLogger-error:', message);
  }
  warn(message: string) {
    Logger.log('@MyLogger-warn:', message);
  }
  debug(message: string) {
    Logger.log('@MyLogger-message:', message);
  }
  verbose(message: string) {}
}
