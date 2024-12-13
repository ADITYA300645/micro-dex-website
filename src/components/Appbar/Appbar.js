import React from "react";
import ThemeSwitch from "../theme/themeSwitch";
import { Josefin_Sans } from "next/font/google";
import Link from "next/link";

const josefin_Sans = Josefin_Sans({ subsets: ["latin"] });

function Appbar({ links }) {
    return (
        <div className="h-14 bg-[#D9D9D9bf] dark:bg-[#202230] w-screen flex justify-center items-center fixed top-0 z-10 backdrop-blur-sm">
            <div className="flex justify-between items-center w-[90rem]">
                <div
                    className={`${josefin_Sans.className} font-black text-xl dark:text-[#eee] text-[#434343]`}
                >
                    Micro-Dex
                </div>
                <div className="flex [&>*]:mx-2">
                    {Object.entries(links).map(([label, path], index) => (
                        <Link
                            key={index}
                            href={path}
                            className="bg-white dark:bg-[#1A1F29] px-4 py-[0.3rem] rounded-full flex 
                                items-center justify-center hover:dark:bg-[#2c3546] hover:bg-[#ccc]
                                    dark:border-[#242424] dark:border-[1px] dark:py-2"
                        >
                            {label} {/* Link Label */}
                        </Link>
                    ))}
                    <div className=" rounded-full px-[0.3rem] flex justify-center items-center">
                        <ThemeSwitch></ThemeSwitch>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appbar;
