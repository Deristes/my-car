import {TouchableOpacity, View} from 'react-native';
import {BLOCK_SPACING} from '../../constants/SIZES';
import {useEffect, useState} from 'react';
import PG_FuelInput from '../../ui/pages/fuel/FuelInput';
import UI_Modal from '../../ui/components/modal/Modal';
import UI_Button from '../../ui/components/basic/Button';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {COLOR} from '../../constants/COLORS';
import PG_FuelList from '../../ui/pages/fuel/FuelList';
import {useDb} from '../_layout';
import {fuelListEntry, getFuelEntries} from "../../utils/fuelApi/fuelDbStorage";


export default function fuel() {
  const [list, setItems] = useState<fuelListEntry[]>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const db = useDb();

  useEffect(() => {
    if (db == null) {
      return;
    }
    loadData(25).then();
  }, [db]);

  async function loadData(limit) {
    setItems(await getFuelEntries(db, limit));
  }

  return <>
    <View style={{
      padding: BLOCK_SPACING.LG,
      gap: BLOCK_SPACING.MD
    }}>
      <UI_Modal
        open={modalVisible}
        setOpen={setModalVisible}
        title={'Neuer eintrag'}
      >
        <PG_FuelInput refreshItems={() => {
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