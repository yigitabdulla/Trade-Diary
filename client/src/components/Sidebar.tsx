import { Link } from "react-router-dom"
import "../styles/sidebar.scss"

export default function Sidebar(props: any) {

  console.log(props.pathname)
  return (
    <div className='sidebar-container'>
      <h3>Abdulla Yiğit</h3>
      <ul className="sidebar">
        <Link to={"/dashboard"}><li className={props.pathname === "/dashboard" ? "active" : ""}>Dashboard</li></Link>
        <Link to={"/trades"}><li className={props.pathname === "/trades" ? "active" : ""}>Trades</li></Link>
        <Link to={"/contact"}><li className={props.pathname === "/contact" ? "active" : ""}>Contact</li></Link>

      </ul>
    </div>
  )
}
