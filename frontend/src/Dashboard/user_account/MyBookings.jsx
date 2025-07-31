import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import AstrologerCard from "../../components/Astologers/AstrologerCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const { data: appointments, loading, error } = useFetchData(
    `${BASE_URL}/users/appointments/my-appointments`
  );

  return (
    <div className="py-6 bg-gray-50 min-h-screen">
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && appointments?.length > 0 && (
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-medium text-gray-800 mb-4">My Bookings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {appointments.map((appointment) => (
              <AstrologerCard
                astrologer={appointment.astrologer}
                key={appointment._id}
              />
            ))}
          </div>
        </div>
      )}

      {!loading && !error && appointments?.length === 0 && (
        <h2 className="mt-5 text-red-500 text-lg text-center font-semibold">
          You haven’t booked yet!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
