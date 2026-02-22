import { defineConfig } from 'vitest/config';
import type { UserConfig } from 'vitest/config';

process.env.DATABASE_URL = '/tmp/maturityos-test.json';

export default defineConfig({
  test: {
    environment: 'node',
  },
} as UserConfig);
