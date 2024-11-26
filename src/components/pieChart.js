import { useSelector } from "react-redux";
import { useWebSocket } from "./hooks/useWebSocket";
import { Pie, PieChart, Cell, Legend, Tooltip } from "recharts";
import { useState } from "react";

export default function ShowPieChart() {

    const [selectedMetrics, setSelectedMetrics] = useState([
        "uptime",
        "Server 1 Load",
        "Server 2 Load",
        "Server 3 Load",
        "Server 4 Load",
        "Average Api Response Time",
        "Max Api Response Time",
        "Min Api Response Time",
        "Critical Errors",
        "Info Errors"
    ])
    const realTimeData = useSelector((state) => state.data.realTimeData);

    useWebSocket('ws://localhost:8080'); //update the websocket url

    if (!realTimeData || realTimeData.length === 0) {
        return <div>Loading real-time data...</div>;
    }

    // console.log("real piee dataaaa", realTimeData);

    const systemHealth = realTimeData?.data?.systemHealth || [];

    const systemHealthData = [

        { name: "uptime", value: systemHealth?.uptime },
        { name: "Server 1 Load", value: systemHealth?.serverLoad?.server1 },
        { name: "Server 2 Load", value: systemHealth?.serverLoad?.server2 },
        { name: "Server 3 Load", value: systemHealth?.serverLoad?.server3 },
        { name: "Server 4 Load", value: systemHealth?.serverLoad?.server4 },
        { name: "Average Api Response Time", value: systemHealth?.apiResponseTime?.average },
        { name: "Max Api Response Time", value: systemHealth?.apiResponseTime?.max },
        { name: "Min Api Response Time", value: systemHealth?.apiResponseTime?.min },
        { name: "Critical Errors", value: systemHealth?.errors?.critical },
        { name: "Critical Warning", value: systemHealth?.errors?.warning },
        { name: "Info Errors", value: systemHealth?.errors?.info },

    ];

    const filteredData = systemHealthData.filter((item => selectedMetrics.includes(item.name)));

    const COLORS = [
        '#4A90E2','#5C6BC0','#9575CD','#7E57C2','#42A5F5','#29B6F6', 
        '#26C6DA','#AB47BC','#EC407A','#FFA726','#FFCA28', '#66BB6A',
    ];
    
    const handleFilterChange = (metric) => {
        setSelectedMetrics((prevSelectedMetrics) => {
            if (prevSelectedMetrics.includes(metric)){
                return prevSelectedMetrics.filter(item => item !== metric);
            } else {
                return [...prevSelectedMetrics, metric];
            }
        });
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h3 >System Health Metrics</h3>
            <div className="grid grid-cols-2 mt-3">
                {systemHealthData.map((item) => (
                    <label key={item.name}>
                        <input className='mx-2'
                        type="checkbox" checked={selectedMetrics.includes(item.name)}
                        onChange={() => handleFilterChange(item.name)}
                        />
                        {item.name}
                    </label>
                ))}
            </div>

                <PieChart width={500} height={500}>
                    <Pie data={filteredData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="30%" outerRadius="60%" label paddingAngle={5} >
                        {filteredData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
        </div>
    );


}