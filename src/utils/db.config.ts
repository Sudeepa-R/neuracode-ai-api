import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  Logger.error(
    '❌ Invalid MongoDB URL. Please check your MONGODB_URL in the .env file.',
  );
  process.exit(1);
}

export const DatabaseConfig = MongooseModule.forRoot(mongoUrl);
