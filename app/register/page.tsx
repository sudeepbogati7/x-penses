'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import '../globals.css';
import '../page.css';
import '../login/login.css';
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SuccessNotification, ErrorNotification } from "@/components/Notifications";
import { ArrowRightCircleIcon, UserIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";


// import * as Dialog from "@radix-ui/react-dialog";


import { useToast } from "@/hooks/use-toast"


import Cookies from "js-cookie";
const token = Cookies.get('token');
import Image from "next/image";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Copy } from "lucide-react";



import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";


// var API_URL = "https://expense-tracking-system.onrender.com/api" 
var API_URL = "http://localhost:3001/api"

export default function Register() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const { toast } = useToast()

    const [email, setEmail] = useState("");
    const [otpDialogOpen, setOtpDialogOpen] = useState(false);


    const [openOTPDialogue, setOpenOTPDialogue] = useState(false);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setLoading(false);
            console.log("data while registering:==> ", data);
            if (response.ok) {
                setEmail(formData.email); // Save email for OTP reference
                setOpenOTPDialogue(true); // Open OTP dialog
            } else {
                toast({ title: "Error", description: data.error, variant: "destructive", })
            }
        } catch (error) {
            toast({ title: "Error", description: "Something went wrong. Please try again ", variant: "destructive", })
            console.error("Registration error:", error);
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
        <>
            <div className="w-full  mx-auto p-5 md:px-16   dark:bg-black">
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
            <Dialog open={true} onOpenChange={setOpenOTPDialogue}>
                {/* <DialogTrigger asChild>
                    <Button variant="outline">Share</Button>
                </DialogTrigger> */}
                <DialogContent className="sm:max-w-md">
                    <form
                        onSubmit={handleSubmit}
                        className=' rounded p-8 flex flex-col w-fit mx-auto items-center justify-centers'>
                        {/* <h1 className=''> Check your email <span className=" underline">{email}</span> for OTP </h1> */}
                        <div className='flex flex-col w-full p-4'>
                            <label className='text-sm font-medium tracking-wide mb-2' htmlFor="email">Enter verification code </label>
                            <InputOTP maxLength={6}>
                                <InputOTPGroup className='flex gap-2'>
                                    <InputOTPSlot className='border border-gray-400' index={0} />
                                    <InputOTPSlot className='border border-gray-400' index={1} />
                                    <InputOTPSlot className='border border-gray-400' index={2} />
                                    <InputOTPSlot className='border border-gray-400' index={3} />
                                    <InputOTPSlot className='border border-gray-400' index={4} />
                                    <InputOTPSlot className='border border-gray-400' index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            <button className="w-full bg-black text-white rounded  p-1 hover:bg-gray-800" >
                                Verify and Register
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

function FeatureIcon({ Icon, text }: { Icon: React.ElementType, text: string }) {
    return (
        <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5" />
            <span>{text}</span>
        </div>
    )
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

