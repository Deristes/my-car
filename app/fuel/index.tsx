import UI_Text from '../../ui/components/basic/Text';
import {View} from 'react-native';
import {BLOCK_SPACING} from '../../constants/SIZES';
import {openDatabase} from '../../utils/database/sqLite';
import {useEffect, useState} from 'react';
import PG_FuelInput from '../../ui/pages/fuel/FuelInput';
import UI_Modal from '../../ui/components/modal/Modal';
import UI_Button from '../../ui/components/basic/Button';
import UI_Card from '../../ui/components/container/Card';
import UI_FuelArrayView from '../../ui/components/fuel/FuelArrayView';

const db = openDatabase('db.db');

export default function fuel() {
  const [list, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS \'fuelConsumption\' (id INTEGER PRIMARY KEY AUTOINCREMENT, distance REAL, consumption REAL, cost REAL)',
        null,
        null,
        (txObj, error) => {
          setError('An error occurred while instantiating database');
          console.warn(error);
          return false;
        }
      );

    });
    loadData();
  }, []);

  function loadData() {
    db.transaction((tx) => {
      tx.executeSql(
        'select distance, consumption, cost from fuelConsumption;',
        null,
        (a, {rows: {_array}}) => {
          setItems(_array);
        },
        (txObj, error) => {
          setError('An error occurred while reading data from the database');
          console.warn(error);
          return false;
        }
      );
    });
  }

  return <>
    <View style={{
      padding: BLOCK_SPACING.LG,
      gap: BLOCK_SPACING.MD
    }}>
      { error ? <UI_Text padding={BLOCK_SPACING.LG}>{error}</UI_Text> : <></>}

      <UI_Modal
        open={modalVisible}
        setOpen={setModalVisible}
        title={'Neuer eintrag'}
      >
        <PG_FuelInput db={db} refreshItems={() => {
          loadData();
          setModalVisible(false);
        }} />
      </UI_Modal>

      <UI_Button title={'Neuer eintrag'} onPress={() => {setModalVisible(true);}} />

      {list ? list.map((element, index) => {
        return <UI_Card key={index}>
          <UI_FuelArrayView distance={element.distance} consumption={element.consumption} cost={element.cost} />
        </UI_Card>;
      }) : <></>}
    </View>
  </>;
}