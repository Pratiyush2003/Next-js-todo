import mongoose, { Schema } from 'mongoose';

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    date: {
        type: Date, 
        required: true,
        default: Date.now,
    },
});


export const Employee = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
