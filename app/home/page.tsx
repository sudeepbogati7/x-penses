'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, PieChart, CreditCard, TrendingUp, Shield, Clock, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import '../globals.css'
import Navbar from '@/components/NavBar'
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b  from-gray-50 to-gray-100">
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-screen  flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-indigo-100 to-white-100">
        {/* <div className="absolute inset-0">
          <Image
            src="/investing.svg"
            alt="Financial illustration"
            layout="fill"
            objectFit="cover"
            className="opacity-10"
          />
        </div> */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-24 left-24 w-56 h-64">
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
            className="text-4xl mt-16 md:mt-0 md:text-7xl ont-bold text-gray-900 mb-6"
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
              href="/register" 
              className="bg-gray-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition duration-300"> 
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="md:py-20 py-8 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
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
                <feature.icon className="w-8 h-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
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
                <benefit.icon className="w-6 h-8 text-indigo-300 mt-1" />
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
      <section className="py-20 bg-gradient-to-b from-indigo-100 to-purple-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="md:text-4xl text-2xl font-bold mb-6 text-gray-900">Ready to Take Control of Your Finances?</h2>
          <p className="md:text-xl text-lg mb-8 text-gray-700">Join thousands of users who have transformed their financial lives with our expense tracking system.</p>
          <Link 
            href="/register" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold  hover:bg-indigo-700 transition duration-300"
          >
            Start for Free &rarr;
          </Link>
        </div>
      </section>

      {/* footer section */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p className="text-sm">© 2025 Sudeep Bogati. All rights reserved.</p>
      </footer>
    </div>
  )
}

