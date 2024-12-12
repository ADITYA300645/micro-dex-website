import Link from 'next/link';

export default function ProjectOverview({ title, department, activeTab, setActiveTab }) {
  const tabs = ['Overview', 'Tasks', 'Files', 'Members'];

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="tracking-light text-[32px] font-bold leading-tight">{title}</p>
          <p className="text-opacity-25 text-sm font-normal leading-normal">{department}</p>
        </div>
      </div>
      <div className="pb-3">
        <div className="flex border-b border-[#dce0e5] px-4 gap-8">
          {tabs.map((tab) => (
            <Link
              key={tab}
              href="#"
              className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                activeTab === tab
                  ? 'border-b-[#111418] dark:border-b-[#aaa] text-[#111418] dark:text-white'
                  : 'border-b-transparent text-[#777777]'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                activeTab === tab ? 'text-[#111418] dark:text-white' : 'text-[#a2a2a2]'
              }`}>
                {tab} 
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}