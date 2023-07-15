import {Modal, Touchable, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {COLOR} from '../../../constants/COLORS';
import {BLOCK_SPACING} from '../../../constants/SIZES';
import UI_ModalHeader from './ModalHeader';


export default function UI_CenterModal ({
  open,
  setOpen,
  title,
  children
} : {
  open: boolean,
  setOpen: (boolean) => void,
  title?: string,
  children: JSX.Element | JSX.Element[]
}) {
  return <Modal
    visible={open}
    transparent
    animationType={'fade'}
    onDismiss={() => setOpen(false)}
    onRequestClose={() => setOpen(false)}
  >
    <TouchableWithoutFeedback
      onPress={() => setOpen(false)}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: BLOCK_SPACING.MD,
          flexDirection: 'row'
        }}>
        <TouchableWithoutFeedback>
          <View style={{
            overflow: 'hidden',
            borderRadius: BLOCK_SPACING.MD,
            backgroundColor: COLOR.BG_PAGE,
            flex: 1,
            borderColor: COLOR.BTN_COLOR,
            borderStyle: 'solid',
            borderWidth: 1,
          }}>
            <UI_ModalHeader small close={() => setOpen(false)} title={title}></UI_ModalHeader>
            {children}
          </View>
        </TouchableWithoutFeedback>

      </View>
    </TouchableWithoutFeedback>

  </Modal>;
}