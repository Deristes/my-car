import {View} from 'react-native';
import {BLOCK_SPACING} from '../../../constants/SIZES';
import {COLOR} from '../../../constants/COLORS';


export default function UI_Card({
  children
}:{
  children: JSX.Element
}) {
  return <View style={{
    borderRadius: BLOCK_SPACING.SM,
    backgroundColor: COLOR.BG_NAVBAR,
    padding: BLOCK_SPACING.MD,
  }}
  >{children}</View>;
}