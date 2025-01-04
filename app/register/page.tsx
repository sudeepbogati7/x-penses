'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import '../globals.css';
import '../page.css';
import '../login/login.css';
import Link from "next/link";
import { SuccessNotification, ErrorNotification } from "@/components/Notifications";
import { useResponseData } from "@/components/ResponseData";
import Loading from "../loading";
import Cookies from "js-cookie";
import { SignupFormDemo } from "@/components/signupForm";
const token = Cookies.get('token');
import Image from "next/image";
import { ArrowRightCircleIcon, UserIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
// var API_URL = "https://expense-tracking-system.onrender.com/api" 
var API_URL = "http://localhost:3001/api"

export default function Register() {
    const { responseData, setResponseData } = useResponseData();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (token) {
        router.push('/');
        return;
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("data while regisetring:", data);
            setLoading(false);
            if (response.ok) {
                setResponseData(data);
                setError(null);
                Cookies.set('token', data.token);
                router.push(`/register/verify/?email=${data.user.email}`);
            } else {
                setError(data);
            }
        } catch (error) {
            setError(error as any)
            console.error('Registration error:', error)
        }
    };
    console.log("Error while registration =====> ", error)
    return (
        <div className='w-full h-full'>
            <div className='h-16  shadow-md sticky top-0 z-40 bg-gray-100 w-full p-4 dark:shadow-gray-500/30 '>
                <div className="md:w-3/4 w-full px-3 flex  justify-between mx-auto items-center">
                    <Link href="/">
                        <div className="tracking-widest font-medium flex text-lg border-b-2 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-900  ease-linear dark:border-gray-500 border-gray-300 my-auto">
                            <span className="text-sm tracking-widest font-normal  border-t-2 border-orange-400">my </span>
                            <span className="text-3xl text-orange-600"> X</span>
                            <span className="tracking-widest text-base font-normal border-t-2 border-orange-400"> penses</span>
                        </div>
                    </Link>
                    <Link href={'/about'} className='border px-3 rounded-lg flex items-center text-center bg-gray-700  text-gray-100 hover:text-white hover:bg-gray-900 p-1 transition-all duration-200 '>
                        <span className="flex gap-1 items-center"> <UserIcon className="w-4" /> About </span>
                    </Link>
                </div>
            </div>
            <main className="w-full h-full">
                <div className="flex mt-8 border-black flex-col md:flex-row mx-auto w-full items-center justify-center">
                    <div className="w-1/3 h-full  lg:block hidden ">
                        <div className=" md:block mx-auto w-full ">
                            <Image className="md:w-3/4 mx-auto w-1/2 text-white" src={'savings.svg'} width={100} height={40} alt="savings-image" ></Image>
                            <ul className="px-8 space-y-3 text-gray-600 mx-auto  mt-16 list-disc">
                                <li>Track your expenses effortlessly and stay in control of your finances. </li>
                                <li>Set budgets and achieve your financial goals with ease. </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-2/5 ">
                        <SignupFormDemo />
                    </div>
                </div>
            </main>
        </div>
    )
}

