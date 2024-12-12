import React, { useEffect, useState } from "react";
import CentricCircle from "./Components/CentricCircle";
import { Inter, Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const josefin_Sans = Josefin_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

function Slogan() {
    const router = useRouter();
    const [rerender, setRerender] = useState(false);

    function loginWithGithub() {
        const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
        if (!githubClientId) {
            console.error("GitHub Client ID is not set");
            alert("Unable to initiate GitHub login. Please try again later.");
            return;
        }
        window.location.assign(
            `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=user,repo`
        );
    }

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            router.push("/dashboard");
        }
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        if (codeParam && !localStorage.getItem("accessToken")) {
            async function getAccessToken() {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/getAccessToken?code=${codeParam}`
                    );
                    const data = await response.json();
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        localStorage.setItem("userId", data.userId);
                        
                        // Store user info in localStorage
                        for (const key in data.userInfo) {
                            if (typeof data.userInfo[key] === 'string' || typeof data.userInfo[key] === 'number') {
                                localStorage.setItem(key, data.userInfo[key]);
                            }
                        }
                        
                        router.push("/dashboard");
                    }
                } catch (error) {
                    console.error("Error during authentication:", error);
                    alert("An error occurred during authentication. Please try again.");
                }
            }
            getAccessToken();
        }
    }, []);

    return (
        <div className="w-[68rem] flex justify-between items-center">
            <CentricCircle></CentricCircle>
            <div>
                <div
                    className={`${josefin_Sans.className} text-6xl w-[44rem] font-black mt-10 leading-[4.5rem]`}
                >
                    Empowering Your Code with AI and Insight
                </div>
                <div
                    className={`${inter.className} w-[32rem] tracking-widest mt-4`}
                >
                    We are not just tools we are an <b>Eco-System</b> to mark a
                    break through for your projects
                </div>
                <div className="flex [&>*]:mr-4 mt-5">
                    <button
                        onClick={loginWithGithub}
                        className="dark:border-2 dark:border-[#555] dark:bg-[#55555550] dark:text-[#fff] px-4 py-2 rounded bg-white"
                    >
                        sign up
                    </button>
                    <Link
                        href={"/templets"}
                        className="dark:border-2 dark:border-[#555] dark:bg-[#55555550]  px-4 py-2 rounded bg-white"
                    >
                        Explore Templets
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Slogan;