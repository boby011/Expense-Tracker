import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

const ExpenseChart = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalExpense, setTotalExpense] = useState(0);
    const [remainingBudget, setRemainingBudget] = useState(0);
    const [income, setIncome] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const expenseResponse = await axios.get('http://localhost:3000/user/income-expenses', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const incomeResponse = await axios.get('http://localhost:3000/user/income', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const expenses = expenseResponse.data.expenses;
                const spent = expenses.reduce((total, expense) => total + expense.amount, 0);
                setTotalExpense(spent);
                if (incomeResponse.data.income.length > 0) {
                    const totalIncome = incomeResponse.data.income.reduce((total, income) => total + income.amount, 0);
                    setIncome(totalIncome);
                    setRemainingBudget(totalIncome - spent);
                } else {
                    setIncome(0);
                    setRemainingBudget(0 - spent);
                }
            } catch (err) {
                setError('Failed');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const pieData = {
        labels: ['Expense', 'Remaining Budget'],
        datasets: [{
            data: [totalExpense, remainingBudget],
            backgroundColor: ['black', 'grey'],
        }],
    };

    const options = {
        animation: { animateRotate: false },
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Budget Usage</h2>
            <div style={{ width: '150px', height: '150px' }}>
                <Pie data={pieData} options={options} />
                <div>
                    <p>Expense:Black</p>
                    <p>Expense:Grey</p>
                </div>
            </div>
        </div>
    );
};

export default ExpenseChart;
