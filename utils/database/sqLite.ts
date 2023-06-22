import * as SQLite from "expo-sqlite";
import {Platform} from "react-native";

export function openDatabase(dbName: string) {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  return SQLite.openDatabase(dbName);
}