import mongoose from 'mongoose';

class Database {
  private static instance: Database;
  private db: mongoose.Connection;

  private constructor() {
    mongoose.connect('mongodb://localhost:27017/myRecipes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    this.db = mongoose.connection;

    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', function () {
      console.log('Connected to MongoDB database!');
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getConnection(): mongoose.Connection {
    return this.db;
  }
}

export default Database.getInstance();