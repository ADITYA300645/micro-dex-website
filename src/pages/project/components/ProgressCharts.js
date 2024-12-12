import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const ProgressCharts = ({ taskCompletionData, memberPerformanceData }) => {
  return (
    <div className="flex flex-wrap gap-4 px-4 py-6">
      <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border bg-white dark:bg-black dark:border-[#5a5a5a] p-6">
        <p className="text-base font-medium leading-normal text-gray-800 dark:text-gray-200">
          Task Completion
        </p>
        <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={taskCompletionData} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis 
            dataKey="date" 
            stroke="#637588" 
            tickLine={false}
            axisLine={false}
            dy={10}
            tick={{ fill: '#637588', fontSize: 12 }}
          />
          <YAxis 
            stroke="#637588" 
            tickLine={false}
            axisLine={false}
            dx={-10}
            tick={{ fill: '#637588', fontSize: 12 }}
          />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Bar
            dataKey="completion"
            radius={[4, 4, 0, 0]}
            className="fill-blue-500 dark:fill-blue-400"
          />
        </BarChart>
      </ResponsiveContainer>
        </div>
      </div>
      <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border bg-white dark:bg-black dark:border-[#5a5a5a] p-6">
        <p className="text-base font-medium leading-normal text-gray-800 dark:text-gray-200">
          Member Performance
        </p>
        <div className="grid min-h-[180px] gap-x-4 gap-y-6 grid-cols-[auto_1fr] items-center py-3">
          {memberPerformanceData.map((member, index) => (
            <React.Fragment key={index}>
              <p className="text-[#637588] dark:text-[#a3b3c2] text-[13px] font-bold leading-normal tracking-[0.015em]">
                {member.name}
              </p>
              <div className="h-4 w-full bg-[#f0f2f4] dark:bg-[#2a2a2a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#637588] dark:bg-[#a3b3c2] rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${member.performance}%` }}
                >
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;