import { defineConfig } from 'prisma/config';
import { loadEnvConfig } from '@next/env';
import { env } from '@/lib/env';

loadEnvConfig(process.cwd());

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: env.DATABASE_URL ?? '',
  },
});
