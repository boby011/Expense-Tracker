const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Expense = require('./models/expense');
const Income = require('./models/income');
const verifyToken = require('./models/verifytoken');

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/ET')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('Connection error', err));


app.use(express.json());
app.use(cors());

const saltrounds = 10
    ;

const tokensecret = 'abc';

// UserSigin
app.post('/insert', async (req, res) => {
    console.log(req.body);
    try {
        const oldUser = await User.findOne({ email: req.body.email });
        if (oldUser) {
            return res.status(409).json({ emailExists: true, message: 'Mail ID is already registered' });
        }
        const codedPassword = await bcrypt.hash(req.body.password, saltrounds);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: codedPassword
        });
        const response = await newUser.save();
        const token = jwt.sign({ id: newUser._id }, tokensecret, { expiresIn: '600s' });
        res.status(201).json({
            message: 'User registered successfully', user: response,
            token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error' });
    }
});

// UserProfile

app.get('/Userprofile', verifyToken, (req, res) => {
    res.json({ message: 'Yes', user: req.user });
});

// Login
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid values' });
        }
        const token = jwt.sign({ id: user._id }, tokensecret, { expiresIn: '1h' });
        res.json({
            message: 'Login successful', token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error' });
    }
});


app.post('/add-expense', verifyToken, async (req, res) => {
    const { description, amount, date } = req.body;
    try {
        const userId = req.user.id;
        const expense = new Expense({
            userId, description,
            amount,
            date: date ? new Date(date) : new Date(),
        });
        await expense.save();
        res.status(201).json({ message: 'Succesfull', expense });
    } catch (error) {
        console.error('Error', error.message);
        res.status(500).json({ error: 'Error' });
    }
});


app.post('/add-income', verifyToken, async (req, res) => {
    const { source, amount, date } = req.body;
    try {
        const userId = req.user.id;
        const income = new Income({
            userId,
            source,
            amount,
            date: date ? new Date(date) : new Date(),
        });
        await income.save();
        res.status(201).json({ message: 'Income added successfully', income });
    } catch (error) {
        console.error('Error adding income', error.message);
        res.status(500).json({ error: 'Error adding income' });
    }
});

app.get('/user/income-expenses', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('income');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const expenses = await Expense.find({ userId });
        res.json({
            income: user.income, expenses
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error' });
    }
});

app.get('/user/income', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const income = await Income.find({ userId });
        if (!income) {
            return res.status(404).json({ message: 'No income' });
        }
        res.json({ income });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro' });
    }
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
