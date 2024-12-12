import React from "react";
import { MdSearch } from "react-icons/md";

function ProjectSearchBar() {
    return (
        <div>
            <div className="justify-center flex mt-8 items-center">
                <input className="w-[42rem] h-12 rounded-full px-6 py-2 outline-none text-[#555] dark:text-[#aaa] font-medium"
                placeholder="search for projects"
                ></input>
                <div className="bg-white dark:bg-black p-[10px] mx-3 rounded-full flex justify-center items-center">
                    <MdSearch size={24}></MdSearch>
                </div>
            </div>
        </div>
    );
}

export default ProjectSearchBar;
