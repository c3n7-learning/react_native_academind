import * as SQLite from "expo-sqlite";

let database = null;

export function init() {
  const promise = new Promise(async (resolve, reject) => {
    database = await SQLite.openDatabaseAsync("places.db");

    try {
      database.withTransactionSync(() => {
        database.execSync(`CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );`);
      });
    } catch (e) {
      reject(e);
      return;
    }

    resolve();
  });

  return promise;
}
