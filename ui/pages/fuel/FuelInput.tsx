import {useEffect, useState} from 'react';
import {View} from 'react-native';
import UI_TextInput from '../../components/basic/TextInput';
import {BLOCK_SPACING, FONT_SIZE} from '../../../constants/SIZES';
import UI_Button from '../../components/basic/Button';
import UI_Card from '../../components/container/Card';
import UI_FuelArrayView from '../../components/fuel/FuelArrayView';
import UI_Pager from '../../components/container/Pager';
import UI_ModalPagerPage from '../../components/modal/ModalPagerPage';
import {useDb} from '../../../app/_layout';
import { Image } from 'expo-image';

import * as Location from 'expo-location';
import UI_Text from '../../components/basic/Text';
import {getNearestGasStations} from '../../../utils/fuelApi/fuelApi';
import UI_Select, {UI_I_SelectItem} from '../../components/basic/Select/Select';
import GasStationClass from '../../../utils/fuelApi/gasStation.class';
import {saveFuelEntry} from '../../../utils/fuelApi/fuelDbStorage';

function gasStationSelectList(stations: GasStationClass[]): UI_I_SelectItem[] {
  return stations.map((e) => {
    return {
      value: e.id,
      label: e.name,
      element: <View style={{
        flexDirection: 'row',
        gap: BLOCK_SPACING.MD
      }}>
        <View style={{flex:1}}>
          <Image
            source={e.getImage()}
            contentFit="contain"
            transition={200}
            style={{
              flex: 1
            }}
          />
        </View>
        <View style={{flex:6}}>
          <UI_Text>{e.getStreamlinedName()}</UI_Text>
          <UI_Text size={FONT_SIZE.SM}>{e.getAdress()}</UI_Text>
        </View>
      </View>
    };
  });
}

export default function PG_FuelInput({refreshItems}: {refreshItems: () => void}) {
  const [distance, setDistance] = useState<string>('');
  const [consumption, setConsumption] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  const db = useDb();

  const [nearestStations, setNearestStations] = useState<GasStationClass[]>([]);
  const [selectedStation, setSelectedStation] = useState<number | string | null>(null);

  useEffect(() => {
    (async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const nStations = await getNearestGasStations(location.coords.latitude, location.coords.longitude);
      setNearestStations(nStations);
      if (nStations.length > 0) {
        setSelectedStation(nStations[0].id);
      }
    })();
  }, []);

  function add() {
    if (!(distance && consumption && cost && db !== null)) {
      return;
    }
    saveFuelEntry(
      db,
      parseFloat(distance),
      parseFloat(consumption),
      parseFloat(cost),
      nearestStations.find((e) => e.id === selectedStation)
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

        <UI_Select selected={selectedStation} setSelected={setSelectedStation} data={gasStationSelectList(nearestStations)} title={'Tankstelle'}/>
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
          <UI_FuelArrayView
            distance={parseFloat(distance)}
            consumption={parseFloat(consumption)}
            cost={parseFloat(cost)}
            open={true}
            station={nearestStations.find((e) => e.id === selectedStation)}
          />
        </UI_Card>
      </View>
    </UI_ModalPagerPage>
  </UI_Pager>;
}