const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Employee = require('./models/employee');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/employeesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Set up EJS as view engine
app.set('view engine', 'ejs');

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the employee list
app.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('index', { employees });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to render the form for adding a new employee
app.get('/add', (req, res) => {
    res.render('form');
});

// Route to handle adding a new employee
app.post('/add', async (req, res) => {
    const { name, age, position, salary } = req.body;
    const employee = new Employee({ name, age, position, salary });
    try {
        await employee.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
