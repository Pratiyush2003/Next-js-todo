"use client"; // use client 👉 For Client Component

import Link from "next/link";
import { useEffect, useState } from "react";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee`);
            const data = await res.json();
            setEmployees(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee/dynamicroute/${employeeId}`, {
                method: "DELETE",
            });
            // After deleting, fetch the updated list
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {/* Main */}
            <div className="flex flex-col">
                {/* Main-Child 1 */}
                <div className="-m-1.5 overflow-x-auto">
                    {/* Main-Child 2 */}
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        {/* Main-Child 3 */}
                        <div className="border rounded-lg shadow overflow-hidden">
                            {/* Top [Svg Icon And Text] */}
                            <div className="p-2 bg-gray-50 border-b flex gap-2 items-center">
                                {/* link */}
                                <Link href="/">
                                    {/* svg icon */}
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
                                            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                </Link>

                                {/* Text */}
                                <h1 className="text-center text-2xl font-semibold">
                                    Employee Detail List
                                </h1>
                            </div>

                            {/* Table */}
                            <table className="w-full divide-y divide-gray-200">
                                {/* Thead */}
                                <thead className="bg-gray-50">
                                    <tr>
                                        {/* S.No. */}
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            S.No.
                                        </th>

                                        {/* Employee Name */}
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Name
                                        </th>

                                        {/* Email */}
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Email
                                        </th>

                                        {/* Address */}
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Address
                                        </th>

                                        {/* Salary */}
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Salary
                                        </th>

                                        {/* Action */}
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Action
                                        </th>

                                        {/* Action */}
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {employees.map((employee, index) => (
                                        <tr key={employee._id}>
                                            {/* S.No */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                {index + 1}.
                                            </td>

                                            {/* Name */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                {employee.name}
                                            </td>

                                            {/* Email */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                {employee.email}
                                            </td>

                                            {/* Address */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                {employee.address}
                                            </td>

                                            {/* Salary */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                ₹ {employee.salary}
                                            </td>

                                            {/* Edit Button */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/employee/editemployee/${employee._id}`}
                                                    className="text-green-600"
                                                >
                                                    Edit
                                                </Link>
                                            </td>

                                            {/* Delete Button */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div
                                                    onClick={() => handleDelete(employee._id)}
                                                    className="text-red-600 cursor-pointer"
                                                >
                                                    Delete
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
