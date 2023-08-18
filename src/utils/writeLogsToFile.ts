import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'fs';
import * as path from 'path';

export const writeLogsToFile = (message: string) => {
  const logsDir = path.join(process.cwd(), 'logs');
  // const errorsDir = path.join(process.cwd(), 'errors');

  const data = `{"level": "1", "message": "${message}", "timestamp": "${new Date()}"}\r\n`;

  if (!existsSync(logsDir)) {
    mkdirSync(logsDir);
  }

  const files = readdirSync(logsDir);
  const lastFile = files[files.length - 1];
  let lastFileSize = undefined;
  if (lastFile) {
    lastFileSize = statSync(path.join(logsDir, lastFile)).size;
  }

  if (lastFileSize && lastFileSize < +process.env.LOGGER_FILE_SIZE) {
    appendFileSync(path.join(logsDir, lastFile || 'logs-0.log'), data, {
      encoding: 'utf8',
      mode: 438,
    });
  } else {
    appendFileSync(path.join(logsDir, `logs-${files.length}.log`), data, {
      encoding: 'utf8',
      mode: 438,
    });
  }
};
