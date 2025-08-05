import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#60A5FA', '#8B5CF6', '#F87171', '#34D399', '#FBBF24'];

// ✅ Internal chart data
const chartData = [
  { name: 'Vaastu', value: 300 },
  { name: 'Tarot', value: 150 },
  { name: 'Numerology', value: 50 },
];

const PieChartSection = () => {
  return (
    <div className=" bg-white relative rounded-xl shadow-md flex flex-col items-center mx-2 w-full max-w-md min-h-[50vh]">
      <h3 className="text-xl font-bold text-gray-800 mt-4">Astrology Breakdown</h3>
      <div className="w-full h-[90%]">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartSection;


