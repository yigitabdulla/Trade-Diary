import React from 'react';
import '../styles/callToAction.scss';

const CallToAction: React.FC = () => {
 return (
  <section className="cta">
   <div className="container">
    <h2>Ready to Take Control of Your Trading?</h2>
    <p>Sign up today and start your journey towards becoming a more informed and profitable forex trader.</p>
    <button className="signup-button">Sign Up Now</button>
   </div>
  </section>
 );
};

export default CallToAction;