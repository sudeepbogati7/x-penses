"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightCircleIcon, UserIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export function SignupFormDemo() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  var API_URL = "http://localhost:3001/api"


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        router.push("/register/verify");

      } else {
        setError(data);
      }
    } catch (error) {
      setError(error as any)
      console.error('Registration error:', error)
    }
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log("formData:", formData);
  return (
    <div className="w-full  mx-auto p-5 md:px-16  bg-gray-100 dark:bg-black">
      <div>
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-100 rounded-md mb-4">
            {error}
          </div>
        )}
        {responseData && (
          <div className="p-4 bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-100 rounded-md mb-4">
            {responseData}
          </div>
        )}
      </div>
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Expense Tracking System
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Lets get started to monitor your expenses and take control of your finances !
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="firstname">Full name</Label>
          <Input
            type="text"
            name='fullName'
            placeholder='John Wick'
            value={formData.fullName}
            onChange={handleChange}
            required
            autoComplete='on'
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='john@example.com'
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder='********'
          />
        </LabelInputContainer>
        <LabelInputContainer className="">
          <Label htmlFor="twitterpassword">Confirm password</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder='********'
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br top-3 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {loading ? "Please wait..." : `Register `} 
          <BottomGradient />
        </button>
      </form>
      <span className="text-gray-700  px-4 w-full flex items-center gap-3 ">Already have account ? <Link className="bg-gray-200 px-3 hover:bg-gray-300 transition-all duration-300 ease-in-out rounded underline py-1 gap-1 flex items-center w-fit " href={'/login'}>Login  <ArrowTopRightOnSquareIcon className="w-4" /> </Link></span>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
