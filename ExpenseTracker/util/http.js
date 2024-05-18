import axios from "axios";
import { FirebaseConfig } from "./firebase.config";

const BACKEND_URL = FirebaseConfig.url;

export async function storeExpense(expenseData) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];
  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }

  return expenses;
}
