import React, { useState, useEffect } from 'react';
import { Octokit } from "@octokit/rest";
import Appbar from "@/components/Appbar/Appbar";
import { Josefin_Sans } from "next/font/google";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

const josefin_Sans = Josefin_Sans({ subsets: ["latin"] });

const getFormattedDate = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const dayName = days[today.getDay()];
    const dayNumber = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();
    return { dayName, formattedDate: `${dayNumber} ${monthName} ${year}` };
};

const generateDummyCommitData = () => {
    return Array.from({ length: 52 }, (_, i) => ({
        week: new Date(Date.now() - (51 - i) * 7 * 24 * 60 * 60 * 1000).getTime() / 1000,
        total: Math.floor(Math.random() * 50)
    }));
};

const generateDummyLanguageData = () => {
    const languages = ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++'];
    return languages.map(lang => ({ name: lang, value: Math.floor(Math.random() * 100) }));
};

function Dashboard() {
    const [repos, setRepos] = useState([]);
    const [commitActivity, setCommitActivity] = useState(generateDummyCommitData());
    const [todoList, setTodoList] = useState([]);
    const [languageData, setLanguageData] = useState(generateDummyLanguageData());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { dayName, formattedDate } = getFormattedDate();

    useEffect(() => {
        const fetchGitHubData = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                setError("No access token found. Please log in.");
                setLoading(false);
                return;
            }

            const octokit = new Octokit({ auth: accessToken });

            try {
                const { data: userRepos } = await octokit.repos.listForAuthenticatedUser();
                setRepos(userRepos);

                if (userRepos.length > 0) {
                    const mostActiveRepo = userRepos.reduce((prev, current) =>
                        prev.stargazers_count > current.stargazers_count ? prev : current
                    );

                    const { data: commitData } = await octokit.repos.getCommitActivityStats({
                        owner: mostActiveRepo.owner.login,
                        repo: mostActiveRepo.name,
                    });
                    setCommitActivity(commitData.length > 0 ? commitData : generateDummyCommitData());

                    const { data: issues } = await octokit.issues.listForRepo({
                        owner: mostActiveRepo.owner.login,
                        repo: mostActiveRepo.name,
                        state: "open",
                        per_page: 5,
                    });
                    setTodoList(issues);

                    const langData = userRepos.slice(0, 5).map(repo => ({
                        name: repo.language || 'Unknown',
                        value: 1
                    }));
                    setLanguageData(langData);
                } else {
                    setError("No repositories found. Showing sample data.");
                }
            } catch (error) {
                console.error("Failed to fetch GitHub data:", error);
                setError("Failed to fetch data. Showing sample data.");
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    const commonCardStyle = "bg-white dark:bg-black dark:border-[#aaaaaa64] dark:bg-opacity-30 bg-opacity-40 border-[2px] shadow-xl rounded-xl border-[#8f8f8fac] border-opacity-55 p-4";

    return (
        <div className="min-h-screen">
            <Appbar
                links={{
                    Templets: "/templets",
                    Console: "/console",
                    Account: "/account",
                }}
            />
            <div className="fixed -top-10 left-0 -z-30">
                <div className="absolute w-[110vw] h-[110vh] backdrop-blur-3xl bg-[#d9d9d983] dark:bg-[#48484871]"></div>
            </div>
            <div className="w-screen flex justify-center">
                <div className="mt-14 px-12 w-[90rem]">
                    <div className={`${josefin_Sans.className} m-4`}>
                        <div className="text-5xl opacity-60">{dayName}</div>
                        <div className="text-xs opacity-60 mx-1">
                            {formattedDate}
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-80">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                    <strong className="font-bold">Error:</strong>
                                    <span className="block sm:inline"> {error}</span>
                                </div>
                            )}
                            <div className="mt-6 flex [&>*]:mx-2">
                                <div className={`w-9/12 ${commonCardStyle} h-80`}>
                                    <h2 className="text-xl font-bold mb-2">Commit Activity</h2>
                                    <ResponsiveContainer width="100%" height="100%" className="p-4">
                                        <LineChart data={commitActivity}>
                                            <XAxis dataKey="week" tickFormatter={(unixTime) => new Date(unixTime * 1000).toLocaleDateString()} />
                                            <YAxis />
                                            <Tooltip labelFormatter={(unixTime) => new Date(unixTime * 1000).toLocaleDateString()} />
                                            <Line type="monotone" dataKey="total" stroke="#8884d8" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className={`w-3/12 ${commonCardStyle} h-80 overflow-auto`}>
                                    <h2 className="text-xl font-bold mb-2">Todo List</h2>
                                    <ul>
                                        {todoList.length > 0 ? todoList.map((issue) => (
                                            <li key={issue.id} className="mb-2">
                                                <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {issue.title}
                                                </a>
                                            </li>
                                        )) : <li>No open issues found</li>}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-6 flex [&>*]:mx-2 my-6">
                                <div className={`w-full ${commonCardStyle} h-80 overflow-auto`}>
                                    <h2 className="text-xl font-bold mb-2">Top Repositories</h2>
                                    <ul>
                                        {repos.slice(0, 5).map((repo) => (
                                            <li key={repo.id} className="mb-2">
                                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {repo.name}
                                                </a>
                                                <span className="ml-2 text-sm text-gray-500">Stars: {repo.stargazers_count}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={`w-full ${commonCardStyle} h-80`}>
                                    <h2 className="text-xl font-bold mb-2">Repository Languages</h2>
                                    <ResponsiveContainer width="100%" height="80%">
                                        <BarChart data={languageData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="value" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className={`w-full ${commonCardStyle} h-80 overflow-auto`}>
                                    <h2 className="text-xl font-bold mb-2">Recent Activity</h2>
                                    <ul>
                                        {repos.slice(0, 5).map((repo) => (
                                            <li key={repo.id} className="mb-2">
                                                <span className="font-semibold">{repo.name}</span>
                                                <br />
                                                <span className="text-sm text-gray-500">
                                                    Last updated: {new Date(repo.updated_at).toLocaleDateString()}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;