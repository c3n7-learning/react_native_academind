import axios from "axios";
import { FirebaseConfig } from "./firebase.config";

const BACKEND_URL = FirebaseConfig.url;

export function storeExpense(expenseData) {
  axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
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
