import UI_Row from '../container/Row';
import {View} from 'react-native';
import UI_Text from '../basic/Text';
import {BLOCK_SPACING, FONT_SIZE} from '../../../constants/SIZES';
import Accordion from '../basic/Accordion';
import {useState} from 'react';
import {toDecimals} from '../../../utils/format/formatNumbers';
import GasStationClass from '../../../utils/fuelApi/gasStation.class';
import {Image} from 'expo-image';
import UI_FuelStation from "./FuelStation";

export default function UI_FuelArrayView({
  distance,
  consumption,
  cost,
  open,
  station
}: {
  distance: number,
  consumption: number,
  cost: number,
  open?: boolean,
  station?: GasStationClass
}) {
  
  const [isOpen, setOpen] = useState<boolean>(false);

  return <Accordion 
    open={(open != null && open) || (open == null && isOpen)}
    setOpen={setOpen}
    activeOpacity={1}
    title={
      <UI_Row>
        <View style={{flex: 1}}>
          <UI_Text size={FONT_SIZE.XL} center>{toDecimals(distance)}</UI_Text>
          <UI_Text size={FONT_SIZE.XS} center>km</UI_Text>
        </View>
        <View style={{flex: 1}}>
          <UI_Text size={FONT_SIZE.XL} center>{toDecimals(consumption / distance * 100)}</UI_Text>
          <UI_Text size={FONT_SIZE.XS} center>l / 100km</UI_Text>
        </View>
        <View style={{flex: 1}}>
          <UI_Text size={FONT_SIZE.XL} center>{toDecimals(cost)}</UI_Text>
          <UI_Text size={FONT_SIZE.XS} center>Euro</UI_Text>
        </View>
      </UI_Row>
    } >
    <View style={{paddingTop: BLOCK_SPACING.LG}}>
      <UI_Row>
        <View style={{flex: 1}}>
          <UI_Text size={FONT_SIZE.XL} center>{toDecimals(cost/ consumption)}</UI_Text>
          <UI_Text size={FONT_SIZE.XS} center>€ / l</UI_Text>
        </View>
        <View style={{flex: 1}}>
          <UI_Text size={FONT_SIZE.XL} center>{toDecimals(consumption)}</UI_Text>
          <UI_Text size={FONT_SIZE.XS} center>Liter</UI_Text>
        </View>
        <View style={{flex: 1}}>
          <UI_Text size={FONT_SIZE.XL} center>{toDecimals(cost / distance * 100)}</UI_Text>
          <UI_Text size={FONT_SIZE.XS} center>€ / 100km</UI_Text>
        </View>
      </UI_Row>
      {station == null ? <></> : <View style={{padding: BLOCK_SPACING.MD, paddingTop: BLOCK_SPACING.LG}}><UI_FuelStation station={station} /></View>}
    </View>
  </Accordion>;
}