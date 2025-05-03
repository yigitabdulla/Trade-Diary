
import '../styles/navbar.scss'
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Mode Switch' } };

export default function Navbar() {

    const [isDarkMode, setIsDarkMode] = useState(false)

    const handleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

  return (
    <nav>
        <Link to={"/"}><h1>PipNote</h1></Link>
        <ul>
            <li><Switch onChange={handleDarkMode} {...label} /> {isDarkMode ? 'Dark Mode' : 'Light Mode'}</li>
            <li><Link to={"/auth"}>Login</Link></li>
        </ul>
    </nav>
  )
}
