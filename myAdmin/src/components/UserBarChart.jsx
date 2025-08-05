import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const Userbarchart = () => {
  const [timePeriod, setTimePeriod] = useState('daily');

  const getChartData = () => {
    const data = {
      daily: [
        { name: 'Mon', sessions: 3 },
        { name: 'Tue', sessions: 2 },
        { name: 'Wed', sessions: 1 },
        { name: 'Thu', sessions: 2 },
        { name: 'Fri', sessions: 1 },
        { name: 'Sat', sessions: 3 },
        { name: 'Sun', sessions: 2 },
      ],
      weekly: [
        { name: 'Week 1', sessions: 14 },
        { name: 'Week 2', sessions: 12 },
        { name: 'Week 3', sessions: 11 },
        { name: 'Week 4', sessions: 10 },
      ],
      monthly: [
        { name: 'Jan', sessions: 45 },
        { name: 'Feb', sessions: 48 },
        { name: 'Mar', sessions: 51 },
        { name: 'Apr', sessions: 36 },
        { name: 'May', sessions: 45 },
        { name: 'Jun', sessions: 47 },
        { name: 'Jul', sessions: 48 },
        { name: 'Aug', sessions: 38 },
        { name: 'Sep', sessions: 37 },
        { name: 'Oct', sessions: 45 },
        { name: 'Nov', sessions: 46 },
        { name: 'Dec', sessions: 49 },
      ],
    };

    return data[timePeriod];
  };

  return (
    <>
      <main className="w-full max-w-screen-xl mx-auto px-4">
        <section className="bg-white p-4 rounded-xl shadow-lg flex flex-col">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-black">User Barchart</h2>

          <div className="flex  justify-center mb-4 gap-2">
            {['daily', 'weekly', 'monthly'].map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setTimePeriod(period)}
                className={`py-1 px-4 rounded-full font-medium transition-colors duration-200 ${
                  timePeriod === period
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-pressed={timePeriod === period}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
<ResponsiveContainer width="100%" height={270}>
  <BarChart
    data={getChartData()}
    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip
      contentStyle={{
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    />
    <Bar
      dataKey="sessions"
      fill="#3b82f6"
      barSize={24}
      radius={[10, 10, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>

        </section>
      </main>
    </>
  );
};

export default Userbarchart;
