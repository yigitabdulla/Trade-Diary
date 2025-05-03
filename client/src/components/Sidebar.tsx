import { Link } from "react-router-dom"
import "../styles/sidebar.scss"
import GridViewIcon from '@mui/icons-material/GridView';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function Sidebar(props: any) {

  console.log(props.pathname)
  return (
    <div className='sidebar-container'>
      <h3>Abdulla Yiğit</h3>
      <ul className="sidebar">
        <Link to={"/dashboard"}><li className={props.pathname === "/dashboard" ? "active" : ""}><GridViewIcon/>Dashboard</li></Link>
        <Link to={"/trades"}><li className={props.pathname === "/trades" ? "active" : ""}><CurrencyExchangeIcon/>Trades</li></Link>
        <Link to={"/contact"}><li className={props.pathname === "/contact" ? "active" : ""}><HelpOutlineIcon/>Contact</li></Link>

      </ul>
    </div>
  )
}
