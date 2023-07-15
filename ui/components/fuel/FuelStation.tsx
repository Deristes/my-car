import GasStationClass from '../../../utils/fuelApi/gasStation.class';
import {BLOCK_SPACING, FONT_SIZE} from '../../../constants/SIZES';
import {View} from 'react-native';
import {Image} from 'expo-image';
import UI_Text from '../basic/Text';

export default function UI_FuelStation({
  station
}: {
  station: GasStationClass
}) {
  return (
    <View style={{
      flexDirection: 'row',
      gap: BLOCK_SPACING.MD,
    }}>
      <View style={{flex:1}}>
        <Image
          source={station.getImage()}
          contentFit="contain"
          transition={200}
          style={{
            flex: 1
          }}
        />
      </View>
      <View style={{flex:6}}>
        <UI_Text>{station.getStreamlinedName()}</UI_Text>
        <UI_Text size={FONT_SIZE.SM}>{station.getAdress()}</UI_Text>
      </View>
    </View>
  );
}