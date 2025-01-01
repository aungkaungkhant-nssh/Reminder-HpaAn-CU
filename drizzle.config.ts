import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
    path: '.env'
})

export default defineConfig({
    out: './db/migration',
    schema: './db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});