import { Employee } from "@/models/Employee";
import { NextResponse } from "next/server";

//get single employee
export async function GET(request, { params }) {
  const { employeeid } = params;
  console.log(employeeid);
  try {
    const getSingleEmployee = await Employee.findById(employeeid);
    return NextResponse.json({ getSingleEmployee }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to get single employee" },
      { status: 404 }
    );
  }
}

export async function PUT(request, { params }) {
  const { employeeid } = params;
  console.log(employeeid);
  const { name, email, address, salary } = await request.json();
  try {
    if (!name || !email || !address || !salary) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const employee = await Employee.findByIdAndUpdate(
      employeeid,
      {
        $set: {
          name,
          email,
          address,
          salary,
        },
      },
      { new: true }
    );
    if (!employee) {
      return NextResponse.json({ error: "No employee found" }, { status: 404 });
    }
    return NextResponse.json({
      employee,
      success: "Updated Employee Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to get update employee" },
      { status: 404 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { employeeid } = params;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(employeeid);
    if (!deletedEmployee) {
      return NextResponse.json({ error: "No employee found" }, { status: 404 });
    }
    return NextResponse.json(
      { success: "Employee deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to get single employee" },
      { status: 404 }
    );
  }
}
