import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'fs';
import * as path from 'path';
import { LoggerLevels } from 'src/shared/const';

export const writeLogsToFile = (
  level: keyof typeof LoggerLevels,
  message: string,
) => {
  const logsDir = path.join(process.cwd(), 'logs');
  const errorsDir = path.join(process.cwd(), 'errors');

  const data = `{"level": "${level}", "message": "${message}", "timestamp": "[${new Date().toISOString()}]"}\r\n`;

  let dir = logsDir;
  let filePrefix = 'logs';
  if (level === 'error') {
    dir = errorsDir;
    filePrefix = 'errors';
  }

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  const files = readdirSync(dir);
  const lastFile = files[files.length - 1];
  let lastFileSize = undefined;
  if (lastFile) {
    lastFileSize = statSync(path.join(dir, lastFile)).size;
  }

  if (lastFileSize && lastFileSize < +process.env.LOGGER_FILE_SIZE) {
    appendFileSync(path.join(dir, lastFile || `${filePrefix}-0.log`), data, {
      encoding: 'utf8',
      mode: 438,
    });
  } else {
    appendFileSync(path.join(dir, `${filePrefix}-${files.length}.log`), data, {
      encoding: 'utf8',
      mode: 438,
    });
  }
};
