export default async (executeQuery: (statement: string, args?: (number | string | null)[]) => Promise<unknown> ) => {
  await executeQuery(
    'DROP TABLE IF EXISTS \'fuelConsumption\''
  );
  await executeQuery(
    'CREATE TABLE \'fuelConsumption\' (id INTEGER PRIMARY KEY AUTOINCREMENT, distance REAL, consumption REAL, cost REAL, date DATE)'
  );
};