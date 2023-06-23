import {BLOCK_SPACING, FONT_SIZE, FONT_WEIGHT} from '../../../constants/SIZES';
import {COLOR} from '../../../constants/COLORS';
import {TextInput, View} from 'react-native';
import UI_Text from './Text';


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
    placeholder,
    title,
    unit
  }: {
    size?: FONT_SIZE,
    weight?: FONT_WEIGHT,
    color?: COLOR,
    margin?: BLOCK_SPACING | number,
    setValue: (string) => void,
    onSubmit?: () => void,
    value: string,
    type?: 'number',
    placeholder?: string,
    title?: string,
    unit?: string
  }) {

  return <View style={{
    margin: margin || 0,
  }}>
    {title ? <UI_Text color={COLOR.FONT_SECONDARY}>{title}</UI_Text> : <></>}
    <View style={{
      padding: BLOCK_SPACING.MD,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: COLOR.BG_NAVBAR,
      borderRadius: BLOCK_SPACING.MD,
    }}>
      <TextInput
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
          flex: 1
        }}
        placeholderTextColor = {COLOR.FONT_PLACEHOLDER}
        placeholder = {placeholder || ''}
        value = {value}
      />
      <UI_Text right size={FONT_SIZE.SM} padding={BLOCK_SPACING.SM}>{unit}</UI_Text>
    </View>
  </View>;
}

