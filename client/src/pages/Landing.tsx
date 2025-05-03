import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeatureSection'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import "../styles/landing.scss"
import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Landing() {

  useEffect(() => {
    const toasts: { type: (msg: string, options?: ToastOptions) => string | number; text: string }[] = [
      { type: toast.success, text: "Welcome back, trader!" },
      { type: toast.info, text: "Trade data loaded successfully" },
      { type: toast.warning, text: "Don't be greedy!" },
      { type: toast.warning, text: "Don't take over risk, take profit." },
    ];

    toasts.forEach((toastItem, index) => {
      setTimeout(() => {
        toastItem.type(toastItem.text);
      }, index * 1500);
    });
  }, []);


  return (
    <>
      <div className='landing-container'>
        <HeroSection />
        <FeaturesSection />
        <CallToAction />
        <Footer />
      </div>
    </>
  )
}
