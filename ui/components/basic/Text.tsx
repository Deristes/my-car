import {BLOCK_SPACING, FONT_SIZE, FONT_WEIGHT} from "../../../constants/SIZES";
import {Text} from "react-native";
import {Link} from "expo-router";
import {COLOR} from "../../../constants/COLORS";

export default function UI_Text(
  {
    children,
    size = FONT_SIZE.MD,
    weight = FONT_WEIGHT.MD,
    color = COLOR.FONT_PRIMARY,
    padding = 0,
    margin = 0,
    center = false,
    right = false,
    href
  }: {
    children: string,
    size?: FONT_SIZE,
    weight?: FONT_WEIGHT,
    color?: COLOR,
    padding?: BLOCK_SPACING | number,
    margin?: BLOCK_SPACING | number,
    center?: boolean,
    right?: boolean,
    href?: string
  }) {
  if (href != null) {
    return <Link
      href={href}
      style={{
        fontSize: size,
        fontWeight: weight,
        color: color,
        padding: padding,
        margin: margin,
        textAlign: center ? "center" : right ? "right" : "left"
      }}
    >{children}</Link>
  }
  return <Text style={{
    fontSize: size,
    fontWeight: weight,
    color: color,
    padding: padding,
    margin: margin,
    textAlign: center ? "center" : right ? "right" : "left"
  }}>{children}</Text>
}