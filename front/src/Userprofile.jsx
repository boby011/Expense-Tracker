import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Userprofile = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const incomeResponse = await axios.get('http://localhost:3000/user/income', {
          headers: {
            Authorization: `Bearer ${token}`}
        });
        setIncome(incomeResponse.data.income || []);
        const expensesResponse = await axios.get('http://localhost:3000/user/income-expenses', {
          headers: {
            Authorization: `Bearer ${token}`
          }  });
        setExpenses(expensesResponse.data.expenses || []);
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      } };
    fetchData();
  }, []);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const totalIncome = income.reduce((total, inc) => total + inc.amount, 0);
  const remainingBalance = totalIncome - totalExpenses;

  return (
    <div>
      <h1 className="text-3xl mb-4 text-center">Monthly Dashboard</h1>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div>
            <div>
              <h2 className="text-xl font-bold">Total Income</h2>
              <p className="text-2xl">Rs {totalIncome}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">Total Expenses</h2>
              <p className="text-2xl">Rs {totalExpenses}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">Remaining Budget</h2>
              <p className="text-2xl">Rs {remainingBalance}</p>
            </div></div>
        </>
      )} </div>
  );
};
export default Userprofile;
