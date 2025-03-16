import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-stretch items-center justify-center lg:max-h-[900px] lg:min-h-[900px]">
                <div className="flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                    <div className="h-full px-4 pt-24 pb-16 sm:px-6 lg:px-24 2xl:px-32 lg:pt-40 lg:pb-14">
                        <div className="flex flex-col justify-between flex-1 h-full">
                            <div>
                                <h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-7xl">
                                    Take control <br />
                                    on your daily expenses
                                </h1>
                                <p className="mt-6 text-base text-black sm:text-xl">
                                    Our tool helps you to predict your expenses based on your previous activity and shares how you should
                                    manage your money.
                                </p>
                                <div className="relative block md:hidden mt-12 md:mt-0 w-full overflow-hidden lg:w-5/12 lg:order-1">
                                    <div className="lg:absolute lg:bottom-0 lg:left-0">
                                        <Image
                                            className="w-[300px] md:w-full "
                                            // src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/phone-mockup.png"
                                            src={'/hero_mockup.png'}
                                            alt="Phone Mockup"
                                            width={600}
                                            height={900}
                                            priority
                                        />
                                    </div>
                                </div>
                                <Link
                                    href="/auth/register"
                                    className="inline-flex items-center px-6 py-5 mt-2 text-base font-semibold text-black transition-all duration-200 bg-sky-300 md:mt-9 hover:bg-sky-400 focus:bg-sky-400"
                                    role="button"
                                >
                                    Get started for free
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5 ml-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 6.75L21 10.5m0 0l-3.75 3.75M21 10.5H3"
                                        />
                                    </svg>
                                </Link>
                            </div>

                            <div className="mt-8 border-t-2 border-black lg:mt-auto sm:mt-14">
                                <div className="pt-8 sm:flex sm:items-center sm:justify-between sm:pt-14">
                                    <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
                                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-black bg-sky-200 rounded-full">
                                            Expense Analysis
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-black bg-sky-200 rounded-full">
                                            Smart Reports
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-black bg-sky-200 rounded-full">
                                            Interactive Dashboards
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:block relative hidden mt-12 md:mt-0 w-full overflow-hidden lg:w-5/12 lg:order-1">
                    <div className="lg:absolute lg:bottom-0 lg:left-0">
                        <Image
                            className="w-[300px] md:w-full "
                            // src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/phone-mockup.png"
                            src={'/hero_mockup.png'}
                            alt="Phone Mockup"
                            width={600}
                            height={900}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}