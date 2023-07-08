import {useEffect, useState} from "react";
import {GasStation, getAddress, getImagePath, getNearestGasStation, streamlineName} from "../../../utils/fuelApi";
import * as Location from "expo-location";
import {View} from "react-native";
import UI_Card from "../container/Card";
import UI_Text from "../basic/Text";
import {BLOCK_SPACING, FONT_SIZE} from "../../../constants/SIZES";
import {Image} from "expo-image";


export default function UI_NearestStation() {
  const [station, setStation] = useState<GasStation | null>(null);

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
      <View style={{
        flexDirection: 'row',
        gap: BLOCK_SPACING.MD
      }}>
        <View style={{flex:1}}>
          <Image
            source={getImagePath(station)}
            contentFit="contain"
            transition={200}
            style={{
              flex: 1
            }}
          />
        </View>
        <View style={{flex:6}}>
          <UI_Text>{streamlineName(station)}</UI_Text>
          <UI_Text size={FONT_SIZE.SM}>{getAddress(station)}</UI_Text>
        </View>
      </View>
    </View>

  </UI_Card>;
}