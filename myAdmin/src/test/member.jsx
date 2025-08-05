import React, { useState } from 'react';
import { Bell, ArrowUp, Filter, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// A simple component for a stat card
const StatCard = ({ title, value, icon, iconColor }) => {
  return (
    <div className="flex-1 p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between">
        <h4 className="text-gray-500 font-medium text-sm">{title}</h4>
        <div className={`p-2 rounded-full ${iconColor} text-white`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

// A component for the bar chart section
const BarChartSection = ({ title, filterOptions, weeklyData, monthlyData, yearlyData }) => {
  const [activeFilter, setActiveFilter] = useState('Weekly');

  let data;
  switch (activeFilter) {
    case 'Weekly':
      data = weeklyData;
      break;
    case 'Monthly':
      data = monthlyData;
      break;
    case 'Yearly':
      data = yearlyData;
      break;
    default:
      data = weeklyData;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md col-span-2 flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          {filterOptions.map((option) => (
            <button
              key={option}
              className={`text-sm px-3 py-1 rounded-full ${
                activeFilter === option
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setActiveFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      {/* Bar chart */}
      <div className="flex-1 mt-4 h-48 lg:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="customers" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <span>Increasing customers</span>
        <TrendingUp size={16} className="text-green-500" />
      </div>
    </div>
  );
};


// A component for the top astrologer list
const TopAstrologersList = ({ astrologers }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md col-span-2 lg:col-span-1 flex flex-col">
      <h3 className="text-xl font-bold text-gray-800">Top Astrologers</h3>
      <div className="flex-1 overflow-auto mt-4 space-y-4">
        {astrologers.map((astrologer, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl shadow-inner">
            <img src={astrologer.image} alt={astrologer.name} className="w-12 h-12 rounded-full object-cover mr-4" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{astrologer.name}</p>
              <p className="text-sm text-gray-500">{astrologer.specialization}</p>
            </div>
            <span className="font-bold text-lg text-gray-700">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Member component
const Member = () => {
  // Mock data
  const stats = {
    totalAstrologers: '12,567',
    activeAstrologers: '8,421',
    totalCalls: '32,100',
    activeCalls: '5,409',
  };

  const chartFilters = ['Weekly', 'Monthly', 'Yearly'];
  const astrologerData = [
    { name: 'Astrologer A', specialization: 'Vedic Astrology', image: 'https://placehold.co/100x100/3B82F6/fff?text=AA' },
    { name: 'Astrologer B', specialization: 'Tarot Reading', image: 'https://placehold.co/100x100/F97316/fff?text=AB' },
    { name: 'Astrologer C', specialization: 'Numerology', image: 'https://placehold.co/100x100/10B981/fff?text=AC' },
    { name: 'Astrologer D', specialization: 'Palmistry', image: 'https://placehold.co/100x100/6366F1/fff?text=AD' },
    { name: 'Astrologer E', specialization: 'Vedic Astrology', image: 'https://placehold.co/100x100/3B82F6/fff?text=AE' },
    { name: 'Astrologer F', specialization: 'Tarot Reading', image: 'https://placehold.co/100x100/F97316/fff?text=AF' },
  ];

  // Mock data for the bar chart
  const weeklyBarData = [
    { name: 'Mon', customers: 400 },
    { name: 'Tue', customers: 300 },
    { name: 'Wed', customers: 200 },
    { name: 'Thu', customers: 278 },
    { name: 'Fri', customers: 189 },
    { name: 'Sat', customers: 239 },
    { name: 'Sun', customers: 349 },
  ];
  
  const monthlyBarData = [
    { name: 'Week 1', customers: 1200 },
    { name: 'Week 2', customers: 1500 },
    { name: 'Week 3', customers: 1100 },
    { name: 'Week 4', customers: 1800 },
  ];

  const yearlyBarData = [
    { name: 'Q1', customers: 5000 },
    { name: 'Q2', customers: 6000 },
    { name: 'Q3', customers: 5500 },
    { name: 'Q4', customers: 7000 },
  ];

  // Pie chart data derived from astrologerData
  const pieData = astrologerData.reduce((acc, current) => {
    const existing = acc.find(item => item.name === current.specialization);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: current.specialization, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button className="relative p-2 rounded-full bg-white shadow-md">
            <Bell size={24} className="text-gray-600" />
            <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Astrologers" value={stats.totalAstrologers} icon={<ArrowUp size={16} />} iconColor="bg-blue-500" />
          <StatCard title="Active Astrologers" value={stats.activeAstrologers} icon={<ArrowUp size={16} />} iconColor="bg-green-500" />
          <StatCard title="Total Calls" value={stats.totalCalls} icon={<ArrowUp size={16} />} iconColor="bg-purple-500" />
          <StatCard title="Active Calls" value={stats.activeCalls} icon={<ArrowUp size={16} />} iconColor="bg-yellow-500" />
        </section>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content grid */}
          <section className="lg:col-span-2 grid grid-cols-1 gap-6">
            <BarChartSection 
              title="Monthly Data" 
              filterOptions={chartFilters}
              weeklyData={weeklyBarData}
              monthlyData={monthlyBarData}
              yearlyData={yearlyBarData}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PieChartSection title="Astrologist Niche Types" data={pieData} />
              <TopAstrologersList astrologers={astrologerData} />
            </div>
          </section>

          {/* Side content (if any) */}
          <section className="lg:col-span-1">
            {/* You can add more components here based on the sketch */}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Member;
