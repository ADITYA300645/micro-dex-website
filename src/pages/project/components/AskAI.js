import { useState } from 'react';

export default function AskAI() {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the question to your AI backend
    console.log('Submitted question:', question);
    // Reset the input after submission
    setQuestion('');
  };

  return (
    <div className="mt-8">
      <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">Ask AI</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 py-3">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl focus:outline-0 focus:ring-0 border border-[#dce0e5] dark:bg-slate-800 dark:backdrop-blur-2xl dark:bg-opacity-35 focus:border-[#dce0e5] min-h-36 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}