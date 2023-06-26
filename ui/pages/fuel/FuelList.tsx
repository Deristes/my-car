import UI_Text from '../../components/basic/Text';
import {COLOR} from '../../../constants/COLORS';
import UI_FuelArrayView from '../../components/fuel/FuelArrayView';
import UI_Card from '../../components/container/Card';
import {BLOCK_SPACING, FONT_SIZE} from '../../../constants/SIZES';

export interface fuelListEntry {
  distance: number,
  consumption: number,
  cost: number,
  date: Date
}

export default function PG_FuelList({list}: {list: fuelListEntry[]}): JSX.Element {
  let lastDate:Date | null = null;

  return <>{list.map((element, index) => {
    let d = <></>;
    const newDate = new Date(element.date);
    if (lastDate === null || lastDate.getMonth() !== newDate.getMonth()) {
      d = <UI_Text key={`date_${index}`}>{newDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</UI_Text>;
    }
    lastDate = newDate;
    return (
      <>
        {d}
        <UI_Card key={index}>
          <UI_Text size={FONT_SIZE.XS} color={COLOR.FONT_SECONDARY}>{new Date(element.date).toLocaleString()}</UI_Text>
          <UI_FuelArrayView distance={element.distance} consumption={element.consumption} cost={element.cost} />
        </UI_Card>
      </>
    );
  })}</>;
}