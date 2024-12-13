'use client'
import React from "react";

export default function Button({ children, onClick, className, ...props }) {
    return (
        <button
            className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
