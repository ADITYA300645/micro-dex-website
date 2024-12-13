import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import React from "react";
import WindowsAppInfo from "./ProctsInfoSections/WindowsAppInfo";
const josefin_Sans = Josefin_Sans({ subsets: ["latin"] });


function ProductsInfo() {
    return (
        <div className="flex flex-col items-center justify-start bg-[#FFFFFF75] dark:bg-[#37373767]">
            <div className="w-11/12">
                            <div
                                className={`w-full mx-5 px-5 mt-8 ${josefin_Sans.className}`}
                            >
                                Explore Our Products
                            </div>
                <WindowsAppInfo></WindowsAppInfo>
                <WindowsAppInfo></WindowsAppInfo>
            </div>
        </div>
    );
}

export default ProductsInfo;
