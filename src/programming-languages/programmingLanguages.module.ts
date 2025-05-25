import { MongooseModule } from '@nestjs/mongoose';
import {
  ProgrammingLanguages,
  ProgrammingLanguagesSchema,
} from './programmingLanguages.entity';
import { ProgrammingLanguagesServices } from './programmingLanguages.service';
import { ProgrammingLanguagesController } from './programmingLanguages.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProgrammingLanguages.name, schema: ProgrammingLanguagesSchema },
    ]),
  ],
  providers: [ProgrammingLanguagesServices],
  controllers: [ProgrammingLanguagesController],
})
export class ProgrammingLanguagesModule {}
