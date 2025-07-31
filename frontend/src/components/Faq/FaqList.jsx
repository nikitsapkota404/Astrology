import { faqs } from "./../../assets/data/faqs";
import FaqItem from "./FaqItem";

const FaqList = () => {
  return (
    <div className="mt-12 space-y-6">
      {faqs.map((item, index) => (
        <FaqItem item={item} key={index} />
      ))}
    </div>
  );
};

export default FaqList;
