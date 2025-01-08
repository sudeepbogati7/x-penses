'use client';

// import '../../login/login.css';
// import '../../page.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter, useSearchParams } from 'next/navigation';
import { ErrorNotification, SuccessNotification } from '@/components/Notifications';
import { useResponseData } from '@/components/ResponseData';
import { ArrowLeft } from 'lucide-react';

var API_URL = "http://localhost:3001/api"

export default function Verify() {
    const params = useSearchParams();
    const email = params.get('email');
    const { responseData, setResponseData } = useResponseData();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        otp: '',
        email: email,
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

    console.log("Error from verify page : ", error)
    return (
        <main className='flex items-center justify-center mx-auto w-full h-full'>
            <form
                onSubmit={handleSubmit}
                className='bg-white shadow-lg rounded px-12 py-12 flex flex-col w-fit mx-auto items-center justify-centers'>
                <h1 className='text-xl text-indigo-800 font-medium'> Check your email {email} for OTP </h1>
                <div className='flex flex-col w-full p-4'>
                    <label className='text-sm mb-2 tracking-wide' htmlFor="email">Enter verification code </label>
                    <InputOTP maxLength={6}>
                        <InputOTPGroup className='flex gap-2'>
                            <InputOTPSlot className='border border-gray-400' index={0} />
                            <InputOTPSlot className='border border-gray-400' index={1} />
                            <InputOTPSlot className='border border-gray-400' index={2} />
                            <InputOTPSlot className='border border-gray-400' index={3} />
                            <InputOTPSlot className='border border-gray-400' index={4} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className="flex w-full flex-col gap-4">
                    <button className="w-full bg-black text-white rounded  p-1 hover:bg-gray-800" >
                        Verify and Register
                    </button>
                    <button className="text-muted-foreground flex items-center transition-all duration-200  w-fit  mx-auto hover:text-black   text-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /><span className='hover:border-gray-500 border-b border-transparent'> Back</span>
                    </button>
                </div>
            </form>
        </main>
    )
}

