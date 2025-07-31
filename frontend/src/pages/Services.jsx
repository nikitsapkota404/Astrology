import React from 'react';
import ServiceList from "../components/services/serviceList"; 

const Services = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="xl:w-[550px] mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Astrological Services</h2>
          <p className="text-lg text-gray-600 mb-8">
            World-class astrological services. Our system provides unmatched, expert-based astrological services.
          </p>
        </div>
        <ServiceList />
      </div>
    </section>
  );
};

export default Services;
