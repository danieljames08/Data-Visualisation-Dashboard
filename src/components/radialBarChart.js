import * as React from 'react';
import { RadialBarChart, RadialBar, Tooltip, Legend } from "recharts";
import { useSelector } from 'react-redux';
import { useWebSocket } from './hooks/useWebSocket';
import { useState } from 'react';

export default function ShowRadialBarChart() {
  const realTimeData = useSelector((state) => state.data.realTimeData);

  // Establish WebSocket connection
  useWebSocket('ws://localhost:8080');

  const [selectedMetrics, setSelectedMetrics] = useState({
    totalVisits: true,
    uniqueVisitors: true,
    pageViews: true,
    averageSessionDuration: true,
    bounceRate: true,
  });

  if (!realTimeData || realTimeData.length === 0) {
    return <div>Loading real-time data...</div>;
  }

  const trafficMetrics = realTimeData?.data?.trafficMetrics || [];

  const convertDurationToSeconds = (duration) => {
    if (!duration || typeof duration !== "string") {
      return 0;
    }
    const [minutes, seconds] = duration.split("m ").map((val) => parseInt(val.replace("s", ""), 10));
    return minutes * 60 + seconds;
  };

  const metrics = [
    { key: "totalVisits", name: "Total Visits", value: trafficMetrics?.totalVisits, fill: "#8884d8" },
    { key: "uniqueVisitors", name: "Unique Visitors", value: trafficMetrics?.uniqueVisitors, fill: "#83a6ed" },
    { key: "pageViews", name: "Page Views", value: trafficMetrics?.pageViews, fill: "#8dd1e1" },
    { key: "averageSessionDuration", name: "Average Session Duration", value: convertDurationToSeconds(trafficMetrics?.averageSessionDuration), fill: "#82ca9d" },
    { key: "bounceRate", name: "Bounce Rate", value: trafficMetrics?.bounceRate, fill: "#a4de6c" },
  ];

  const filteredData = metrics.filter((metric) => selectedMetrics[metric.key]);

  const handleCheckboxChange = (key) => {
    setSelectedMetrics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3>Traffic Metrics</h3>

      <div className="grid grid-cols-2 mt-3">
        {metrics.map((metric) => (
          <label key={metric.key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedMetrics[metric.key]}
              onChange={() => handleCheckboxChange(metric.key)}
            />
            <span>{metric.name}</span>
          </label>
        ))}
      </div>

      <RadialBarChart
        width={500}
        height={500}
        innerRadius="20%"
        outerRadius="100%"
        data={filteredData}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          minAngle={15}
          label={{ fill: "#000", position: "insideStart" }}
          background
          clockWise
          dataKey="value"
        />
        <Tooltip />
        <Legend
          iconSize={10}
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ height: "40%" }}
        />
      </RadialBarChart>
    </div>
  );
}
