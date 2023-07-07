import {UI_I_SelectItem} from './Select';
import UI_Text from '../Text';


export default function UI_SelectItem ({item} : {item: UI_I_SelectItem}) {
  if (item == null) {
    return <UI_Text>Select item</UI_Text>;
  }
  if (item.element == null) {
    return <UI_Text>{item.label}</UI_Text>;
  }
  return item.element;
}