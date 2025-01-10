'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, BarChart2, DollarSign, PieChart, Users, BookOpen, Briefcase } from 'lucide-react'

const navItems = [
  { 
    name: 'Features', 
    href: '#features',
    details: [
      { name: 'Expense Tracking', description: 'Easily track all your expenses', icon: BarChart2 },
      { name: 'Budgeting', description: 'Set and manage your budgets', icon: DollarSign },
      { name: 'Reports', description: 'Gain insights with detailed reports', icon: PieChart },
    ]
  },
  { 
    name: 'Pricing', 
    href: '#pricing',
    details: [
      { name: 'Free Plan', description: 'Basic features for personal use', icon: Users },
      { name: 'Pro Plan', description: 'Advanced features for power users', icon: BarChart2 },
      { name: 'Enterprise', description: 'Custom solutions for businesses', icon: Briefcase },
    ]
  },
  { 
    name: 'About', 
    href: '#about',
    details: [
      { name: 'Our Story', description: 'Learn about our mission', icon: BookOpen },
      { name: 'Team', description: 'Meet the people behind the product', icon: Users },
      { name: 'Careers', description: 'Join our growing team', icon: Briefcase },
    ]
  },
]

export default function Navbar({bgColor} : any) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openItem, setOpenItem] = useState<string | null>(null)


  console.log("background color =>", bgColor)
  useEffect(() => {
    const handleScroll = () => {
      console.log("scroll y ==> ", window.scrollY)
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  console.log("is scrolled ==> ", isScrolled)
  return (
    <nav className={`fixed w-full py-2 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : `${bgColor}`}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 w-full">
             <Image src="/logo1.gif" width={100} height={100} alt='logo'></Image>
              {/* <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-gray-600'}`}>ExpenseTracker</span> */}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              {navItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => setOpenItem(item.name)}
                  onMouseLeave={() => setOpenItem(null)}
                >
                  <Link 
                    href={item.href} 
                    className={`px-3 py-2 rounded-md text-sm font-medium text-[#0082d9] hover:text-[#12a0ff]`}
                  >
                    <span className="flex items-center">
                      {item.name}
                      <motion.span
                        animate={{ rotate: openItem === item.name ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="ml-1  h-4 w-4" />
                      </motion.span>
                    </span>
                  </Link>
                  <AnimatePresence>
                    {openItem === item.name && (
                      <motion.div 
                        className="absolute left-0  w-56 rounded-md shadow-lg bg-blue-100 ring-1 ring-black ring-opacity-5 overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="py-1">
                          {item.details.map((detail) => (
                            <Link
                              key={detail.name}
                              href="#"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 hover:text-[#2a71a1]"
                            >
                              <detail.icon className="h-5 w-5 mr-3 text-gray-500" />
                              <span>
                                <span className="font-medium block">{detail.name}</span>
                                <span className="text-xs text-gray-500">{detail.description}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Link
              href="/auth/register"
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isScrolled
                  ? 'bg-[#0082d9] text-white hover:bg-[#0082d9]'
                  : 'bg-blue-200 text-[#0082d9] hover:text-white hover:bg-[#0082d9]'
              } transition-colors duration-300`}
            >
              Sign Up
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-600 hover:text-black'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-8 pb-3 space-y-4 sm:px-3 bg-white shadow-lg">
              {/* {navItems.map((item) => (
                <div key={item.name}>
                  <Link href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    {item.name}
                  </Link>
                  <div className="pl-4 space-y-1">
                    {item.details.map((detail) => (
                      <Link
                        key={detail.name}
                        href="#"
                        className="flex items-center px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      >
                        <detail.icon className="h-5 w-5 mr-3 text-gray-500" />
                        <span>{detail.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))} */}
              <Link
                href="/auth/register"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 text-[#0082d9] "
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block px-3 py-2 rounded-md text-base font-medium bg-[#0082d9] text-white hover:bg-[#0082d9]"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

