import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/images/about.jpg";
import aboutCardImg from "../../assets/images/about-card.png";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* about image */}
          <div className="relative w-full md:w-2/3 lg:w-1/2 xl:w-[600px] z-10 order-2 lg:order-1">
            <img
              src={aboutImg}
              alt="Website About"
              className="w-auto h-auto max-h-[500px] object-contain rounded-full"
            />
          </div>

          {/* about content */}
          <div className="w-full sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[970px] order-1 lg:order-2">
            <h2 className="heading">Our Commitment to Excellence</h2>
            <p className="text__para">
              Welcome to our platform! We are dedicated to providing top-notch services tailored to meet your unique needs. Whether you're looking for expert advice, seamless solutions, or personalized assistance, we've got you covered.
            </p>
            <p className="text__para mt-[30px]">
              With years of experience in the industry, we’ve developed an in-depth understanding of what works best for our clients. Our team is passionate about delivering high-quality services that make a difference and help you succeed.
            </p>
            <Link to="/about">
              <button className="btn">Learn More</button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
