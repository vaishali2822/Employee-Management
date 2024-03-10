const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    position: { type: String, required: true },
    salary:{ type:Number,required: true}
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;