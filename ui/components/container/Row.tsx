import {BLOCK_SPACING} from '../../../constants/SIZES';
import {View} from 'react-native';

export default function UI_Row({
  children
}:{
  children: JSX.Element | JSX.Element[]
}) {
  return <View style={{
    display: 'flex',
    flexDirection: 'row',
    gap: BLOCK_SPACING.MD
  }}
  >{children}</View>;
}