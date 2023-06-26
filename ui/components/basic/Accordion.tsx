import {useEffect, useState} from 'react';
import {LayoutAnimation, TouchableOpacity, View, StyleSheet} from 'react-native';
import {BLOCK_SPACING} from "../../../constants/SIZES";

export default function Accordion ({
  title,
  children,
  open,
  setOpen,
  activeOpacity
}: {
  title: JSX.Element | JSX.Element[],
  children: JSX.Element | JSX.Element[],
  open?: boolean,
  setOpen?: (boolean) => void,
  activeOpacity?: number
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isOpen, open]);

  const toggleOpen = () => {
    if (open == null) {
      setIsOpen(value => !value);
    }
    if (setOpen != null) {
      setOpen(value => !value);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={toggleOpen} activeOpacity={activeOpacity || 0.6}>
        {title}
      </TouchableOpacity>
      <View style={[styles.list, (open == null && !isOpen) || (open != null && !open) ? styles.hidden : undefined]}>
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden'
  },
});
