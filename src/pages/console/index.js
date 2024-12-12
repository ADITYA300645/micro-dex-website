import Appbar from "@/components/Appbar/Appbar";
import ProjectSearchBar from "./Components/ProjectSearchBar";
import ProjectDiscriptionCard from "./Components/ProjectDiscriptionCard";
import { MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";

function Console() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getRepos() {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                try {
                    const octokit = new Octokit({ auth: accessToken });
                    const { data } = await octokit.repos.listForAuthenticatedUser({
                        sort: 'updated',
                        per_page: 100  // Adjust this number as needed
                    });
                    setRepos(data);
                } catch (error) {
                    console.error("Failed to fetch repos:", error);
                    setError("Failed to fetch repositories. Please try again later.");
                } finally {
                    setLoading(false);
                }
            } else {
                setError("No access token found. Please log in again.");
                setLoading(false);
            }
        }
        getRepos();
    }, []);

    return (
        <div>
            <div className="fixed -top-10 left-0 -z-30">
                <div className="absolute w-[110vw] h-[110vh] backdrop-blur-3xl bg-[#d9d9d983] dark:bg-[#48484871]"></div>
            </div>
            <Appbar
                links={{ Dashbord: "/dashboard", Account: "/account" }}
            ></Appbar>
            <div className="mt-[5.4rem]">
                <div>
                    <div className="justify-center flex mt-8 items-center">
                        <input
                            className="w-[42rem] h-12 rounded-full px-6 py-2 outline-none text-[#555] dark:text-[#aaa] font-medium"
                            placeholder="search for projects"
                        ></input>
                        <div className="bg-white dark:bg-black p-[10px] mx-3 rounded-full flex justify-center items-center">
                            <MdSearch size={24}></MdSearch>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 w-screen flex justify-center items-center">
                <div className="w-[80rem] p-12 grid grid-cols-2 gap-x-12 gap-y-4 ">
                    <div className="w-full items-center justify-center bg-white dark:bg-black dark:border-[#aaaaaa64] dark:bg-opacity-30 bg-opacity-40 border-[2px] shadow-xl rounded-xl border-[#8f8f8fac] border-opacity-55 h-64 p-4 flex flex-col transform hover:-translate-y-2 hover:cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
                        <div className="">
                            <div className="flex items-center justify-center space-x-2 text-lg font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 ease-in-out">
                                <h2 className="dark:text-gray-100 ">Add new Project</h2>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <div>Loading repositories...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        repos.map((git_repo) => (
                            <ProjectDiscriptionCard
                                key={git_repo.id}
                                projectId={git_repo.name}
                                description={git_repo.description}
                                projectName={git_repo.name}
                                full_name={git_repo.full_name}
                                watchers={git_repo.watchers_count}
                                forks_count={git_repo.forks_count}
                            ></ProjectDiscriptionCard>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Console;