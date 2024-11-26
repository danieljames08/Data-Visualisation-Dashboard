import { useSelector } from "react-redux"
import { useWebSocket } from "./hooks/useWebSocket";
import Table from 'react-bootstrap/Table';

export default function DisplayTableData() {

    const realTimeData = useSelector((state) => state.data.realTimeData);

    useWebSocket('ws://localhost:8080'); //update with the websocket url

    if (!realTimeData || realTimeData.length === 0) {
        return <div>Loading real time data...</div>
    }

    // console.log("performanceee data", realTimeData);

    const teamPerformanceData = realTimeData?.data?.teamPerformanceData || [];

    return (

        <div className="flex flex-col items-center justify-around">
            <h3>Table Data</h3>
            <Table className="table-height" striped bordered hover >
                <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Tasks Completed</th>
                        <th>Average Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teamPerformanceData.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {data.teamName}
                                </td>
                                <td>
                                    {data.tasksCompleted}
                                </td>
                                <td>
                                    {data.averageTaskTime}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>

    )
}