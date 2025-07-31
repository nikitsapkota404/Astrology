import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div
        onClick={toggleAccordion}
        className="flex items-center justify-between p-5 cursor-pointer transition-colors hover:bg-gray-50"
      >
        <h4 className="text-lg md:text-xl font-semibold text-gray-800">
          {item.question}
        </h4>
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 transition-all duration-300 ${
            isOpen ? "bg-purple-600 text-white border-transparent" : "bg-white text-gray-700"
          }`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>

      {isOpen && (
        <div className="px-5 pb-5 text-gray-600 text-sm md:text-base leading-relaxed">
          {item.content}
        </div>
      )}
    </div>
  );
};

export default FaqItem;
