'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, DollarSign, PieChart, CreditCard, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { IconBrandFacebook, IconBrandGithub, IconBrandOnlyfans } from '@tabler/icons-react'
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Link from 'next/link'
export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        console.log('Login attempted with:', email, password)
    }

    return (
        <div className="min-h-screen flex  flex-col md:flex-row bg-gray-100">
            {/* Illustration Side */}
            <div className='w-full md:w-3/4 bg-gradient-to-br from-gray-700 via-15% via-slate-900  to-black'>
                <div
                    className="w-full h-full flex items-center card justify-center p-8"
                >
                    <div className=''>
                        <div className="text-white ">
                            <h1 className="text-3xl font-bold mb-3">Track Your <span className='text-red-600'>Expenses</span></h1>
                            <p className="mb-8">Gain control of your finances with our powerful expense tracking system.</p>
                            <div className="grid grid-cols-2 gap-4">
                                <FeatureIcon Icon={DollarSign} text="Budget Management" />
                                <FeatureIcon Icon={PieChart} text="Expense Analytics" />
                                <FeatureIcon Icon={CreditCard} text="Bill Tracking" />
                                <FeatureIcon Icon={TrendingUp} text="Financial Goals" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Form Side */}
            <div className="md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-600">Welcome Back!</h2>
                        <p className="text-gray-600 mt-2">We're glad to see you again. Let's get your finances in order.</p>
                        <div className="mt-4 flex justify-center">
                            <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            type="email"
                            name='email'
                            placeholder='john@example.com'
                            required 
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            type="password"
                            name="password"
                            required
                            placeholder='********'
                        />
                        </LabelInputContainer>

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
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-100 text-gray-500">
                                    Dont have an account yet?
                                </span>
                            </div>
                        </div>
                        <div className='text-center hover:text-black text-gray-500 hover:bg-gray-200 w-fit px-3 mx-auto rounded-md  mt-5 group transition-all duration-300 ease-linear '> <Link className='flex items-center transition-all duration-300 ease-linear gap-1 justify-center  group-hover:gap-4' href={'/register'}> Register here <span> &rarr;</span> </Link> </div>
                        
                    </div>
                </div>
            </div>
        </div>
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
