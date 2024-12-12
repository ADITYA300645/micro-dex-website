import React from "react";

export default function CentricCircle() {
    return (
        <div className="w-80 dark:bg-slate-800 bg-slate-100 dark:bg-opacity-70 rounded-full h-80 flex justify-center items-center mt-10 shadow">
            <div className="w-52 dark:bg-slate-600 bg-slate-400 dark:bg-opacity-70 rounded-full h-52 flex justify-center items-center animate-pulse shadow">
                <div className="w-32 dark:bg-slate-400 bg-slate-600 dark:bg-opacity-90 rounded-full h-32 flex justify-center items-center absolute shadow text-white text-2xl">AI</div>
                <div className="w-32 dark:bg-slate-400 dark:bg-opacity-90 rounded-full h-32 flex justify-center items-center "></div>
            </div>
        </div>
    );
}
