import {TouchableOpacity, View} from 'react-native';
import UI_Text from '../basic/Text';
import {BLOCK_SPACING, FONT_SIZE, FONT_WEIGHT} from '../../../constants/SIZES';
import {COLOR} from '../../../constants/COLORS';
import { AntDesign } from '@expo/vector-icons';

export default function UI_ModalHeader({
  close,
  title,
  small = false
}:{
  close: () => void,
  title: string,
  small?: boolean
}) {
  return <View style={{
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLOR.BG_NAVBAR
  }}>
    <View style={{flex: 1}}>
    </View>
    <View style={{flex: 3}}>
      <UI_Text
        size={small ? FONT_SIZE.MD : FONT_SIZE.LG}
        weight={small ? FONT_WEIGHT.MD : FONT_WEIGHT.LG}
        color={COLOR.FONT_PRIMARY}
        padding={small ? BLOCK_SPACING.MD : BLOCK_SPACING.LG}
        center
      >
        {title}
      </UI_Text>
    </View>
    <View style={{flex: 1}}>
      <TouchableOpacity style={{
        padding: small ? BLOCK_SPACING.MD : BLOCK_SPACING.LG,
        alignItems: 'flex-end'
      }} onPress={close}>
        <AntDesign name="close" size={small ? 20 : 24} color={COLOR.FONT_PRIMARY} />
      </TouchableOpacity>
    </View>
  </View>;
}