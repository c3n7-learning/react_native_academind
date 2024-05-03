import { StyleSheet, Text } from "react-native";

export default function MealDetailScreen({ route }) {
  const mealId = route.params.mealId;

  return <Text>This is the Meal Detail Screen {mealId}.</Text>;
}

const styles = StyleSheet.create({});
