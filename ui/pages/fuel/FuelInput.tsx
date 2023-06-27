import {useEffect, useState} from 'react';
import {type WebSQLDatabase} from 'expo-sqlite';
import {View} from 'react-native';
import UI_TextInput from '../../components/basic/TextInput';
import {BLOCK_SPACING, FONT_SIZE, FONT_WEIGHT} from '../../../constants/SIZES';
import UI_Button from '../../components/basic/Button';
import UI_Card from '../../components/container/Card';
import UI_FuelArrayView from '../../components/fuel/FuelArrayView';
import UI_Pager from '../../components/container/Pager';
import UI_ModalPagerPage from '../../components/modal/ModalPagerPage';
import {useDb} from '../../../app/_layout';

import * as Location from 'expo-location';
import UI_Text from '../../components/basic/Text';
import {type GasStation, getNearestGasStation} from '../../../utils/fuelApi';

export default function PG_FuelInput({refreshItems}: {refreshItems: () => void}) {
  const [distance, setDistance] = useState<string>('');
  const [consumption, setConsumption] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  const db = useDb();

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [nearestStation, setNearestStation] = useState<GasStation | null>(null);

  useEffect(() => {
    (async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const nStation = await getNearestGasStation(location.coords.latitude, location.coords.longitude);
      setNearestStation(nStation);
    })();
  }, []);

  function add() {
    if (!(distance && consumption && cost && db !== null)) {
      return;
    }
    const tempDistance = distance;
    const tempConsumption = consumption;
    const tempCost = cost;

    db.executeQuery(
      'insert into fuelConsumption (distance, consumption, cost, date) values (?, ?, ?, datetime(\'now\', \'localtime\'));',
      [tempDistance, tempConsumption, tempCost]
    ).then(() => {
      refreshItems();
      setDistance('');
      setConsumption('');
      setCost('');
    });
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
        {
          nearestStation != null ?
            <UI_Card>
              <UI_Text size={FONT_SIZE.LG} weight={FONT_WEIGHT.LG}>Tankstelle</UI_Text>
              <UI_Text>{nearestStation.name}</UI_Text>
              <UI_Text weight={FONT_WEIGHT.SM} size={FONT_SIZE.SM}>{nearestStation.brand}</UI_Text>
            </UI_Card>
            :
            <></>
        }
      </View>
    </UI_ModalPagerPage>
  </UI_Pager>;
}