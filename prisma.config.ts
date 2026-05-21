import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    seed: "npx ts-node -r tsconfig-paths/register prisma/seed.ts",
  },
});