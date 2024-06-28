import React from "react";
import './loading.css';
export default function Loading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 ">
            <div className="loader dark:bg-gray-700">
                <label className="loading-label">Please wait...</label>
                <div className="loading"></div>
            </div>
        </div>
    )
}



export function ExpenseListLoading() {
    return (
        <div className="relative flex w-5/6 animate-pulse gap-2 p-4">
            {/* <div className="h-12 w-12 rounded-full bg-slate-400"></div> */}
            <div className="flex-1">
                <div className="mb-3 h-5 w-3/4 rounded-lg bg-slate-400 text-lg"></div>
                <div className="mb-3 h-5 w-full rounded-lg bg-slate-400 text-lg"></div>
                <div className="mb-3 h-5 w-3/4 rounded-lg bg-slate-400 text-lg"></div>
                <div className="mb-3 h-5 w-full rounded-lg bg-slate-400 text-lg"></div>
                <div className="mb-3 h-5 w-full rounded-lg bg-slate-400 text-lg"></div>
                <div className="mb-3 h-5 w-5/6 rounded-lg bg-slate-400 text-lg"></div>
                <div className="mb-3 h-5 w-4/5 rounded-lg bg-slate-400 text-lg"></div>
                <div className="mb-3 h-5 w-full rounded-lg bg-slate-400 text-lg"></div>
                <div className="h-5 w-full rounded-lg bg-slate-400 text-sm"></div>
            </div>
            <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
        </div>
    )
}

export function TotalExpenseLoading() {
    return (
        <div className=" flex w-5/6 animate-pulse gap-2 p-4">
            {/* <div className="h-12 w-12 rounded-full bg-slate-400"></div> */}
            <div className="">
                <div className="mb-3 h-5 w-24 rounded-lg bg-slate-400 text-lg"></div>
            </div>
            {/* <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div> */}
        </div>
    )
}