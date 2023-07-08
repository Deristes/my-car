import migration_0001 from './migrations/0001_fuel_storage';
import migration_0002 from './migrations/0002_fuel_station_storage';

interface I_migration {
  id: number;
  call: (
    executeQuery: (
      statement: string,
      args?: (number | string | null)[]
    ) => Promise<unknown>
  ) => Promise<void>;
}

const migration: I_migration[] = [
  {
    id: 1,
    call: migration_0001
  }, {
    id: 2,
    call: migration_0002
  }
];
export default migration;