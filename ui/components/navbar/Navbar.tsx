import {View} from 'react-native';
import {BLOCK_SPACING} from '../../../constants/SIZES';
import UI_Text from '../basic/Text';

export default function UI_Navbar() {
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
      <View style={{flex: 1, padding: BLOCK_SPACING.LG}}>
        <UI_Text center>Wartung</UI_Text>
      </View>
      <View style={{flex: 1, padding: BLOCK_SPACING.LG}}>
        <UI_Text center href={'/home/'}>Übersicht</UI_Text>
      </View>
      <View style={{flex: 1, padding: BLOCK_SPACING.LG}}>
        <UI_Text center href={'/fuel/'}>Spritt</UI_Text>
      </View>
    </View>
  );
}