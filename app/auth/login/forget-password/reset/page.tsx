'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Header from '@/components/Header';
import { useResponseData } from '@/components/ResponseData';
import { useRouter,useSearchParams } from 'next/navigation';
import { SuccessNotification, ErrorNotification } from '@/components/Notifications';
import Loading from '@/app/loading';
export default function Login() {
    const params = useSearchParams();
    const {responseData, setResponseData} = useResponseData();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email : params.get('email'),
        password: '',
        confirmPassword: '',
        otp: ''
    });
    const router = useRouter();
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/user/forget-password/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setLoading(false);
            if (response.ok) {
                alert("Hey.. ;) ")
            } else {
                console.log("Error ")
            }
        } catch (error: any) {
            setError(error.message)
        }
    };

    console.log(error)
    return (
            <main>
                <div className='flex flex-col flex-wrap align-center justify-center container  p-4  mx-auto w-full'>
                    <span className='text-center text-xl font-medium p-2'> <span className='text-orange-600 border-b border-orange-300'> Forget </span> password</span>
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col p-6 justify-center mx-auto w-full'>
                        <div className='flex flex-col w-full p-4'>
                            <label className='mx-2 font-medium tracking-wide' htmlFor="email">Password</label>
                            <input
                                type="password"
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='**********'
                                className='w-full border-2 border-gray-200 dark:border-none p-2 rounded-lg outline-none'
                            />
                        </div>
                        <div className='flex flex-col w-full p-4'>
                            <label className='mx-2 font-medium tracking-wide' htmlFor="email">Confirm Password</label>
                            <input
                                type="password"
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder='**********'
                                className='w-full border-2 border-gray-200 dark:border-none p-2 rounded-lg outline-none'
                            />
                        </div>
                        <div className='flex flex-col w-full p-4'>
                            <label className='mx-2 font-medium tracking-wide' htmlFor="email">OTP</label>
                            <input
                                type="text"
                                name='otp'
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder='eg. dfi09t'
                                className='w-full border-2 border-gray-200 dark:border-none p-2 rounded-lg outline-none'
                            />
                        </div>
                        <div className='px-4'>
                            <button className='border my-6 rounded-xl p-2 text-md font-medium tracking-wide w-full dark:shadow-lg dark:shadow-orange-600/40 mx-auto hover:bg-orange-700 hover:text-white transition-all duration-300 ease-in-out border-orange-600' > Reset </button>
                        </div>
                        <div className='flex justify-center'>
                            <div onClick={() => router.back()} className='cursor-pointer mx-auto my-4 text-lg'><span className='text-orange-600 border-b border-orange-400'> {'<--'} Back </span></div>
                            <div onClick={() => router.push('/')} className='cursor-pointer mx-auto my-4 text-lg'><span className='text-orange-600 border-b border-orange-400'>  Home </span></div>
                        </div>
                    </form>
                </div>
            </main>
    )
}