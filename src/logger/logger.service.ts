import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LoggerLevels } from 'src/shared/const';
import { writeLogsToFile } from 'src/shared/lib';

@Injectable({ scope: Scope.TRANSIENT })
export class HomeLibraryServiceLogger extends ConsoleLogger {
  error(message: string, trace: string, name: string) {
    if (+process.env.LOGGER_LEVEL >= LoggerLevels.error) {
      console.log(
        '\x1b[31m',
        `${LoggerLevels[LoggerLevels.error].toUpperCase()}`,
        '\x1b[33m',
        `[${name}]`,
        '\x1b[31m',
        message,
      );

      console.log(
        '\x1b[31m',
        'TRACE',
        '\x1b[33m',
        `[${name}]`,
        '\x1b[31m',
        trace,
      );

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

  warn(message: string, name: string) {
    if (+process.env.LOGGER_LEVEL >= LoggerLevels.warn) {
      console.log(
        '\x1b[33m',
        `${LoggerLevels[LoggerLevels.warn].toUpperCase()}`,
        '\x1b[33m',
        `[${name}]`,
        '\x1b[33m',
        message,
      );
      writeLogsToFile(
        LoggerLevels[LoggerLevels.warn] as keyof typeof LoggerLevels,
        message,
      );
    }
  }

  log(message: string, name: string) {
    if (+process.env.LOGGER_LEVEL >= LoggerLevels.log) {
      console.log(
        '\x1b[32m',
        `${LoggerLevels[LoggerLevels.log].toUpperCase()}`,
        '\x1b[33m',
        `[${name}]`,
        '\x1b[32m',
        message,
      );
      writeLogsToFile(
        LoggerLevels[LoggerLevels.log] as keyof typeof LoggerLevels,
        message,
      );
    }
  }

  debug(message: string, name: string) {
    if (+process.env.LOGGER_LEVEL >= LoggerLevels.debug) {
      console.log(
        '\x1b[34m',
        `${LoggerLevels[LoggerLevels.debug].toUpperCase()}`,
        '\x1b[33m',
        `[${name}]`,
        '\x1b[34m',
        message,
      );
      writeLogsToFile(
        LoggerLevels[LoggerLevels.debug] as keyof typeof LoggerLevels,
        message,
      );
    }
  }

  verbose(message: string, name: string) {
    if (+process.env.LOGGER_LEVEL >= LoggerLevels.verbose) {
      console.log(
        '\x1b[37m',
        `${LoggerLevels[LoggerLevels.verbose].toUpperCase()}`,
        '\x1b[33m',
        `[${name}]`,
        '\x1b[37m',
        message,
      );
      writeLogsToFile(
        LoggerLevels[LoggerLevels.verbose] as keyof typeof LoggerLevels,
        message,
      );
    }
  }
}
