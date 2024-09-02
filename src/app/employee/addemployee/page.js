"use client"; // use client 👉 For Client Component

import Link from "next/link";
import React, { useState } from "react";

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        address: "",
        salary: "",
    });

    const addEmployeeDetail = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: employee.name,
                    email: employee.email,
                    address: employee.address,
                    salary: employee.salary,
                }),
            });

            // Check for non-200 status codes
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.error || "Failed to add employee");
                return;
            }

            const data = await res.json();
            alert(data.message || "Employee added successfully");

            // Clear form fields
            setEmployee({
                name: "",
                email: "",
                address: "",
                salary: "",
            });
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("An error occurred while adding the employee.");
        }
    };

    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <div className="form border shadow-md border-gray-400 rounded-xl py-6 px-9">
                <div className="top">
                    <div className="flex gap-[40px] mb-5 items-center">
                        <Link href="/">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 9l-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                                />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-semibold">Add Employee Detail</h1>
                    </div>
                </div>

                <div className="bottom">
                    <input
                        type="text"
                        value={employee.name}
                        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                        name="employeeName"
                        placeholder="Enter name"
                        className="border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400"
                    />

                    <input
                        value={employee.email}
                        onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                        type="email"
                        name="employeeEmail"
                        placeholder="Enter email"
                        className="border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400"
                    />

                    <input
                        value={employee.address}
                        onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                        type="text"
                        name="employeeAddress"
                        placeholder="Enter address"
                        className="border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400"
                    />

                    <input
                        value={employee.salary}
                        onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                        type="number"
                        name="employeeSalary"
                        placeholder="Enter salary"
                        className="border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-8 placeholder-gray-400"
                    />

                    <button
                        className="bg-gray-100 hover:bg-gray-200 w-full py-1.5 border border-gray-400 rounded-md font-medium mb-5"
                        onClick={addEmployeeDetail}
                    >
                        Add Detail
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
