import { appendFileSync, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

export const writeLogsToFile = (message: string) => {
  const logsDir = path.join(process.cwd(), 'logs');
  // const errorsDir = path.join(process.cwd(), 'errors');

  const data = `{"level": "1", "message": "${message}", "timestamp": "${new Date()}"}\r\n`;

  if (!existsSync(logsDir)) {
    mkdirSync(logsDir);
  }

  appendFileSync(path.join(logsDir, 'logs.log'), data, {
    encoding: 'utf8',
    mode: 438,
  });
};
