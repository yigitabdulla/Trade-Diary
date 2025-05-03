import React from 'react';
import '../styles/heroSection.scss';
import { Link } from 'react-router-dom';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LockIcon from '@mui/icons-material/Lock';

const HeroSection: React.FC = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <h1 className="fade-in-up">Unlock Your Trading Potential with PipNote</h1>
                <p className="lead fade-in-up delay-1">
                    PipNote empowers traders to take control of their trading journey. Track your performance, learn from your history, and build consistent strategies.
                </p>
                <ul className="features fade-in-up delay-2">
                    <li><ShowChartIcon/> Log every trade with precision and ease</li>
                    <li><BarChartIcon/> Visualize your trading metrics over time</li>
                    <li><EmojiObjectsIcon sx={{marginRight:'-1px'}}/>Gain insights to sharpen your strategy</li>
                    <li><LockIcon/> Your data is secure and private</li>
                </ul>
                <div className="buttons fade-in-up delay-3">
                    <Link to="/auth">
                        <button className="signup-button">Start Free Today</button>
                    </Link>
                    <button className="learn-more-button">Learn More</button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
