import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './tailwind.css';
import reportWebVitals from './reportWebVitals';
import {Login} from './Login';
import Nav from './Nav';
import SignIn from './Sigin';
import  Userprofile  from './Userprofile';
import  Expenseentry  from './Expenseentry';
import ExpenseChart from './ExpenseChart';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Nav/>}>
    <Route index element={<Login/>}/>
    <Route path='Sigin' element={<SignIn/>}/>
    <Route path='Userprofile' element={<Userprofile/>}/>
    <Route path='expenseentry' element={<Expenseentry/>}/>
    <Route path='expensechart' element={<ExpenseChart/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
