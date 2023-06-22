import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import {COLOR} from "../constants/COLORS";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
      <Link href="/home/">Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: COLOR.FONT_PRIMARY
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
