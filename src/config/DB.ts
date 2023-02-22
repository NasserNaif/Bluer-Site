import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error"],
  errorFormat: "pretty",
});

const connectDB = () => {
  try {
    prisma.$connect;
    console.log("database Connected !!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { connectDB, prisma };
