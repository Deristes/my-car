export default async (executeQuery: (statement: string, args?: (number | string | null)[]) => Promise<unknown> ) => {
  await executeQuery(
    'CREATE TABLE \'fuelStation\' (id TEXT PRIMARY KEY, brand TEXT, houseNumber TEXT, lat REAL, lng REAL, name TEXT, place TEXT, postCode INTEGER, street TEXT)'
  );
  await executeQuery(
    'ALTER TABLE \'fuelConsumption\' ADD COLUMN stationId TEXT'
  );
};
