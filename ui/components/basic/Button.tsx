import {TouchableOpacity} from 'react-native';
import {COLOR} from '../../../constants/COLORS';
import UI_Text from './Text';
import {BLOCK_SPACING, FONT_SIZE, FONT_WEIGHT} from '../../../constants/SIZES';

export default function UI_Button({
  title,
  onPress,
  secondary,
  disabled
}: {
  title?: string,
  onPress: () => void,
  secondary?: boolean,
  disabled?: boolean
}) {
  return <TouchableOpacity style={{
    backgroundColor: secondary ? COLOR.BG_NAVBAR : COLOR.BTN_COLOR,
    borderColor: COLOR.BTN_COLOR,
    borderStyle: 'solid',
    borderWidth: 1,
    opacity: disabled ? 0.4 : 1,
    padding: BLOCK_SPACING.LG,
    borderRadius: BLOCK_SPACING.MD,
  }}
  disabled={disabled}
  onPress={onPress}
  activeOpacity = {0.6}
  >
    <UI_Text center weight={FONT_WEIGHT.LG} size={FONT_SIZE.LG}>
      {title}
    </UI_Text>
  </TouchableOpacity>;
}