import dbConnector from '../database/dbConnector';
import GasStationClass from './gasStation.class';

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