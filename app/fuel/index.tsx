import UI_Text from "../../ui/components/basic/Text";
import {Button, TextInput, View} from "react-native";
import {BLOCK_SPACING, FONT_SIZE} from "../../constants/SIZES";
import {COLOR} from "../../constants/COLORS";
import {openDatabase} from "../../utils/database/sqLite";
import {useEffect, useState} from "react";
import {SQLTransaction} from "expo-sqlite";

const db = openDatabase("db.db");

export default function fuel() {
  const [list, setItems] = useState(null);
  const [error, setError] = useState(null);

  // Input Fields

  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [cost, setCost] = useState("");


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS 'fuelConsumption' (id INTEGER PRIMARY KEY AUTOINCREMENT, distance REAL, consumption REAL, cost REAL)",
        null,
        () => {},
        (txObj, error) => {
          setError("An error occurred while instantiating database")
          console.warn(error);
          return false;
        }
      )

    });
    loadData();
  }, []);

  function add() {
    loadData();
  }

  function loadData() {
    db.transaction((tx) => {
      tx.executeSql(
        `select distance, consumption, cost from fuelConsumption;`,
        null,
        (a, {rows: {_array}}) => {
          setItems(_array)
        },
        (txObj, error) => {
          setError("An error occurred while reading data from the database");
          console.warn(error);
          return false;
        }
      );
    }
  }

  return <>
    <View style={{
      padding: BLOCK_SPACING.LG,
      gap: BLOCK_SPACING.MD
    }}>
      { error ? <UI_Text padding={BLOCK_SPACING.LG}>{error}</UI_Text> : <></>}

      <TextInput
        onChangeText={(text) => setDistance(text.replace(/[^0-9]/g, ''))}
        keyboardType={"numeric"}
        onSubmitEditing={() => {
          add();
          setDistance("");
        }}
        style={{
          color: COLOR.FONT_PRIMARY
      }}
        placeholder="what do you need to do?"
        value={distance}
      />
      <Button title={"Title"} onPress={add} />
      {list ? list.map((element, index) => {

        const dist = element.distance + "";
        const consume = (element.consumption / element.distance * 100);
        const consume_int = Math.trunc(consume);
        const consume_str = consume_int + "," + Math.trunc((consume - consume_int) * 100)
        const cost = element.cost + "";

        return <View style={{
          display: "flex",
          flexDirection: "row",
          borderRadius: BLOCK_SPACING.SM,
          backgroundColor: COLOR.BG_NAVBAR,
          padding: BLOCK_SPACING.MD,
          gap: BLOCK_SPACING.MD
        }}
        key={index}
        >
          <View style={{flex: 1}}>
            <UI_Text size={FONT_SIZE.XL} center>{dist}</UI_Text>
            <UI_Text size={FONT_SIZE.XS} center>km</UI_Text>
          </View>
          <View style={{flex: 1}}>
            <UI_Text size={FONT_SIZE.XL} center>{consume_str}</UI_Text>
            <UI_Text size={FONT_SIZE.XS} center>l/100km</UI_Text>
          </View>
          <View style={{flex: 1}}>
            <UI_Text size={FONT_SIZE.XL} center>{cost}</UI_Text>
            <UI_Text size={FONT_SIZE.XS} center>Euro</UI_Text>
          </View>
        </View>
      }) : <></>}
    </View>
  </>
}