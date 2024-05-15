import { createContext, useReducer } from "react";

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
    date: new Date("2024-05-13"),
  },
  {
    id: "e9",
    description: "A Book",
    amount: 14.99,
    date: new Date("2024-05-14"),
  },
  {
    id: "e10",
    description: "Another Book",
    amount: 18.59,
    date: new Date("2024-05-15"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      const itemId = state.findIndex((item) => item.id === action.payload.id);

      const currentExpense = state[itemId];
      const updatedExpense = { ...currentExpense, ...action.payload.data };

      const updatedExpenses = [...state];
      updatedExpenses[itemId] = updatedExpense;

      return updatedExpenses;
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
