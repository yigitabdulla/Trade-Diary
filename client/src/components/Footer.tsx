import React from 'react';
import '../styles/footer.scss';

const Footer: React.FC = () => {
 return (
  <footer>
   <div className="container">
    <p>© {new Date().getFullYear()} PipNote. All rights reserved.</p>
   </div>
  </footer>
 );
};

export default Footer;