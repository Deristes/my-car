import UI_Text from '../../ui/components/basic/Text';
import {TouchableOpacity, View} from 'react-native';
import {BLOCK_SPACING} from '../../constants/SIZES';
import {openDatabase} from '../../utils/database/sqLite';
import {useEffect, useState} from 'react';
import PG_FuelInput from '../../ui/pages/fuel/FuelInput';
import UI_Modal from '../../ui/components/modal/Modal';
import UI_Button from '../../ui/components/basic/Button';
import UI_Card from '../../ui/components/container/Card';
import UI_FuelArrayView from '../../ui/components/fuel/FuelArrayView';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {COLOR} from '../../constants/COLORS';
import PG_FuelList, {fuelListEntry} from '../../ui/pages/fuel/FuelList';

const db = openDatabase('db.db');

export default function fuel() {
  const [list, setItems] = useState<fuelListEntry[]>(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS \'fuelConsumption\' (id INTEGER PRIMARY KEY AUTOINCREMENT, distance REAL, consumption REAL, cost REAL, date DATE)',
        null,
        null,
        (txObj, error) => {
          setError('An error occurred while instantiating database');
          console.warn(error);
          return false;
        }
      );

    });
    loadData(25);
  }, []);

  function loadData(limit) {
    db.transaction((tx) => {
      tx.executeSql(
        'select distance, consumption, cost, date from fuelConsumption ORDER BY date DESC LIMIT ?;',
        [limit],
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
          loadData(25);
          setModalVisible(false);
        }} />
      </UI_Modal>

      <UI_Button title={'Neuer eintrag'} onPress={() => {setModalVisible(true);}} />

      {list ? <PG_FuelList list={list} /> : <></>}
      <TouchableOpacity onPress={() => {
        loadData(list.length + 25);
      }} style={{
        padding: BLOCK_SPACING.MD,
        alignItems: 'center'
      }}>
        <MaterialCommunityIcons name="chevron-down" size={24} color={COLOR.FONT_PRIMARY} />
      </TouchableOpacity>
    </View>
  </>;
}