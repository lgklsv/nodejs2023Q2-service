import { Module } from '@nestjs/common';
import { HomeLibraryServiceLogger } from './logger.service';

@Module({
  providers: [HomeLibraryServiceLogger],
  exports: [HomeLibraryServiceLogger],
})
export class LoggerModule {}
