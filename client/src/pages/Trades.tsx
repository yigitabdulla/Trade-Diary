import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/trades.scss"
import CustomTable from "../components/CustomTable";

export default function Trades() {
  const location = useLocation();

  return (
    <div className="trades-container">
            <Sidebar pathname={location.pathname} />
            <div className="trades">
                <CustomTable />
            </div>
        </div>
  )
}
