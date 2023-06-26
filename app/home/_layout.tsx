import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Slot} from 'expo-router';
import {COLOR} from '../../constants/COLORS';
import {BLOCK_SPACING, FONT_SIZE, FONT_WEIGHT} from '../../constants/SIZES';
import UI_Text from '../../ui/components/basic/Text';
import UI_Navbar from '../../ui/components/navbar/Navbar';

export default function HomeLayout() {
  return <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BG_NAVBAR }}>
    <View style={{flex: 1}}>
      <View style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <View style={{flex: 1}}>
        </View>
        <View style={{flex: 1}}>
          <UI_Text
            size={FONT_SIZE.LG}
            weight={FONT_WEIGHT.LG}
            color={COLOR.FONT_PRIMARY}
            padding={BLOCK_SPACING.LG}
            center
          >
            My Car
          </UI_Text>
        </View>
        <View style={{flex: 1}}>
        </View>
      </View>

      <ScrollView style={{backgroundColor: COLOR.BG_PAGE }}>
        <Slot />
      </ScrollView>
      <UI_Navbar />
    </View>
  </SafeAreaView>;
}