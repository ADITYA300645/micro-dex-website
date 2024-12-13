import React from "react";
import { IoIosDesktop } from "react-icons/io";
import { VscVscode } from "react-icons/vsc";
import { AiOutlineMobile } from "react-icons/ai";
import { SiJirasoftware } from "react-icons/si";

function ProductsCategory() {
    return (
        <div className="flex flex-col items-center justify-start h-[46rem] bg-[#37373767] pl-5 sticky top-14 -z-10">
            <div className="m-4">Our Prodcts</div>
            <div className="w-[95%] hover:[&>*]:bg-white transition-all duration-150">
                <div className="my-[4px] bg-[#F0E3E790] py-4 px-2 rounded flex items-center [&>*]:mx-2">
                    <IoIosDesktop size={24}/>
                    <div>Desktop Application</div>
                </div>
                <div className="my-[4px] bg-[#F0E3E790] py-4 px-2 rounded flex items-center [&>*]:mx-2">
                    <VscVscode size={24}></VscVscode>Vs Code Extension
                </div>
                <div className="my-[4px] bg-[#F0E3E790] py-4 px-2 rounded flex items-center [&>*]:mx-2">
                    <AiOutlineMobile size={24}/>Mobile App
                </div>
                <div className="my-[4px] bg-[#F0E3E790] py-4 px-2 rounded flex items-center [&>*]:mx-2">
                    <SiJirasoftware size={24}/> Apllication Management
                </div>
            </div>
        </div>
    );
}

export default ProductsCategory;
