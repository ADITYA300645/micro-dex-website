import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import React from "react";
import WindowsAppInfo from "./ProctsInfoSections/WindowsAppInfo";



function ProductsInfo() {
    return (
        <div className="flex flex-col items-center justify-start bg-[#FFFFFF75] dark:bg-[#37373767]">
            <div className="w-11/12">
                <WindowsAppInfo></WindowsAppInfo>
                <WindowsAppInfo></WindowsAppInfo>
                <WindowsAppInfo></WindowsAppInfo>
            </div>
        </div>
    );
}

export default ProductsInfo;
