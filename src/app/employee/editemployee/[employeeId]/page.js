"use client"; 

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

const EditEmployee = ({ params }) => {
    const { employeeId } = params;
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        address: "",
        salary: ""
    });
    const router = useRouter(); 

    useEffect(() => {
        getEmployeeById();
    }, []);

    const getEmployeeById = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee/dynamicroute/${employeeId}`);
            const data = await res.json();
            setEmployee({
                name: data.getSingleEmployee.name,
                email: data.getSingleEmployee.email,
                address: data.getSingleEmployee.address,
                salary: data.getSingleEmployee.salary
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    };

    const handleUpdateEmployee = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee/dynamicroute/${employeeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });

            if (res.ok) {
                router.push('/'); 
            } else {
                console.log('Failed to update employee details');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container mx-auto flex justify-center items-center h-screen'>
            {/* Main  */}
            <div className="form shadow-md border border-gray-400 rounded-xl py-6 px-9">
                {/* Top  */}
                <div className="top">
                    {/* Top-Child  */}
                    <div className="flex gap-[40px] mb-5 items-center">
                        {/* link  */}
                        <Link href='/'>
                            {/* Svg icon  */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </Link>

                        {/* text  */}
                        <h1 className='text-2xl font-semibold'>Edit Employee Detail</h1>
                    </div>
                </div>

                {/* Bottom  */}
                <div className="bottom">
                    {/* Employee Name Input   */}
                    <div className="">
                        <input
                            type="text"
                            value={employee.name}
                            onChange={handleInputChange}
                            name='name'
                            placeholder='Enter name'
                            className='border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>

                    {/* Employee Email Input  */}
                    <div className="">
                        <input
                            value={employee.email}
                            onChange={handleInputChange}
                            type="email"
                            name='email'
                            placeholder='Enter email'
                            className='border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>

                    {/* Employee Address Input  */}
                    <div className="">
                        <input
                            value={employee.address}
                            onChange={handleInputChange}
                            type="text"
                            name='address'
                            placeholder='Enter address'
                            className='border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>

                    {/* Employee Salary Input  */}
                    <div className="">
                        <input
                            value={employee.salary}
                            onChange={handleInputChange}
                            type="number"
                            name='salary'
                            placeholder='Enter salary'
                            className='border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-8 placeholder-gray-400'
                        />
                    </div>

                    {/* Update Button  */}
                    <div>
                        <button
                            onClick={handleUpdateEmployee}
                            className='bg-gray-100 hover:bg-gray-200 w-full py-1.5 border border-gray-400 rounded-md font-medium mb-5'
                        >
                            Edit Detail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;
