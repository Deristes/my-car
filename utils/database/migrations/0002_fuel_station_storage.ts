export default async (executeQuery: (statement: string, args?: (number | string | null)[]) => Promise<unknown> ) => {
  await executeQuery(
    'CREATE TABLE \'fuelStation\' (id TEXT PRIMARY KEY, brand TEXT, dist REAL, houseNumber TEXT, isOpen INTEGER, lat REAL, lng REAL, name TEXT, place TEXT, postCode INTEGER, street TEXT)'
  );
  await executeQuery(
    'ALTER TABLE \'fuelConsumption\' ADD COLUMN stationId TEXT'
  );
};
