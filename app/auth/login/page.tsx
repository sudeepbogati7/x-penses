"use client"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

// var API_URL = "https://expense-tracking-system.onrender.com/api"
var API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      setLoading(false)
      const data = await response.json()
      console.log("data=>", data)
      if (response.ok) {
        router.push("/tracker")
        Cookies.set("kharcha_token", data.token)
      } else {
        toast({ title: "Error !", description: data.error, variant: "destructive" })
      }
    } catch (error: any) {
      setLoading(false)
      console.log(error)
      toast({ title: "Error !", description: error.message, variant: "destructive" })
    }
  }

  return (
    <>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0a548c]">Welcome Back!</h2>
            <p className="text-gray-600 mt-2">We are glad to see you again. Lets get your finances in order.</p>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-1 bg-[#567f9c] rounded-full"></div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className=" mt-8">
            <LabelInputContainer className="mb-5">
              <Label htmlFor="email">Email</Label>
              <Input onChange={handleChange} type="email" name="email" placeholder="john@example.com" required />
            </LabelInputContainer>
            <LabelInputContainer className="mb-2">
              <Label htmlFor="password">Password</Label>
              <Input onChange={handleChange} type="password" name="password" required placeholder="********" />
            </LabelInputContainer>
            <Link
              href={"/auth/login/forget-password/"}
              className="text-left mb-6 text-blue-800 hover:underline hover:text-indigo-900 w-full flex items-end justify-end"
            >
              {" "}
              <span>Forgot password ?</span>{" "}
            </Link>

            <div>
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2b526e] hover:bg-[#3d81b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 ${loading ? "opacity-80 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2  text-gray-600 ">Dont have an account yet?</span>
              </div>
            </div>
            <div className="text-center hover:text-black text-gray-500 hover:bg-[#97c6e8] w-fit px-3 mx-auto rounded-md  mt-2 group transition-all duration-300 ease-linear ">
              {" "}
              <Link
                className="flex items-center transition-all duration-300 ease-linear gap-1 justify-center  group-hover:gap-4"
                href={"/auth/register"}
              >
                {" "}
                Register here <span> &rarr;</span>{" "}
              </Link>{" "}
            </div>
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
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
}
function FeatureIcon({ Icon, text }: { Icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </div>
  )
}

