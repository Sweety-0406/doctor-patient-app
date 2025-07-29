"use client"
type Props = {
  activeTab: "pending" | "approved" | "rejected";
  setActiveTab: (tab: "pending" | "approved" | "rejected") => void;
};

export default function AppointmentTabs({ activeTab, setActiveTab }: Props) {
  const tabs = ["Pending", "Approved", "Rejected"];

  return (
    <div className="flex justify-around border-b">
      {tabs.map((tab) => {
        const key = tab.toLowerCase() as Props["activeTab"];
        const isActive = activeTab === key;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(key)}
            className={`py-2 px-4 cursor-pointer text-sm font-medium ${
              isActive ? "border-b-2 border-cyan-500 text-cyan-600" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
