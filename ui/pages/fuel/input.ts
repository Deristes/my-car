import { useState } from "react";
import { type WebSQLDatabase } from "expo-sqlite";

interface fuelConsumption {
  distance: number,
  consumption: number,
  cost: number
}

export default function ({db, refreshItems}: {db: WebSQLDatabase, refreshItems: () => {}}) {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [cost, setCost] = useState("");

  function add() {
    if (!distance) {
      return;
    }
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into fuelConsumption (distance, consumption, cost) values (?, 40.58, 72.60);",
          [distance]);
        refreshItems();
      }
    )
  }
}