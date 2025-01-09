'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
// var API_URL = "https://expense-tracking-system.onrender.com/api" 

var API_URL = "http://localhost:3001/api"
export default function Login() {
    const router = useRouter();
    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            setLoading(false);
            const data = await response.json();

            if (response.ok) {
                router.push('/tracker');
                Cookies.set('token', data.token);
            } else {
                toast({ title: "Error !", description: data.error, variant: "destructive" });
            }
        }catch (error: any) {
            toast({ title: "Error !", description: error.message, variant: "destructive" });
        }
    };

    return (
        <>
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-600">Welcome Back!</h2>
                        <p className="text-gray-600 mt-2">We are glad to see you again. Lets get your finances in order.</p>
                        <div className="mt-4 flex justify-center">
                            <div className="w-16 h-1 bg-indigo-300 rounded-full"></div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className=" mt-8">
                        <LabelInputContainer className="mb-5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                onChange={handleChange}
                                type="email"
                                name='email'
                                placeholder='john@example.com'
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                onChange={handleChange}
                                type="password"
                                name="password"
                                required
                                placeholder='********'
                            />
                        </LabelInputContainer>
                        <Link href={'/auth/login/forget-password/'} className='text-left mb-6 text-indigo-700 hover:underline hover:text-indigo-900 w-full flex items-end justify-end'>  <span>Forgot password ?</span> </Link >

                        <div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                            >
                                Log in
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2  text-gray-600 ">
                                    Dont have an account yet?
                                </span>
                            </div>
                        </div>
                        <div className='text-center hover:text-black text-gray-500 hover:bg-indigo-200 w-fit px-3 mx-auto rounded-md  mt-2 group transition-all duration-300 ease-linear '> <Link className='flex items-center transition-all duration-300 ease-linear gap-1 justify-center  group-hover:gap-4' href={'/auth/register'}> Register here <span> &rarr;</span> </Link> </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };
  function FeatureIcon({ Icon, text }: { Icon: React.ElementType, text: string }) {
      return (
          <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5" />
              <span>{text}</span>
          </div>
      )
  }