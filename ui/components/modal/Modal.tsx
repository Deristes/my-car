import {Modal, View} from 'react-native';
import {COLOR} from '../../../constants/COLORS';
import UI_ModalHeader from './ModalHeader';

export default function UI_Modal({
  setOpen,
  open,
  children,
  title
}:{
  setOpen: (open: boolean) => void,
  open: boolean,
  children: JSX.Element,
  title: string
  }) {
  return <Modal
    animationType="slide"
    transparent={false}
    visible={open}
    presentationStyle="pageSheet"
    onRequestClose={() => {
      setOpen(false);
    }}
  >
    <View style={{
      backgroundColor: COLOR.BG_PAGE,
      flex: 1
    }}>
      <UI_ModalHeader close={() => {setOpen(false);}} title={title} />
      <View style={{flex: 1}}>
        {children}
      </View>
    </View>
  </Modal>;
}