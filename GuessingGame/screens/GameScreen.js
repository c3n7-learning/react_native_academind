import { StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";

export default function GameScreen() {
  return (
    <View style={styles.sceen}>
      <Title>Opponent's Guess</Title>
      <View>
        <Text>Higher or Lower?</Text>
      </View>
      <View>{/* LOG ROUNDS */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  sceen: {
    flex: 1,
    padding: 24,
  },
});
