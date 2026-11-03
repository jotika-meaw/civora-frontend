import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/civora";

let client;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(uri);
}

// NOTE: no eager connect() here — the driver connects lazily on first
// operation so `next build` / typegen never hangs when Mongo is unreachable.
export const db = client.db();
export default client;
