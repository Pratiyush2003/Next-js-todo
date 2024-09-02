import { NextResponse } from "next/server";
import { connectDb } from "@/app/database/db";
import { Employee } from "@/models/Employee";

connectDb();

export async function GET(request) {
    try {
        const getEmployee = await Employee.find({});
        return NextResponse.json(getEmployee, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get employee" }, { status: 500 });
    }
}

export async function POST(request) {
    const { name, email, address, salary } = await request.json();

    if (!name || !email || !address || !salary) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        const employee = await Employee.findOne({ email });

        if (employee) {
            return NextResponse.json({ error: "Employee already exists" }, { status: 409 });
        }

        const newEmployee = new Employee({
            name,
            email,
            address,
            salary,
        });

        const savedEmployee = await newEmployee.save();
        return NextResponse.json({ savedEmployee, message: "Employee created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
    }
}
