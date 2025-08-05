import { useState, useEffect } from "react";
import { ADMIN_BASE_URL } from "../../config.js";
import StatCard from "../components/StatCard";
import Userbarchart from "../components/UserBarChart";
import Peichart from "../components/peichart";
import AstrocardRate from "../components/AstrocardRate";
import { Star, Users } from "lucide-react";
import Header from "../components/Header";

const Dashboard = () => {
  const [stats, setStats] = useState({ totalAstrologers: 0, totalClients: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${ADMIN_BASE_URL}/admin/stats`);
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Header />
      <div className="h-full overflow-y-auto p-6">
        {/* Statistics Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard
            title="Total Astrologers"
            value={stats.totalAstrologers}
            icon={Star}
            bgColor="bg-purple-100"
            textColor="text-purple-800"
          />
          <StatCard
            title="Total Clients"
            value={stats.totalClients}
            icon={Users}
            bgColor="bg-green-100"
            textColor="text-green-800"
          />
        </section>

        {/* Chart Section */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex-1"><Userbarchart /></div>
             <div className="flex-1"><AstrocardRate /></div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1"><Peichart /></div>
           
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
