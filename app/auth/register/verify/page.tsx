'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/ui/input-otp";
import { useOTP } from '@/hooks/useOtp';

import { useRouter, useSearchParams } from 'next/navigation';
import { ErrorNotification, SuccessNotification } from '@/components/Notifications';
import { useResponseData } from '@/components/ResponseData';
import { ArrowLeft } from 'lucide-react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

var API_URL = "http://localhost:3001/api"

import { useToast } from '@/hooks/use-toast';


export default function Verify() {
    const params = useSearchParams()
    const router = useRouter()
    const email = params.get('email');
    if (!email) {
        router.push("/auth/register")
    }

    const { toast } = useToast();

    const [loading, setLoading] = useState(false);


    const { otp, otpValue, handleChange } = useOTP(5)
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/user/register/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    otp: otpValue
                })
            });
            const data = await response.json();
            setLoading(false);
            console.log("Response data from otp verification page ==> ", data);
            if (response.ok) {
                // router.push('/');
                router.push("/tracker")
            } else {
                toast({ title: "Error", description: data.error, variant: "destructive" });
            }
        } catch (error: any) {
            console.log("Error while otp vlidation : ", error.message)
        }
    };
    console.log("email==> ", otp)
    // console.log("OTP data ==> ", formData)
    return (
        <main className='flex items-center justify-center mx-auto w-full h-full'>
            <form onSubmit={handleSubmit} className='bg-white shadow-lg rounded px-16 gap-6 py-12 flex flex-col mx-auto items-center w-fit justify-centers'>
                <div className='flex flex-col w-full'>
                    <div className='text-gray-500 text-xs '>We have sent you an OTP in your email.</div>
                    <label className='text-sm mb-2 tracking-wide' htmlFor="email">Enter verification code </label>
                    <InputOTP
                        required
                        value={otpValue}
                        onChange={(value) => value.split('').forEach((char, index) => handleChange(index, char))}
                        maxLength={5}>
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
                    <button type='submit' className="w-full bg-black text-white rounded flex items-center justify-center gap-3 p-1 h-10 hover:bg-gray-800" >
                        {loading ? <span className='flex items-center text-white gap-3'> Verifying <span className="h-5 w-5 border-4 border-white border-t-blue-500 rounded-full animate-spin"></span> </span> : <span> Verify and register </span>}
                    </button>
                    <Link href={'/auth/register'} className="text-muted-foreground flex items-center transition-all duration-200 w-fit mx-auto hover:text-black text-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /><span className='hover:border-gray-500 border-b border-transparent'> Back</span>
                    </Link>
                </div>
            </form>
        </main>
    )
}

