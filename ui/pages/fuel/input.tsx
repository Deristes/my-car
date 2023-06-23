import { useState } from 'react';
import { type WebSQLDatabase } from 'expo-sqlite';
import {Button, View} from 'react-native';
import UI_TextInput from '../../components/basic/TextInput';
import {BLOCK_SPACING} from '../../../constants/SIZES';

export default function PG_FuelInput({db, refreshItems}: {db: WebSQLDatabase, refreshItems: () => void}) {
  const [distance, setDistance] = useState<string>('');
  const [consumption, setConsumption] = useState<string>('');
  const [cost, setCost] = useState<string>('');

  function add() {
    if (!(distance && consumption && cost && db !== null)) {
      return;
    }
    db.transaction(
      (tx) => {
        tx.executeSql(
          'insert into fuelConsumption (distance, consumption, cost) values (?, ?, ?);',
          [distance, consumption, cost]);
        refreshItems();
      }
    );
  }

  return <View style={{
    gap: BLOCK_SPACING.SM
  }}>
    <UI_TextInput setValue={setDistance} value={distance} placeholder={'Distanz'}/>
    <UI_TextInput setValue={setConsumption} value={consumption} placeholder={'Verbrauch'}/>
    <UI_TextInput setValue={setCost} value={cost} placeholder={'Kosten'}/>
    <Button title={'Title'} onPress={add} />
  </View>;
}