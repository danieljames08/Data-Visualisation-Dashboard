import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useWebSocket } from './hooks/useWebSocket';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function SalesBarChart() {
  const realTimeData = useSelector((state) => state.data.realTimeData);

  const [selectedMonth, setSelectedMonth] = useState('All');

  // Establish WebSocket connection
  useWebSocket('ws://localhost:8080');

  if (!realTimeData || realTimeData.length === 0) {
    return <div>Loading real-time data...</div>;
  }

  // console.log("real dataaaaaaa",realTimeData);

  const monthlyRevenue = realTimeData?.data?.salesPerformance?.monthlyRevenue || [];

  const filteredData =
    selectedMonth === 'All'
      ? monthlyRevenue
      : monthlyRevenue.filter((item) => item.month === selectedMonth);

  const chartData = filteredData.map((item) => ({
    month: item.month,
    revenue: item.revenue,
  }));

  const uniqueMonths = ['All', ...new Set(monthlyRevenue.map((item) => item.month))];

  return (
    <div className='flex flex-col items-center justify-center'>
      <div>
      <h3>Sales Performance </h3>

      <label className="mx-2" htmlFor="monthFilter">Filter by Month:</label>
      <select
        id="monthFilter"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {uniqueMonths.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      </div>
        
      <BarChart width={400} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
