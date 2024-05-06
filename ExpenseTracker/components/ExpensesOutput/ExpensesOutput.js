import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 89.99,
    date: new Date("2023-11-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 59.99,
    date: new Date("2023-12-1"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2023-12-5"),
  },
  {
    id: "e4",
    description: "A Book",
    amount: 14.99,
    date: new Date("2023-12-9"),
  },
  {
    id: "e5",
    description: "Another Book",
    amount: 18.59,
    date: new Date("2023-12-12"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 89.99,
    date: new Date("2023-11-19"),
  },
  {
    id: "e7",
    description: "A pair of trousers",
    amount: 59.99,
    date: new Date("2023-12-1"),
  },
  {
    id: "e8",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2023-12-5"),
  },
  {
    id: "e9",
    description: "A Book",
    amount: 14.99,
    date: new Date("2023-12-9"),
  },
  {
    id: "e10",
    description: "Another Book",
    amount: 18.59,
    date: new Date("2023-12-12"),
  },
];

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
