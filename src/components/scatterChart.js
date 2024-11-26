import * as React from 'react';
import { useState } from 'react';
import { ScatterChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,Scatter } from "recharts";
import { useSelector } from 'react-redux';
import { useWebSocket } from './hooks/useWebSocket';

export default function ShowScatterChart() {
  const [visibleProducts, setVisibleProducts] = useState({
    ProductA: true,
    ProductB: true,
    ProductC: true,
  });

  const realTimeData = useSelector((state) => state.data.realTimeData);

  // Establish WebSocket connection
  useWebSocket('ws://localhost:8080'); 

  if (!realTimeData || realTimeData.length === 0) {
    return <div>Loading real-time data...</div>;
  }

  const topProducts = realTimeData?.data?.topProducts || [];

  const chartData1 = topProducts.filter((item) => item?.productName === "Product A");
  const chartData2 = topProducts.filter((item) => item?.productName === "Product B");
  const chartData3 = topProducts.filter((item) => item?.productName === "Product C");

  const allData = [...chartData1, ...chartData2, ...chartData3];
  const yMin = Math.min(...allData.map((item) => item.revenue));
  const yMax = Math.max(...allData.map((item) => item.revenue));

  const handleFilterChange = (product) => {
    setVisibleProducts((prev) => ({
      ...prev,
      [product]: !prev[product],
    }));
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h3>Top Products</h3>

      <div className='scatter-checkboxes'>
        <label>
          <input
            type="checkbox"
            checked={visibleProducts.ProductA}
            onChange={() => handleFilterChange('ProductA')}
            className='mx-2'
          />
          Product A
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleProducts.ProductB}
            onChange={() => handleFilterChange('ProductB')}
            className='mx-2'
          />
          Product B
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleProducts.ProductC}
            onChange={() => handleFilterChange('ProductC')}
            className='mx-2'
          />
          Product C
        </label>
      </div>

      <ScatterChart
        width={400}
        height={300}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="unitsSold" name="Units Sold" unit="units" />
        <YAxis
          type="number"
          dataKey="revenue"
          name="Revenue"
          unit="$"
          domain={[yMin, yMax]} 
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        {visibleProducts.ProductA && (
          <Scatter
            name="Product A"
            data={chartData1}
            fill="#8884d8" 
            shape="circle"
          />
        )}
        {visibleProducts.ProductB && (
          <Scatter
            name="Product B"
            data={chartData2}
            fill="#82CA9D" 
            shape="circle"
          />
        )}
        {visibleProducts.ProductC && (
          <Scatter
            name="Product C"
            data={chartData3}
            fill="#FFC658" 
            shape="circle"
          />
        )}
      </ScatterChart>
    </div>
  );
}
