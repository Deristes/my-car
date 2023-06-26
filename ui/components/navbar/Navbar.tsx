import {TouchableOpacity, View} from 'react-native';
import {BLOCK_SPACING, FONT_SIZE} from '../../../constants/SIZES';
import UI_Text from '../basic/Text';
import {useRouter, useSegments} from 'expo-router';
import {MaterialIcons} from '@expo/vector-icons';
import {COLOR} from '../../../constants/COLORS';

export default function UI_Navbar() {
  const router = useRouter();
  const segments = useSegments();

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
      <TouchableOpacity style={{flex: 1, padding: BLOCK_SPACING.LG, justifyContent: 'center', alignItems: 'center'}}>
        <UI_Text center>Wartung</UI_Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {router.push('/home/');}} style={{flex: 1, padding: BLOCK_SPACING.LG, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', opacity: segments.includes('home') ? 1 : 0}}>
          <View style={{width: FONT_SIZE.XL + 10, height: FONT_SIZE.XL + 10, backgroundColor: COLOR.BTN_COLOR, borderRadius: FONT_SIZE.XL}}></View>
        </View>
        <MaterialIcons name="home" size={FONT_SIZE.XL} color={COLOR.FONT_PRIMARY} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {router.push('/fuel/');}} style={{flex: 1, padding: BLOCK_SPACING.LG, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', opacity: segments.includes('fuel') ? 1 : 0}}>
          <View style={{width: FONT_SIZE.XL + 10, height: FONT_SIZE.XL + 10, backgroundColor: COLOR.BTN_COLOR, borderRadius: FONT_SIZE.XL}}></View>
        </View>
        <MaterialIcons name="local-gas-station" size={FONT_SIZE.XL} color={COLOR.FONT_PRIMARY} />
      </TouchableOpacity>
    </View>
  );
}