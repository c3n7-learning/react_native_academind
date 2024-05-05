import { Text, View } from "react-native";

export default function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <View>
      <Text>{preriodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
