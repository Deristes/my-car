import * as SQLite from 'expo-sqlite';
import migration from './migrations';

export default class dbConnector {

  private readonly db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = SQLite.openDatabase('db.db');
  }

  public executeQuery(statement: string, args?: (number | string | null)[]): Promise<unknown> {
    if (this.db == null) {
      return;
    }
    return new Promise<unknown>((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(statement, args, (transaction, {rows: {_array}}) => {
          resolve(_array);
        }, (transaction, error) => {
          reject({statement, error, args});
          return false;
        });
      });
    });
  }

  public async migrate() {
    const dbVersion = await this.getDbVersion();

    for (let i = dbVersion; i < migration.length; i++) {
      await migration[i].call(this.executeQuery);
    }

    await this.setDbVersion(migration.length);
  }

  private async getDbVersion(): Promise<number> {
    // Ensure migration table exists
    await this.executeQuery('DROP TABLE IF EXISTS \'migrations\'');

    await this.executeQuery('CREATE TABLE IF NOT EXISTS \'migrations\' (migration INTEGER)');

    // Get version if exists
    const version = (await this.executeQuery('SELECT migration from migrations'));
    console.log(version);
    // if version row does not exist create it
    if (version == null || version[0] == null) {
      console.log('a');
      await this.executeQuery('INSERT INTO \'migrations\' (migration) VALUES (0)');
      console.log('b');
      return 0;
    }

    return version[0].migration;
  }

  private async setDbVersion(version: number): Promise<void> {
    await this.executeQuery(
      'UPDATE \'migrations\' SET migration = ?',
      [version]
    );
  }
}