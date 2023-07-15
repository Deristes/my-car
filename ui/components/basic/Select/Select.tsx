import {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import UI_Text from '../Text';
import {BLOCK_SPACING} from '../../../../constants/SIZES';
import {COLOR} from '../../../../constants/COLORS';
import UI_SelectItem from './SelectItem';
import UI_CenterModal from '../../modal/CenterModal';

export interface UI_I_SelectItem {
  value: string | number,
  label: string,
  element?: JSX.Element
}


export default function UI_Select({
  data,
  margin = 0,
  title,
  selected,
  setSelected
}: {
  data: UI_I_SelectItem[],
  margin?: BLOCK_SPACING | number,
  title?: string,
  selected: string | number,
  setSelected: (s: string | number) => void
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View style={{
      margin: margin || 0,
      gap: BLOCK_SPACING.MD
    }}>
      {title ? <UI_Text color={COLOR.FONT_SECONDARY}>{title}</UI_Text> : <></>}
      <TouchableOpacity onPress={() => {
        setOpen((prev) => !prev);
      }} style={{
        padding: BLOCK_SPACING.MD,
        backgroundColor: COLOR.BG_NAVBAR,
        borderRadius: BLOCK_SPACING.MD,
      }} activeOpacity={1}>
        {
          selected == null
            ? <UI_Text>Select item</UI_Text>
            : <UI_SelectItem item={data.find(e => e.value == selected)} />
        }
      </TouchableOpacity>
      <UI_CenterModal open={open} setOpen={setOpen} title={'Tankstelle'}>
        <ScrollView style={{
          padding: BLOCK_SPACING.SM,
          gap: BLOCK_SPACING.SM,
          flexGrow: 0,
          maxHeight: 300
        }}>
          {data.map(e => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelected(e.value);
                  setOpen(false);
                }}
                activeOpacity={1}
                key={e.value}
                style={{
                  padding: BLOCK_SPACING.SM
                }}
              >
                {
                  e.element
                    ? e.element
                    : <UI_Text>
                      {e.label}
                    </UI_Text>
                }
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </UI_CenterModal>
    </View>
  );
}