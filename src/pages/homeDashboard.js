import SalesBarChart from "../components/barChart";
import NavBar from "../components/navBar";
import ShowScatterChart from "../components/scatterChart";
import ShowRadialBarChart from "../components/radialBarChart";
import ShowPieChart from "../components/pieChart";
import DisplayTableData from "../components/performanceTable";
import { Card, CardBody } from "react-bootstrap";

export default function HomeDashboard() {
    return (
        <>
            <NavBar />
            <div className="w-[99%] h-auto mx-auto my-2.5 flex flex-col gap-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Card className="cards">
                        <CardBody className="cards-body">
                            <SalesBarChart />
                        </CardBody>
                    </Card>
                    <Card className="cards">
                        <CardBody className="cards-body">
                            <ShowScatterChart />
                        </CardBody>
                    </Card>
                    <Card className="cards">
                        <CardBody className="cards-body">
                            <DisplayTableData />
                        </CardBody>
                    </Card>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <Card className="cards">
                        <CardBody className="cards-body">
                            <ShowRadialBarChart />
                        </CardBody>
                    </Card>
                    <Card className="cards">
                        <CardBody className="cards-body">
                            <ShowPieChart />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
