import {TouchableOpacity, View} from 'react-native';
import UI_Text from '../basic/Text';
import {BLOCK_SPACING, FONT_SIZE, FONT_WEIGHT} from '../../../constants/SIZES';
import {COLOR} from '../../../constants/COLORS';
import { AntDesign } from '@expo/vector-icons';

export default function UI_ModalHeader({
  close,
  title
}:{
  close: () => void,
  title: string
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
        size={FONT_SIZE.LG}
        weight={FONT_WEIGHT.LG}
        color={COLOR.FONT_PRIMARY}
        padding={BLOCK_SPACING.LG}
        center
      >
        {title}
      </UI_Text>
    </View>
    <View style={{flex: 1}}>
      <TouchableOpacity style={{padding: BLOCK_SPACING.LG, alignItems: 'flex-end'}} onPress={close}>
        <AntDesign name="close" size={24} color={COLOR.FONT_PRIMARY} />
      </TouchableOpacity>
    </View>
  </View>;
}