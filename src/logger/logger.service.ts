import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { writeLogsToFile } from 'src/utils/writeLogsToFile';

@Injectable({ scope: Scope.TRANSIENT })
export class HomeLibraryServiceLogger extends ConsoleLogger {
  log(message: string) {
    this.writeToFile(message);
  }

  error(message: string, trace: string) {
    // write the message to a file, send it to the database or do anything
    this.writeToFile(message);
    this.writeToFile(trace);
  }

  warn(message: string) {
    this.writeToFile(message);
  }

  debug(message: string) {
    this.writeToFile(message);
  }

  verbose(message: string) {
    this.writeToFile(message);
  }

  private writeToFile(message: string) {
    // Implement the logic to write logs to a file here.
    console.log(message);
    writeLogsToFile(message);
  }
}
