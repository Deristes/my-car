import {View, Animated} from 'react-native';
import {useEffect, useRef, useState} from 'react';

export default function UI_Pager({
  children,
  page
}: {
  children: JSX.Element[],
  page: number
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateTo(-page * containerWidth);
  }, [page]);

  function animateTo(toOffset) {
    Animated.timing(offset, {
      toValue: toOffset,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{height: '100%',flexDirection: 'column'}}>
      <View style={{overflow: 'hidden', flex: 1}} onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}>
        <Animated.View style={{flexDirection: 'row', width: containerWidth * children.length, transform: [
          {
            translateX: offset
          }
        ]}}>
          {children.map((child, index) => {
            return <View key={index} style={{width: containerWidth}}>
              {child}</View>;
          })}
        </Animated.View>
      </View>
    </View>
    
  );
}