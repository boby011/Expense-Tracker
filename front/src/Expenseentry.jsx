import React, { useState } from 'react';
import axios from 'axios';
const ExpenseEntry = () => {
    const [description, setDescription] = useState('  ');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [error, setError] = useState('');

    const [incomeSource, setIncomeSource] = useState('');
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [incomeDate, setIncomeDate] = useState(new Date().toISOString().substring(0, 10));
    const [incomeError, setIncomeError] = useState('');
    const handleExpense = async (e) => {
        e.preventDefault();
        const selectedDate = new Date(date);
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        if (selectedDate.getMonth() !== currentMonth || selectedDate.getFullYear() !== currentYear) {
            setError('Enter date within the current month');
            return;
        }
        setError('');
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/add-expense', {
                description,
                amount,
                date
            }, { headers: { Authorization: `Bearer ${token}` } });
            setDescription('');
            setAmount(0);
            setDate(new Date().toISOString().substring(0, 10));
        } catch (error) {
            console.error('Error', error);
            setError('Failed to add expense');
        } };
    const handleIncome = async (e) => {
        e.preventDefault();
        const selectedDate = new Date(incomeDate);
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        if (selectedDate.getMonth() !== currentMonth || selectedDate.getFullYear() !== currentYear) {
            setIncomeError('Enter date within the current month');
            return;
        }
        setIncomeError('');
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/add-income', {
                source: incomeSource,
                amount: incomeAmount,
                date: incomeDate
            }, { headers: { Authorization: `Bearer ${token}` } });
            setIncomeSource('');
            setIncomeAmount(0);
            setIncomeDate(new Date().toISOString().substring(0, 10));
        } catch (error) {
            console.error('Error', error);
            setIncomeError('Failed to add income');
        }
    };
    return (
        <div className="my-4 center">
            <form onSubmit={handleExpense} className="mb-8">
                <h2 className="text-2xl mb-4">Add Expense</h2>
                {error && <p>{error}</p>}
                <div>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="Expense Description"
                        required
                    />
                </div>
                <div>
                    <input type="number" value={amount}onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        required
                    />
                </div>
                <div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-black text-white p-2 rounded">
                    Add Expense</button>
            </form>
            <form onSubmit={handleIncome}>
                <h2 className="text-2xl mb-4">Add Income</h2>
                {incomeError && <p>{incomeError}</p>}
                <div><input
                    type="text" value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)}
                    required
                />
                </div>
                <div>
                    <input type="number" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} placeholder="Amount"
                        required
                    />
                </div>
                <div>
                    <input
                        type="date"
                        value={incomeDate}
                        onChange={(e) => setIncomeDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-black text-white p-2 rounded">
                    Add Income
                </button>
            </form>
        </div>
    );
};
export default ExpenseEntry;
