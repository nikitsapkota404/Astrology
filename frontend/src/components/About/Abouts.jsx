import React from "react";
import nikit from './../../assets/images/nikiy.jpg'

const AboutPage = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-5">
        {/* About Page Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[50px] lg:gap-[130px]">
          {/* Image Section */}
          <div className="relative w-full md:w-2/3 lg:w-1/2 xl:w-[600px]">
            <img
              src={nikit} 
              alt="About Us"
              className="w-auto h-auto max-h-[500px] object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Content Section */}
          <div className="w-full sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[970px]">
            <h2 className="text-3xl font-semibold text-headingColor mb-4">
              Our Commitment to Excellence
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to our platform! We are dedicated to providing top-notch services tailored to meet your unique needs. Whether you're looking for expert advice, seamless solutions, or personalized assistance, we've got you covered. Our goal is to ensure your success by delivering the highest quality services in every interaction.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              With years of experience in the industry, we’ve developed an in-depth understanding of what works best for our clients. Our team is passionate about delivering high-quality services that make a difference and help you succeed. Our approach is customer-centric, focusing on your satisfaction and long-term growth.
            </p>

            <h3 className="text-2xl font-semibold text-headingColor mb-4">Why Choose Us?</h3>
            <ul className="list-disc pl-6 mb-6 text-lg text-gray-700">
              <li>Expert guidance from industry professionals.</li>
              <li>Personalized services designed to fit your needs.</li>
              <li>Commitment to delivering the highest quality results.</li>
              <li>Transparent communication and reliable support.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-headingColor mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our mission is to provide innovative and effective solutions that help our clients navigate challenges and achieve success. We strive to build long-lasting relationships based on trust, integrity, and outstanding service.
            </p>

            <h3 className="text-2xl font-semibold text-headingColor mb-4">Join Us Today</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Whether you're a new customer or looking to learn more about our services, we welcome you to join our growing community. Explore our services, and let's work together to create the future you envision.
            </p>

            {/* Contact Button */}
            <a href="/contact">
              <button className="btn bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors">
                Get In Touch
              </button>
            </a>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-headingColor mb-6">What We Offer</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We offer a variety of services designed to address the needs of our clients. Whether you need personalized advice, professional consultation, or expert guidance, we are here to help.
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-700 mb-6">
            <li>Consultations with expert astrologers.</li>
            <li>Custom astrology charts and reports.</li>
            <li>Personalized guidance and advice tailored to your needs.</li>
            <li>24/7 customer support and assistance.</li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed">
            Our goal is to empower you with knowledge and insights, so you can make informed decisions that will lead to a better future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
