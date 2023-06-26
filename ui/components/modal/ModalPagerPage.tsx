import {BLOCK_SPACING} from '../../../constants/SIZES';
import {ScrollView, View} from 'react-native';

export default function UI_ModalPagerPage({
  children,
  controls
}: {
  children: JSX.Element | JSX.Element[],
  controls?: JSX.Element | JSX.Element[]
}) {
  return <View style={{
    gap: BLOCK_SPACING.LG,
    height: '100%',
    flexDirection: 'column',
    padding: BLOCK_SPACING.LG
  }}>
    <ScrollView style={{
      gap: BLOCK_SPACING.MD,
      flex: 1
    }}>
      {children}
    </ScrollView>
    <View>
      {controls}
    </View>
  </View>;
}