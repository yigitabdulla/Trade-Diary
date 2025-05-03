
import { Avatar, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import '../styles/navbar.scss'
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Mode Switch' } };

export default function Navbar() {

  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.toggle('dark-mode', newMode);
      document.body.classList.toggle('light-mode', !newMode);
      return newMode;
    });
  };

  const [language, setLanguage] = useState('tr');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  return (
    <nav>
      <Link to={"/"}><h1>PipNote</h1></Link>
      <ul>
        <li><Select
          value={language}
          onChange={handleChange}
          className="language-select"
          disableUnderline
          variant="standard"
          sx={{
            '& .MuiSelect-select': {
              padding: 0,
            },
            '& .MuiInputBase-root': {
              border: 'none',
            },
            '&:before, &:after': {
              border: 'none',
            },
            minWidth: '40px', // Optional: you can control the width as needed
          }}
        >
          <MenuItem value={'tr'}>
            <Avatar sx={{ height: '20px', width: '20px', mx: 'auto' }} src="https://www.worldometers.info/img/flags/small/tn_tu-flag.gif" />
          </MenuItem>
          <MenuItem value={'en'}>
            <Avatar sx={{ height: '20px', width: '20px', mx: 'auto' }} src="https://www.worldometers.info/img/flags/small/tn_us-flag.gif" />
          </MenuItem>
          <MenuItem value={'de'}>
            <Avatar sx={{ height: '20px', width: '20px', mx: 'auto' }} src="https://www.worldometers.info/img/flags/small/tn_gm-flag.gif" />
          </MenuItem>
        </Select>
        </li>
        <li><Switch onChange={handleDarkMode} {...label} /> {isDarkMode ? 'Dark Mode' : 'Light Mode'}</li>
        <li><Link to={"/auth"}>Login</Link></li>
      </ul>
    </nav>
  )
}
