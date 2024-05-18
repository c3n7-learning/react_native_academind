import axios from "axios";
import { FirebaseConfig } from "./firebase.config";

export function storeExpense(expenseData) {
  axios.post(`${FirebaseConfig.url}/expenses.json`, expenseData);
}
