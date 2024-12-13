"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function Timeline(props) {
    if (!props.timelineData || props.timelineData.length === 0) return <></>;

    return (
        <div className="mt-8">
            <h2 className="text-[22px] text-opacity-70 font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
                Timeline
            </h2>
            <div className="flex flex-wrap gap-4 px-4 py-6">
                <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dce0e5] p-6 bg-white bg-opacity-50 dark:bg-slate-700 dark:bg-opacity-50  ">
                    <p className=" text-base font-medium leading-normal">
                        Project Developemnt Progress
                    </p>
                    <br />
                    <div className="h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={props.timelineData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#637588"
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between mt-4">
                        {props.timelineData.map((data, index) => (
                            <p
                                key={index}
                                className="text-[#637588] text-[13px] font-bold leading-normal tracking-[0.015em]"
                            >
                                {data.date}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
