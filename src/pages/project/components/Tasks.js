"use client";

import React from "react";
import { CheckCircle, Clock } from "lucide-react";

const TaskProgressBar = ({ progress }) => (
    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
            className="h-full bg-green-500 dark:bg-green-400 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
        ></div>
    </div>
);

export default function Tasks({ tasks }) {
    if (!tasks || tasks.length === 0) return <></>;

    return (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold leading-tight tracking-tight px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                Tasks
            </h2>
            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-200 dark:hover:bg-opacity-10 transition-colors duration-150 ease-in-out"
                    >
                        <div className="flex-shrink-0">
                            {task.progress === 100 ? (
                                <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400" />
                            ) : (
                                <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                            )}
                        </div>
                        <div className="flex-grow min-w-0">
                            <p className="text-gray-800 dark:text-gray-200 text-base font-medium leading-snug truncate">
                                {task.title}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-normal truncate mt-1">
                                {task.description}
                            </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <TaskProgressBar progress={task.progress} />
                            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                                {task.progress}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
