import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function AskAI() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [previousResponses, setPreviousResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim()) {
            alert("Please enter a question");
            return;
        }

        setResponse("");
        setLoading(true);

        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                apikey: process.env.NEXT_PUBLIC_AI_API,
            },
            body: JSON.stringify({
                responseMode: "stream",
                query: question,
                endpointId: "predefined-openai-gpt4o",
            }),
        };

        try {
            const res = await fetch(
                "https://api.on-demand.io/chat/v1/sessions/6752cd5d475490d84770c157/query",
                options
            );

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const reader = res.body?.getReader();
            if (!reader) {
                throw new Error("Readable stream is not supported or no data.");
            }

            const decoder = new TextDecoder("utf-8");
            let result = "";

            const processStream = async () => {
                let done = false;

                while (!done) {
                    const { value, done: streamDone } = await reader.read();
                    done = streamDone;

                    if (value) {
                        const chunk = decoder.decode(value, { stream: true });
                        const lines = chunk
                            .split("\n")
                            .filter((line) => line.trim() !== "");

                        for (const line of lines) {
                            if (line.startsWith("data:")) {
                                const jsonString = line.slice(5).trim();
                                try {
                                    const data = JSON.parse(jsonString);
                                    if (data.answer) {
                                        result += data.answer;
                                        setResponse(
                                            (prev) => prev + data.answer
                                        );
                                    }
                                } catch (err) {
                                    console.error("Error parsing JSON:", err);
                                }
                            }
                        }
                    }
                }
            };

            await processStream();

            // Save the question and response
            setPreviousResponses((prev) => [
                ...prev,
                { question, response: result.trim() || "No response." },
            ]);
        } catch (err) {
            console.error("Fetch error:", err);
            setResponse("An error occurred while processing your request.");
        } finally {
            setLoading(false);
        }

        setQuestion("");
    };

    return (
        <div className="mt-8">
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
                Ask AI
            </h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 px-4 py-3"
            >
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl focus:outline-0 focus:ring-0 border border-[#dce0e5] dark:bg-slate-800 dark:backdrop-blur-2xl dark:bg-opacity-35 focus:border-[#dce0e5] min-h-36 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                    disabled={loading}
                ></textarea>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                        disabled={loading}
                    >
                        <span className="truncate">
                            {loading ? "Loading..." : "Submit"}
                        </span>
                    </button>
                </div>
            </form>
            {response && (
                <div className="px-4 py-3 mt-4 border rounded-xl bg-gray-100 dark:bg-slate-800">
                    <h3 className="font-bold">Response:</h3>
                    <ReactMarkdown className="whitespace-pre-wrap break-words text-sm mt-2">
                        {response || "No response yet."}
                    </ReactMarkdown>
                </div>
            )}

            {previousResponses.length > 1 && (
                <div className="mt-6 px-4">
                    <h3 className="text-lg font-bold">
                        Previous Questions and Responses:
                    </h3>
                    <ul className="mt-2 space-y-4">
                        {previousResponses.slice(0, -1).map((item, index) => (
                            <li
                                key={index}
                                className="border rounded-lg p-4 bg-gray-50 dark:bg-slate-700"
                            >
                                <p className="font-semibold opacity-40">
                                    {item.question}
                                </p>
                                <p className="font-semibold my-2 w-full bg-[#999] h-[0.5px]"></p>
                                <ReactMarkdown className="text-sm whitespace-pre-wrap">
                                    {item.response}
                                </ReactMarkdown>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
