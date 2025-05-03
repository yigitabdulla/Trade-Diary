import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.scss"
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Dashboard() {
    const location = useLocation();

    return (
        <div className="dashboard-container">
            <Sidebar pathname={location.pathname} />
            <div className="dashboard">
                <div className="bar-chart">
                    <BarChart
                        xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        height={300}
                    />
                </div>
                <div className="line-chart">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        height={300}
                    />
                </div>
                <div className="pie-chart">
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={200}
                        height={200}
                    />
                </div>
            </div>
        </div>
    )
}
