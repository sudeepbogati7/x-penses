import React from "react";
import './loading.css';

export default function Loading() {
    return (
        <>
            <div className="w-full overflow-hidden z-40 absolute top-0 left-0 h-screen bg-white bg-opacity-70  flex items-center justify-center"></div>
            <div className="flex items-center justify-center w-fit mx-auto fixed top-[50%] left-[50%]">
                <div className="dot-spinner scale-150 transform z-50">
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                </div>
            </div>
        </>
    )
}

