'use client';

import '../../login/login.css';
import '../../page.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Header from '@/components/Header';

import { useRouter , useSearchParams} from 'next/navigation';
import { ErrorNotification, SuccessNotification } from '@/components/Notifications';
import { useResponseData } from '@/components/ResponseData';

import Loading from '@/app/loading';

var API_URL = "http://localhost:3001/api"


export default function Verify() {
    const params = useSearchParams();
    const email = params.get('email');
    const { responseData, setResponseData } = useResponseData();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        otp: '',
        email : email,
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
            const response = await fetch(`${API_URL}/user/register/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            setLoading(false);
            const data = await response.json();
            if (response.ok) {
                router.push('/');
                setResponseData(data);
                setError(null);
            } else {
                setError(data);
            }
        } catch (error: any) {
            setError(error.message)
        }
    };

    console.log("Error from verify page : ",error)
    return (
            <main>
                {loading && <Loading />}
                {error && <ErrorNotification error={error} />}
                {responseData && <SuccessNotification successResponse={responseData} />}
                <div className='flex flex-col flex-wrap align-center justify-center container  p-4 w-full'>
                    <span className='text-center text-xl font-medium p-2'>Check your email for  <span className='text-orange-600 border-b border-orange-300'> OTP </span> </span>
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col p-6 justify-center mx-auto w-full'>
                        <div className='flex flex-col w-full p-4'>
                            <label className='mx-2 font-medium tracking-wide' htmlFor="email">OTP</label>
                            <input
                                type="text"
                                name='otp'
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder='s4e1ps'
                                className='w-full border-2 border-gray-200 dark:border-none p-2 focus:border-2 focus:shadow-orange-400/10 focus:shadow-lg transision duration-300 ease-in-out rounded-lg outline-none'
                            />
                        </div>
                        <div className='px-4'>
                            <button className='border my-6 rounded-xl p-2 text-md font-medium tracking-wide w-full dark:shadow-lg dark:shadow-orange-600/40 mx-auto hover:bg-orange-700 hover:text-white transition-all duration-300 ease-in-out border-orange-600' > Verify and Register </button>
                        </div>
                        <div onClick={() => router.back()} className='cursor-pointer mx-auto my-4 text-lg'><span className='text-orange-600 border-b border-orange-400'> {'<--'} Back </span></div>
                    </form>
                </div>
            </main>
    )
}

