'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, PieChart, CreditCard, TrendingUp, Shield, Clock, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import './globals.css'
import Navbar from '@/components/NavBar'
import HeroSection from '@/components/Hero'
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar bgColor="bg-transparent" />
      {/* Hero Section */}\
      <HeroSection />
      {/* <section className="relative min-h-screen  flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#dce9f2] via-[#c3e2f7]  to-white-100">
        <div className='w-full lg:w-5/6 flex items-center'>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-32 left-24 w-56 h-64"
          >
            <Image
              src="/investing.svg"
              alt="Financial graph"
              width={256}
              height={256}
              className="opacity-60"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-20 hidden md:block right-20 w-64 h-64">
            <Image
              src="/savings.svg"
              alt="Savings piggy bank"
              width={256}
              height={256}
              className="opacity-60"
            />
          </motion.div>
          <div className="relative z-10 text-center p-8 max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl mt-16 md:mt-0 md:text-7xl font-bold text-[#103857] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Master Your Finances
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Track, analyze, and optimize your expenses with our powerful and intuitive system.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/auth/register"
                className="bg-[#3a8cc7] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#184d73] transition duration-300 flex items-center justify-center w-fit mx-auto space-x-2">
                <ArrowUpRight className="w-5 h-5" />
                <span>Get Started</span>
              </Link>
            </motion.div>
          </div>
        </div>

      </section> */}

      {/* Features Section */}
      <section className="md:py-20 py-8 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-[#2d6188] mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: PieChart, title: "Expense Categorization", description: "Categorize your expenses for better insights." },
              { icon: CreditCard, title: "Multi-Account Support", description: "Connect and manage multiple bank accounts and credit cards." },
              { icon: TrendingUp, title: "Advanced Analytics", description: "Get detailed reports and visualizations of your spending habits." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="w-8 h-12 text-[#0082d9] mb-4" />
                <h3 className="text-lg font-semibold text-[#0082d9] mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-[#326287] to-[#3a5469] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-white mb-12">Why Use Our System?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Shield, title: "Financial Security", description: "Gain control over your finances and build a secure financial future." },
              { icon: Clock, title: "Time-Saving", description: "Automate expense tracking and save hours on manual data entry." },
              { icon: Zap, title: "Smart Insights", description: "Receive personalized recommendations to optimize your spending." },
              { icon: ArrowUpRight, title: "Goal Achievement", description: "Set and track financial goals to reach your dreams faster." }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <benefit.icon className="w-6 h-8 text-[#a8d8ff] mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-48 bg-gradient-to-b  from-gray-100 to-white">
      <div className="container mx-auto px-4 mt-12 text-center">
            <h3 className="md:text-3xl text-xl font-semibold mb-4 text-gray-800">What Our Users Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "John Doe", feedback: "This system has completely changed the way I manage my finances. Highly recommended!" },
                { name: "Jane Smith", feedback: "The analytics and insights are top-notch. I feel more in control of my spending than ever before." },
                { name: "Michael Lee", feedback: "A must-have tool for anyone serious about financial planning. Easy to use and very effective." }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="text-gray-600 italic mb-4"> {testimonial.feedback} </p>
                  <h4 className="text-lg font-semibold text-gray-800">- {testimonial.name}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        <div className='md:mt-24  px-8 w-full md:w-5/6 gap-12 mx-auto flex  flex-col md:flex-row items-center'>
          <div>
            <Image src={'/ready-illustration.svg'} width={400} alt='ready' height={200}></Image>
          </div>
          <div className="container mx-auto px-4 ">
            <h2 className="md:text-4xl text-2xl font-bold mb-6 text-gray-900">Ready to Take Control of Your Finances?</h2>
            <p className="md:text-xl text-lg mb-8 text-gray-700">Join thousands of users who have transformed their financial lives with our expense tracking system.</p>
            <Link
              href="/auth/register"
              className="bg-[#2d5573] text-white px-8 py-3 rounded-full font-semibold  hover:bg-[#3773a1] transition duration-300"
            >
              Start for Free &rarr;
            </Link>
          </div>
        
        </div>
        
      </section >

      {/* footer section */}
      < footer className="py-8 bg-gray-900 text-white text-center" >
        <p className="text-sm">© 2025 Sudeep Bogati. All rights reserved.</p>
      </footer >
    </div >
  )
}

