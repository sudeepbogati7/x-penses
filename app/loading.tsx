import React from "react";
import './loading.css';

export default function Loading() {
    return (
        <div className="w-full overflow-hidden z-40 absolute top-0 left-0 h-screen bg-black bg-opacity-50 flex items-center justify-center">
            <div className="dot-spinner">
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
    )
}

