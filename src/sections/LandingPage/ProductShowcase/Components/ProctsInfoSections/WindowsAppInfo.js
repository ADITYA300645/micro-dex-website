import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import React from "react";

const josefin_Sans = Josefin_Sans({ subsets: ["latin"] });

function WindowsAppInfo() {
    return (
        <div className="flex flex-col items-center justify-center mt-10 bg-white dark:bg-[#24242475] bg-opacity-50 rounded dark:rounded-xl my-6">
            <div className="flex flex-col items-center">
                <div
                    className={`w-full mx-5 px-5 mt-8 ${josefin_Sans.className}`}
                >
                    Explore Our Products
                </div>
                <Image
                    alt="Windows Image"
                    src={"/Images/WindowsAppSample.png"}
                    width={850}
                    height={850}
                    className="rounded-xl m-4 mt-8"
                />
                <div className="flex mx-5 items-start justify-between">
                    <div>
                        <div
                            className={`${josefin_Sans.className} font-semibold text-2xl text-[#444] dark:text-[#bbb]`}
                        >
                            Micro-Dex Desktop Application
                        </div>
                        <div className="w-[42rem] mt-6 text-xs font-medium text-[#555] mb-10 dark:text-[#aaa]">
                            project setup and management with a user-friendly
                            drag-and-drop interface. It allows developers to
                            visually organize and structure their projects,
                            reducing setup time by 50%. The application
                            integrates AI-powered tools to automate repetitive
                            tasks, such as generating boilerplate code, managing
                            dependencies, and setting up project configurations
                        </div>
                    </div>
                    <div className="flex [&>*]:mx-2">
                        <button className="bg-[#222] dark:bg-[#bbb] px-3 py-2 text-white dark:text-[#222] rounded">
                            Windows
                        </button>
                        <button className="bg-[#222] dark:bg-[#bbb] px-3 py-2 text-white dark:text-[#222] rounded">
                            Mac
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WindowsAppInfo;
