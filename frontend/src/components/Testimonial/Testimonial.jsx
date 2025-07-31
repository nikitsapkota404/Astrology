import React from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import clientAvatar from "../../assets/images/mulla.jpg";
import { HiStar } from "react-icons/hi";

const testimonials = [  
  {
    name: "Ain Mulla",
    text: "I was amazed by how accurate the horoscope was. The personalized astrology advice truly resonated with me!",
    rating: 5,
  },
  {
    name: "Kiran Thapa",
    text: "Very insightful predictions. I feel like I understand myself better now!",
    rating: 5,
  },
  {
    name: "Pooja Lama",
    text: "The daily horoscopes are my favorite! Great design and super informative.",
    rating: 5,
  },
  {
    name: "Rajesh Karki",
    text: "I wasn’t a believer before, but this app made me rethink everything. Spot on!",
    rating: 4,
  },
  {
    name: "Nisha Bhatta",
    text: "Easy to use and looks beautiful. Highly recommend to anyone interested in astrology.",
    rating: 5,
  },
  
    {
      name: "Ravi Khadka",
      text: "Loved the personalized readings. Felt very accurate to my current life events.",
      rating: 5,
    },
    {
      name: "Sita Adhikari",
      text: "The predictions were okay, but I hoped for a bit more detail.",
      rating: 3,
    },
    {
      name: "Prakash Gurung",
      text: "I use this app every morning now. It’s become a ritual!",
      rating: 5,
    },
    {
      name: "Anisha Sharma",
      text: "The design is clean and simple. Very beginner friendly.",
      rating: 4,
    },
    {
      name: "Dipesh Tamang",
      text: "Didn’t expect much, but I was genuinely surprised. Great stuff.",
      rating: 4,
    },
    {
      name: "Manisha KC",
      text: "Love the compatibility section. Helped me understand my partner better.",
      rating: 5,
    },
    {
      name: "Niraj Pokharel",
      text: "Solid app. Fast, accurate, and the UI is top-notch.",
      rating: 5,
    },
    {
      name: "Sunita Lama",
      text: "The predictions are sometimes vague, but entertaining.",
      rating: 3,
    },
    {
      name: "Aashish Bhattarai",
      text: "Helped me pick a lucky date for my event. Worked like a charm!",
      rating: 5,
    },
    {
      name: "Binita Magar",
      text: "Daily horoscopes are on point. Highly recommend!",
      rating: 5,
    },
    {
      name: "Kamal Shrestha",
      text: "Good astrology app but too many ads sometimes.",
      rating: 4,
    },
    {
      name: "Sarita Ghimire",
      text: "Feels like the stars are speaking to me. So good!",
      rating: 5,
    },
    {
      name: "Nabin Raut",
      text: "Was skeptical at first, but now I'm checking daily. Impressed!",
      rating: 4,
    },
    {
      name: "Puja Neupane",
      text: "Simple, beautiful, and insightful. I’m a fan.",
      rating: 5,
    },
    {
      name: "Keshav Basnet",
      text: "Good app, but notifications could be improved.",
      rating: 3,
    },
    {
      name: "Sweta Dhakal",
      text: "Very calming and reassuring insights every day.",
      rating: 5,
    },
    {
      name: "Rajendra Malla",
      text: "Astrology isn't my thing, but this app is well made.",
      rating: 3,
    },
    {
      name: "Sangita Rai",
      text: "Love the detailed birth chart feature. Super accurate!",
      rating: 5,
    },
    {
      name: "Bijay Kunwar",
      text: "App is fast and gives good insights. Just needs dark mode.",
      rating: 4,
    },
    {
      name: "Meena Joshi",
      text: "Perfect blend of tech and tradition. I love it!",
      rating: 5,
    }
  
  
];

const Testimonial = () => {
  return (
    <div className="mt-16">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 32 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-4">
                <img
                  src={clientAvatar}
                  alt="Client Avatar"
                  className="w-14 h-14 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <HiStar key={i} className="text-yellow-500 w-5 h-5" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                “{testimonial.text}”
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
