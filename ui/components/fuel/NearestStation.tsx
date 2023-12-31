import {useEffect, useState} from 'react';
import {getNearestGasStation} from '../../../utils/fuelApi/fuelApi';
import * as Location from 'expo-location';
import {View} from 'react-native';
import UI_Card from '../container/Card';
import UI_Text from '../basic/Text';
import {BLOCK_SPACING, FONT_SIZE} from '../../../constants/SIZES';
import {Image} from 'expo-image';
import GasStationClass from '../../../utils/fuelApi/gasStation.class';
import UI_FuelStation from "./FuelStation";


export default function UI_NearestStation() {
  const [station, setStation] = useState<GasStationClass | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setStation(await getNearestGasStation(location.coords.latitude, location.coords.longitude));
    })();
  }, []);

  if (station == null) {
    return <></>;
  }

  return <UI_Card>
    <View style={{
      gap: BLOCK_SPACING.MD
    }}>
      <View style={{
        flexDirection: 'row',
        gap: BLOCK_SPACING.MD
      }}>
        <View style={{flex: 1}}><UI_Text>Nächste Tankstelle:</UI_Text></View>
        <View style={{flex: 1}}><UI_Text right>{`${station.dist} km`}</UI_Text></View>
      </View>
      <UI_FuelStation station={station} />
    </View>
  </UI_Card>;
}