import {useEffect, useState} from 'react';
import {type WebSQLDatabase} from 'expo-sqlite';
import {View} from 'react-native';
import UI_TextInput from '../../components/basic/TextInput';
import {BLOCK_SPACING} from '../../../constants/SIZES';
import UI_Button from '../../components/basic/Button';
import UI_Card from '../../components/container/Card';
import UI_FuelArrayView from '../../components/fuel/FuelArrayView';
import UI_Pager from '../../components/container/Pager';
import UI_ModalPagerPage from '../../components/modal/ModalPagerPage';

export default function PG_FuelInput({db, refreshItems}: {db: WebSQLDatabase, refreshItems: () => void}) {
  const [distance, setDistance] = useState<string>('');
  const [consumption, setConsumption] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  function add() {
    if (!(distance && consumption && cost && db !== null)) {
      return;
    }
    const tempDistance = distance;
    const tempConsumption = consumption;
    const tempCost = cost;
    db.transaction(
      (tx) => {
        tx.executeSql(
          'insert into fuelConsumption (distance, consumption, cost, date) values (?, ?, ?, datetime(\'now\', \'localtime\'));',
          [tempDistance, tempConsumption, tempCost]);
        refreshItems();
      }
    );
    setDistance('');
    setConsumption('');
    setCost('');
  }

  return <UI_Pager page={page}>
    {/* Page 1 */}
    <UI_ModalPagerPage controls={<>
      <UI_Button disabled={!(distance && consumption && cost && db !== null)} title={'Überprüfen'} onPress={() => {setPage(1);}} />
    </>}>
      <View style={{gap: BLOCK_SPACING.MD}}>
        <UI_TextInput title={'Distanz'} unit={'km'} setValue={setDistance} value={distance} placeholder={'Distanz'}/>
        <UI_TextInput title={'Verbrauch'} unit={'l'} setValue={setConsumption} value={consumption} placeholder={'Verbrauch'}/>
        <UI_TextInput title={'Kosten'} unit={'€'} setValue={setCost} value={cost} placeholder={'Kosten'}/>
      </View>
    </UI_ModalPagerPage>

    {/* Page 2 */}
    <UI_ModalPagerPage
      controls={<View style={{gap: BLOCK_SPACING.MD}}>
        <UI_Button secondary title={'Back'} onPress={() => {setPage(0);}} />
        <UI_Button disabled={!(distance && consumption && cost && db !== null)} title={'Speichern'} onPress={add} />
      </View>}
    >
      <View style={{gap: BLOCK_SPACING.MD}}>
        <UI_Card>
          <UI_FuelArrayView distance={parseFloat(distance)} consumption={parseFloat(consumption)} cost={parseFloat(cost)} open={true} />
        </UI_Card>
      </View>
    </UI_ModalPagerPage>
  </UI_Pager>;
}