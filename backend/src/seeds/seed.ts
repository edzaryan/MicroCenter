import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { CleanService } from './clean.service';
import { SeedService } from './seed.service';
import { INestApplicationContext } from '@nestjs/common';

async function bootstrap() {
  let app: INestApplicationContext | null = null;

  try {
    app = await NestFactory.createApplicationContext(SeedModule);

    const cleanService = app.get(CleanService);
    const seedService = app.get(SeedService);

    try {
      await cleanService.run();
    } catch (cleanErr) {
      console.error('❌ ERROR in CleanService:', cleanErr);
    }

    try {
      await seedService.run();
    } catch (seedErr) {
      console.error('❌ ERROR in SeedService:', seedErr);
    }

  } catch (bootstrapErr) {
    console.error('❌ BOOTSTRAP ERROR:', bootstrapErr);
  } finally {
    if (app) {
      await app.close().catch(err =>
        console.error('❌ ERROR while closing app:', err),
      );
    }
  }
}

bootstrap().catch(err =>
  console.error('❌ FINAL FALLBACK ERROR:', err),
);
