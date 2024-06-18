import mongoose from 'mongoose';

const mongoUrl =
  process.env.MONGO_URL || 'mongodb://localhost:27017/task-manager';

export const initializeDatabaseConnection = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl, {
      appName: 'task-manager-app',
      dbName: 'task-manager',
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: DB not initizalized ${error}`);
    process.exit(1);
  }
};
