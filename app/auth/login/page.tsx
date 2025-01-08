'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { ErrorNotification, SuccessNotification } from '@/components/Notifications';
import { useResponseData } from '@/components/ResponseData';
import Cookies from 'js-cookie';

import LoginPage from '@/components/LoginPage';
// var API_URL = "https://expense-tracking-system.onrender.com/api" 
var API_URL = "http://localhost:3001/api"
export default function Login() {
    const router = useRouter();
    const { responseData, setResponseData } = useResponseData();
    const [error, setError] = useState(null);
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
                router.push('/');
                Cookies.set('token', data.token);
                setResponseData(data);
                setError(null);
            } else {
                setError(data);
            }
        } catch (error: any) {
            setError(error)
        }
    };


    return (
        <>
            <LoginPage />
        </>
    )
}