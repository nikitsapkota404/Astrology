import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleDelete = () => {
    // Add delete logic here (e.g., API call or modal confirmation)
    alert("Account delete clicked");
  };

  const handleTabClick = (action) => {
    if (action === "logout") handleLogout();
    else if (action === "delete") handleDelete();
    else setTab(action); // For bookings/settings
  };

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 bg-gray-100 border-r p-6 space-y-4">
              {/* Profile Info */}
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src={userData.photo}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
                />
                <h3 className="mt-3 text-lg font-semibold text-gray-800">
                  {userData.name}
                </h3>
                <p className="text-sm text-gray-500">{userData.email}</p>
                <p className="text-sm mt-1 text-gray-500">
                  Rashi:{" "}
                  <span className="text-indigo-600 font-medium">
                    {userData.rashi}
                  </span>
                </p>
              </div>

              {/* Navigation Buttons */}
              {["bookings", "settings", "logout", "delete"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleTabClick(item)}
                  className={`w-full text-left py-2 px-4 rounded-md font-medium transition ${
                    tab === item
                      ? "bg-indigo-600 text-white"
                      : item === "logout"
                      ? "hover:bg-gray-800 hover:text-white text-gray-800"
                      : item === "delete"
                      ? "hover:bg-red-600 hover:text-white text-red-600"
                      : "hover:bg-indigo-100 text-gray-700"
                  }`}
                >
                  {item === "bookings"
                    ? "My Bookings"
                    : item === "settings"
                    ? "Settings"
                    : item === "logout"
                    ? "Logout"
                    : "Delete Account"}
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 p-6">
              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
