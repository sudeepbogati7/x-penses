import React, { createContext, useContext } from "react";

interface ExpenseContextType {
  expenseData: any[]; // Replace `any[]` with the correct type for your expense data
  getExpenses: () => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children, expenseData, getExpenses }: any) => (
  <ExpenseContext.Provider value={{ expenseData, getExpenses }}>
    {children}
  </ExpenseContext.Provider>
);

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
