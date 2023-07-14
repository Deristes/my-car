import dbConnector from '../database/dbConnector';
import GasStationClass from './gasStation.class';

interface FuelData {
  id: number;
  distance: number;
  consumption: number;
  cost: number;
  date: string;
  stationId: string;
  stationBrand: string | null;
  stationLat: number | null;
  stationLng: number | null;
  stationName: string | null;
  stationPostCode: number | null;
  stationPlace: string | null;
  stationStreet: string | null;
  stationHouseNumber: string | null;
}

export interface fuelListEntry {
  id: number,
  distance: number,
  consumption: number,
  cost: number,
  date: Date
  station?: GasStationClass
}

export async function saveFuelEntry(db: dbConnector, distance: number, consumption: number, cost: number, station: GasStationClass|null) {
  if (station != null) {
    await db.executeQuery(
      'insert into fuelStation (id, brand, lat, lng, name, postCode, place, street, houseNumber) values (?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [
        station.id,
        station.brand,
        station.lat,
        station.lng,
        station.name,
        station.postCode,
        station.place,
        station.street,
        station.houseNumber
      ]
    );
  }
  await db.executeQuery(
    'insert into fuelConsumption (distance, consumption, cost, stationId, date) values (?, ?, ?, ?, datetime(\'now\', \'localtime\'));',
    [
      distance,
      consumption,
      cost,
      station != null ? station.id : null
    ]
  );
}

export async function getFuelEntries(db: dbConnector, limit: number) {
  let result: FuelData[];
  try {
    result = await db.executeQuery(
      `
    SELECT
        fc.id AS id,
        fc.distance AS distance,
        fc.consumption AS consumption,
        fc.cost AS cost,
        fc.date AS date,
        fs.id AS stationId,
        fs.brand AS stationBrand,
        fs.lat AS stationLat,
        fs.lng AS stationLng,
        fs.name AS stationName,
        fs.postCode AS stationPostCode,
        fs.place AS stationPlace,
        fs.street AS stationStreet,
        fs.houseNumber AS stationHouseNumber
    FROM fuelConsumption AS fc
    LEFT JOIN fuelStation AS fs
    ON fc.stationId = fs.id
    ORDER BY fc.date DESC
    LIMIT ?;`,
      [limit]
    ) as FuelData[];
  } catch (e) {
    result = [];
  }

  return result.map((e): fuelListEntry => {
    return {
      id: e.id,
      distance: e.distance,
      consumption: e.consumption,
      cost: e.cost,
      date: new Date(e.date),
      station: e.stationId != null ? new GasStationClass({
        id: e.stationId,
        brand: e.stationBrand,
        lat: e.stationLat,
        lng: e.stationLng,
        name: e.stationName,
        postCode: e.stationPostCode,
        place: e.stationPlace,
        street: e.stationStreet,
        houseNumber: e.stationHouseNumber,
        isOpen: false,
        e5: null,
        e10: null,
        diesel: null,
        dist: 0
      }) : null
    };
  });
}