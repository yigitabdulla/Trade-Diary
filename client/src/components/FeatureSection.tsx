import React from 'react';
import '../styles/featuresSection.scss';

interface FeatureItem {
  title: string;
  description: string;
  image: string; // New field
}

const features: FeatureItem[] = [
  {
    title: 'Effortless Trade Logging',
    description: 'Quickly and easily add your forex trades with all the necessary details.',
    image: 'https://cdn.pixabay.com/photo/2023/02/12/13/28/business-7785093_1280.png',
  },
  {
    title: 'Insightful Performance Tracking',
    description: 'Visualize your trading performance with interactive charts and key metrics.',
    image: 'https://cdn.pixabay.com/photo/2023/02/12/13/28/business-7785093_1280.png',
  },
  {
    title: 'Admin Capabilities',
    description: 'Manage users and gain a comprehensive overview with the admin panel.',
    image: 'https://cdn.pixabay.com/photo/2023/02/12/13/28/business-7785093_1280.png',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="features">
      <div className="features-ontainer">
        <h2>Key Features</h2>
        <div className="features-list">
          {features.map((feature, index) => (
            <div
              className={`feature-item ${index % 2 === 1 ? 'reverse' : ''}`}
              key={index}
            >
              <div className="feature-image">
                <img src={feature.image} alt={feature.title} />
              </div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
