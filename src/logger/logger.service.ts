import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LoggerLevels } from 'src/shared/const';
import { writeLogsToFile } from 'src/shared/lib';

@Injectable({ scope: Scope.TRANSIENT })
export class HomeLibraryServiceLogger extends ConsoleLogger {
  error(message: string, trace: string) {
    if (+process.env.LOGGER_LEVEL >= LoggerLevels.error) {
      writeLogsToFile(
        LoggerLevels[LoggerLevels.error] as keyof typeof LoggerLevels,
        message,
      );
      writeLogsToFile(
        LoggerLevels[LoggerLevels.error] as keyof typeof LoggerLevels,
        trace,
      );
    }
  }

  warn(message: string) {
    if (+process.env.LOGGER_LEVEL >= LoggerLevels.warn) {
      writeLogsToFile(
        LoggerLevels[LoggerLevels.warn] as keyof typeof LoggerLevels,
        message,
      );
    }
  }

  log(message: string) {
    if (+process.env.LOGGER_LEVEL >= LoggerLevels.log) {
      writeLogsToFile(
        LoggerLevels[LoggerLevels.log] as keyof typeof LoggerLevels,
        message,
      );
    }
  }

  debug(message: string) {
    if (+process.env.LOGGER_LEVEL >= LoggerLevels.debug) {
      writeLogsToFile(
        LoggerLevels[LoggerLevels.debug] as keyof typeof LoggerLevels,
        message,
      );
    }
  }

  verbose(message: string) {
    if (+process.env.LOGGER_LEVEL >= LoggerLevels.verbose) {
      writeLogsToFile(
        LoggerLevels[LoggerLevels.verbose] as keyof typeof LoggerLevels,
        message,
      );
    }
  }
}
