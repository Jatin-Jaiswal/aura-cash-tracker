import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  amount: number;
  reason: string;
  date: string;
  type: 'add' | 'deduct';
}

export interface User {
  id: string;
  name: string;
  balance: number;
  transactions: Transaction[];
}

const STORAGE_KEY = 'money-manager-users';

export const useUserManager = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem(STORAGE_KEY);
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Error loading users from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const addUser = (name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      balance: 0,
      transactions: [],
    };
    setUsers(prev => [...prev, newUser]);
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const addTransaction = (userId: string, amount: number, reason: string, type: 'add' | 'deduct') => {
    const transaction: Transaction = {
      id: Date.now().toString(),
      amount,
      reason,
      date: new Date().toISOString(),
      type,
    };

    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        const balanceChange = type === 'add' ? amount : -amount;
        return {
          ...user,
          balance: user.balance + balanceChange,
          transactions: [transaction, ...user.transactions],
        };
      }
      return user;
    }));
  };

  return {
    users,
    addUser,
    deleteUser,
    addTransaction,
  };
};