import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface ExpenseContextType {
  expenseData: any[];
  setExpenseData: React.Dispatch<React.SetStateAction<any[]>>; // Replace `any[]` with the correct type for your expense data
  getExpenses: () => Promise<void>;
  loading: boolean;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ExpenseProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getExpenses = async () => {
    setLoading(true);
    const minimumLoadingTime = 1000;
    const startTime = Date.now();

    try {
      const response = await fetch(`${API_URL}/expenses/my-expenses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("kharcha_token")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setExpenseData(data.data);
      } else {
        console.error("Error fetching expenses:", data.error);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }

    // Ensure the loading state remains for at least 5 seconds
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(minimumLoadingTime - elapsedTime, 0);

    setTimeout(() => {
      setLoading(false);
    }, remainingTime);
  };

  useEffect(() => {
    getExpenses(); // Fetch expenses on mount
  }, []);

  return (
    <ExpenseContext.Provider value={{ expenseData, setExpenseData, getExpenses, loading }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
