import * as SQLite from "expo-sqlite";
import { Place } from "../models/Place";

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

export function insertPlace(place) {
  return database.withTransactionAsync(async () => {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng
    );
  });
}

export function fetchPlaces() {
  return new Promise(async (resolve, reject) => {
    database.withTransactionSync(async () => {
      try {
        const result = await database.getAllAsync("SELECT * FROM places;");

        const places = result.map(
          (place) =>
            new Place(
              place.title,
              place.imageUri,
              {
                address: place.address,
                lat: place.lat,
                lng: place.lng,
              },
              place.id
            )
        );

        resolve(places);
        return;
      } catch (e) {
        reject(e);
      }
    });
  });
}

export function fetchPlaceDetails(id) {
  return new Promise(async (resolve, reject) => {
    database.withTransactionSync(async () => {
      try {
        const result = await database.getAllAsync(
          "SELECT * FROM places where id = ?;",
          id
        );
        resolve(result[0]);
      } catch (e) {
        reject(e);
      }
    });
  });
}
