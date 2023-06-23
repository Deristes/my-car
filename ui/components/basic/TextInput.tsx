import {BLOCK_SPACING, FONT_SIZE, FONT_WEIGHT} from '../../../constants/SIZES';
import {COLOR} from '../../../constants/COLORS';
import {TextInput} from 'react-native';


export default function UI_TextInput(
  {
    size = FONT_SIZE.MD,
    weight = FONT_WEIGHT.MD,
    color = COLOR.FONT_PRIMARY,
    margin = 0,
    setValue,
    onSubmit,
    value,
    type,
    placeholder
  }: {
    size?: FONT_SIZE,
    weight?: FONT_WEIGHT,
    color?: COLOR,
    margin?: BLOCK_SPACING | number,
    setValue: (string) => void,
    onSubmit?: () => void,
    value: string,
    type?: 'number',
    placeholder?: string
  }) {
  return <TextInput
    onChangeText = { (text) => {
      if (type === 'number') {
        setValue(text.replace(/[^0-9]/g, ''));
      } else {
        setValue(text);
      }
    }}
    keyboardType = {'numeric'}
    onSubmitEditing = {onSubmit}
    style = {{
      fontSize: size || FONT_SIZE.MD,
      fontWeight: weight || FONT_WEIGHT.MD,
      color: color || COLOR.FONT_PRIMARY,
      margin: margin || 0,
      backgroundColor: COLOR.BG_NAVBAR,
      borderRadius: BLOCK_SPACING.SM
    }}
    placeholder = {placeholder || ''}
    value = {value}
  />;
}