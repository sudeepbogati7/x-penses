'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { ErrorNotification, SuccessNotification } from '@/components/Notifications';
import Loading from '@/app/loading';
import { useResponseData } from '@/components/ResponseData';
var API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
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
            const response = await fetch(`${API_URL}/user/forget-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setLoading(false);
            if (response.ok) {
                router.push(`/auth/login/forget-password/reset?email=${formData.email}`)

            } else {
            }
        } catch (error: any) {
        }
    };
    return (
        <div className='h-screen w-full'>
            <main>
                <div className='flex flex-col flex-wrap align-center justify-center container mx-auto md:border-2 md:border-gray-300 md:mt-14 rounded-xl  p-4 w-full'>
                    <span className='text-center text-xl font-medium p-2'> <span className='text-orange-600 border-b border-orange-300'> Forget </span> password</span>
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col p-6 justify-center mx-auto w-full'>
                        <div className='flex flex-col w-full p-4'>
                            <label className='mx-2 font-medium tracking-wide' htmlFor="email">Email</label>
                            <input
                                type="email"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='sudeep@example.com'
                                className='w-full border-2 border-gray-200 dark:border-none p-2 rounded-lg outline-none'
                            />
                        </div>
                        <div className='px-4'>
                            <button className='border my-6 rounded-xl p-2 text-md font-medium tracking-wide w-full dark:shadow-lg dark:shadow-orange-600/40 mx-auto hover:bg-orange-700 hover:text-white transition-all duration-300 ease-in-out border-orange-600' > Send OTP </button>
                        </div>
                        <div onClick={() => router.back()} className='cursor-pointer mx-auto my-4 text-lg'><span className='text-orange-600 border-b border-orange-400'> {'<--'} Back </span></div>

                    </form>
                </div>
            </main>
        </div>
    )
}