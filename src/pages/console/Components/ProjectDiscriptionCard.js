import React from "react";
import { FaCodeBranch, FaEye, FaGithub } from "react-icons/fa";
import { GiChariot } from "react-icons/gi";

function ProjectDescriptionCard({
    projectName,
    description,
    full_name,
    watchers,
    forks_count,
    projectId
}) {
    return (
        <a href={`project/${full_name}`}>
            <div className="w-full bg-white dark:bg-black dark:border-[#aaaaaa64] dark:bg-opacity-30 bg-opacity-40 border-[2px] shadow-xl rounded-xl border-[#8f8f8fac] border-opacity-55 h-64 p-4 flex flex-col justify-between transform hover:-translate-y-2 hover:cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
                {/* Project Title */}
                <div>
                    <div className="flex items-center space-x-2 text-lg font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 ease-in-out">
                        <FaGithub className="text-gray-500 dark:text-gray-300" />
                        <h2 className="dark:text-gray-100">{projectName}</h2>
                    </div>

                    {/* Project Description */}
                    <p className="mt-1 mx-6 w-9/12 text-sm text-gray-600 dark:text-gray-300">
                        {description}
                    </p>
                </div>

                {/* Stats Section */}
                <div>
                    <div className="opacity-45 font-semibold">{full_name}</div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                            {/* Stars */}
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors duration-300 ease-in-out">
                                <GiChariot className="mr-1" />
                                <span>Sarthi Project</span>
                            </div>
                            {/* Forks */}
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-300 ease-in-out">
                                <FaCodeBranch className="mr-1" />
                                <span>{forks_count}</span>
                            </div>
                            {/* Watchers */}
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors duration-300 ease-in-out">
                                <FaEye className="mr-1" />
                                <span>{watchers}</span>
                            </div>
                        </div>

                        {/* Language/Tech Used */}
                        <div className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300 ease-in-out">
                            <span>JavaScript</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default ProjectDescriptionCard;
