import { Module } from '@nestjs/common';
import { OpeniaService } from './services/openia.service';

@Module({
  providers: [OpeniaService],
  exports: [OpeniaService]
})
export class AiModule {}
