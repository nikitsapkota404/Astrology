import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
                <svg
                    viewBox="0 0 24 24"
                    className="text-green-600 w-16 h-16 mx-auto mb-6"
                >
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,2,4,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.18L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Payment Done!
                </h3>
                <p className="text-gray-600 mb-4">
                    Thank you for completing your secure online payment.
                </p>
                <p className="text-gray-700 mb-6">Have a great day!</p>
                <div className="py-4">
                    <Link
                        to="/home"
                        className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Go Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
