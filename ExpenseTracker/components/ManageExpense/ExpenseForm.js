import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
  const [inputValue, setInputValues] = useState({
    amount: defaultValues?.amount?.toString() ?? "",
    date: defaultValues?.date?.toISOString()?.slice(0, 10) ?? "",
    description: defaultValues?.description ?? "",
  });

  function inputChangedHandler(inputIdentifier, enteredText) {
    setInputValues((current) => ({
      ...current,
      [inputIdentifier]: enteredText,
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValue.amount,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValue.date,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: "sentences"
          // autoCorrect: false,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValue.description,
        }}
      />

      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
