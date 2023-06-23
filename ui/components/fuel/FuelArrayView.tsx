import UI_Row from '../container/Row';
import {View} from 'react-native';
import UI_Text from '../basic/Text';
import {FONT_SIZE} from '../../../constants/SIZES';


export default function UI_FuelArrayView({
  distance,
  consumption,
  cost
}: {
  distance: number,
  consumption: number,
  cost: number
}) {

  const outDistance = isNaN(distance) ? '-' : distance + '';
  const consumptionPerDistance = (consumption / distance * 100);
  const consumptionPerDistanceInt = Math.trunc(consumptionPerDistance);
  const outConsumptionPerDistance = (isNaN(consumptionPerDistance) ? '-' :
    consumptionPerDistanceInt + ',' + Math.trunc((consumptionPerDistance - consumptionPerDistanceInt) * 100)
  );
  const outCost = isNaN(cost) ? '-' : cost + '';

  return <UI_Row>
    <View style={{flex: 1}}>
      <UI_Text size={FONT_SIZE.XL} center>{outDistance}</UI_Text>
      <UI_Text size={FONT_SIZE.XS} center>km</UI_Text>
    </View>
    <View style={{flex: 1}}>
      <UI_Text size={FONT_SIZE.XL} center>{outConsumptionPerDistance}</UI_Text>
      <UI_Text size={FONT_SIZE.XS} center>l/100km</UI_Text>
    </View>
    <View style={{flex: 1}}>
      <UI_Text size={FONT_SIZE.XL} center>{outCost}</UI_Text>
      <UI_Text size={FONT_SIZE.XS} center>Euro</UI_Text>
    </View>
  </UI_Row>;

}