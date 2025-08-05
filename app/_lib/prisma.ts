import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}
/**
 * This is a singleton to prevent multiple instances of Prisma Client in development.
 * It's used to prevent unnecessary re-hydration of the Prisma Client in development,
 * and to ensure that the same instance is used throughout the lifecycle of the application.
 */

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
