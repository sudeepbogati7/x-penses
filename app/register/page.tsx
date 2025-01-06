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
import { Mail, Lock, DollarSign, PieChart, CreditCard, TrendingUp } from 'lucide-react'
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
        <>
        <SignupFormDemo />
        </>
    )
}

function FeatureIcon({ Icon, text }: { Icon: React.ElementType, text: string }) {
    return (
        <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5" />
            <span>{text}</span>
        </div>
    )
}

