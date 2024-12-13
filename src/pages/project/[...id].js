'use client'

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Octokit } from "@octokit/rest";
import ProjectOverview from "./components/ProjectOverview";
import ProgressCharts from "./components/ProgressCharts";
import AskAI from "./components/AskAI";
import Timeline from "./components/Timeline";
import Tasks from "./components/Tasks";
import Appbar from "@/components/Appbar/Appbar";
import Alert from "./components/ui/alert";
import  AlertDescription  from "./components/ui/AlertDescription";
import  Button from "./components/ui/button";

export default function ProjectManagement() {
    const [activeTab, setActiveTab] = useState("Overview");
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [aiResponse, setAiResponse] = useState("");
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        async function fetchProjectData() {
            if (!id) return;

            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                setError("No access token found. Please log in again.");
                setLoading(false);
                return;
            }

            try {
                const octokit = new Octokit({ auth: accessToken });
                const [owner, repo] = id;

                if (!owner || !repo) {
                    throw new Error(
                        "Invalid repository format. Expected 'owner/repo'."
                    );
                }

                const { data: repoData } = await octokit.repos.get({
                    owner,
                    repo,
                });

                const { data: issuesData = [] } =
                    (await octokit.issues.listForRepo({
                        owner,
                        repo,
                        state: "all",
                        per_page: 100,
                    })) || [];

                let commitActivity = [];
                try {
                    const { data = [] } =
                        (await octokit.repos.getCommitActivityStats({
                            owner,
                            repo,
                        })) || {};
                    commitActivity = data;
                } catch (error) {
                    console.warn("Failed to fetch commit activity:", error);
                }

                const transformedData = {
                    title: repoData?.name || "N/A",
                    department: `${repoData?.language || "N/A"} @ ${owner}`,
                    taskCompletionData: Array.isArray(issuesData)
                        ? issuesData.slice(0, 5).map((issue) => ({
                              date: new Date(
                                  issue?.created_at
                              ).toLocaleDateString(),
                              completion: issue?.state === "closed" ? 100 : 50,
                          }))
                        : [],
                    memberPerformanceData: repoData?.contributors_url
                        ? (
                              await octokit.request(repoData.contributors_url)
                          ).data
                              .slice(0, 5)
                              .map((contributor) => ({
                                  name: contributor?.login || "Unknown",
                                  performance: contributor?.contributions || 0,
                              }))
                        : [],
                    timelineData: Array.isArray(commitActivity)
                        ? commitActivity
                              .filter((week) => week?.total > 0)
                              .map((week) => ({
                                  date: new Date(
                                      week?.week * 1000
                                  ).toLocaleDateString(),
                                  value: week?.total || 0,
                              }))
                              .slice(-5)
                        : [],
                    tasks: Array.isArray(issuesData)
                        ? issuesData.slice(0, 5).map((issue) => ({
                              title: issue?.title || "Untitled Task",
                              description:
                                  issue?.body || "No description available",
                              progress: issue?.state === "closed" ? 100 : 50,
                          }))
                        : [],
                };

                setProjectData(transformedData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch project data:", error);
                setError(`Failed to fetch project data: ${error.message}`);
                setLoading(false);
            }
        }

        fetchProjectData();
    }, [id]);

    const handleAddTask = () => {
        // Implement task addition logic here
        console.log("Add task clicked");
    };

    const handleAiResponse = (response) => {
        setAiResponse(response);
    };

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen error={error} />;
    if (!projectData) return <NoDataScreen />;

    return (
        <>
            <Appbar
                links={{
                    Templets: "/templets",
                    Console: "/console",
                    Account: "/account",
                }}
            />
            <div className="relative flex min-h-screen flex-col bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-20 dark:backdrop-blur-3xl backdrop-blur-xl overflow-x-hidden font-manrope">
                <Head>
                    <title>Project Design</title>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?display=swap&family=Manrope:wght@400;500;700;800&family=Noto+Sans:wght@400;500;700;900"
                    />
                </Head>

                <div className="px-4 md:px-40 flex flex-1 justify-center py-5 mt-12">
                    <div className="flex flex-col max-w-[960px] flex-1">
                        <ProjectOverview
                            title={projectData.title}
                            department={projectData.department}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {activeTab === "Overview" && (
                            <>
                                <ProgressCharts
                                    taskCompletionData={
                                        projectData.taskCompletionData
                                    }
                                    memberPerformanceData={
                                        projectData.memberPerformanceData
                                    }
                                />
                                <AskAI onResponse={handleAiResponse} />
                                {aiResponse && (
                                    <Alert className="mt-4">
                                        <AlertDescription>
                                            {aiResponse}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <Timeline
                                    timelineData={projectData.timelineData}
                                />
                                {projectData.timelineData.length > 0 ? (
                                    <Timeline
                                        timelineData={projectData.timelineData}
                                    />
                                ) : (
                                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                        <p className="text-center text-gray-600 dark:text-gray-400">
                                            No timeline data available.
                                        </p>
                                    </div>
                                )}

                                {projectData.tasks.length > 0 ? (
                                    <Tasks tasks={projectData.tasks} />
                                ) : (
                                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                        <p className="text-center text-gray-600 dark:text-gray-400">
                                            No tasks available.
                                        </p>
                                        <div className="mt-4 flex justify-center">
                                            <Button onClick={handleAddTask}>
                                                Add Task
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

const LoadingScreen = () => (
    <div className="relative flex min-h-screen flex-col bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-20 dark:backdrop-blur-3xl backdrop-blur-xl overflow-x-hidden">
        <Appbar
            links={{
                Templets: "/templets",
                Console: "/console",
                Account: "/account",
            }}
        />
        <div className="flex justify-center items-center mt-16">
            Loading project data...
        </div>
    </div>
);

const ErrorScreen = ({ error }) => (
    <div className="relative flex min-h-screen flex-col bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-20 dark:backdrop-blur-3xl backdrop-blur-xl overflow-x-hidden">
        <Appbar
            links={{
                Templets: "/templets",
                Console: "/console",
                Account: "/account",
            }}
        />
        <div className="flex justify-center items-center mt-16">{error}</div>
    </div>
);

const NoDataScreen = () => (
    <div className="relative flex min-h-screen flex-col bg-white bg-opacity-60 dark:bg-black dark:bg-opacity-20 dark:backdrop-blur-3xl backdrop-blur-xl overflow-x-hidden">
        <Appbar
            links={{
                Templets: "/templets",
                Console: "/console",
                Account: "/account",
            }}
        />
        <div className="flex justify-center items-center mt-16">
            No project data available
        </div>
    </div>
);
