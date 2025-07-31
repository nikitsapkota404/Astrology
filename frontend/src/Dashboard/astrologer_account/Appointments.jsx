import React from "react";
import { FormatDate } from "../../utils/FormatDate";

const Appointments = ({ appointments }) => {
  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Gender</th>
          <th scope="col" className="px-6 py-3">Payment</th>
          <th scope="col" className="px-6 py-3">Price</th>
          <th scope="col" className="px-6 py-3">Booked On</th>
        </tr>
      </thead>

      <tbody>
        {appointments?.length > 0 ? (
          appointments.map((item) => (
            <tr key={item._id} className="bg-white border-b">
              <td className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap">
                <img
                  src={item.user?.photo || "/default-avatar.jpg"} // Default photo if none exists
                  className="w-10 h-10 rounded-full"
                  alt={item.user?.name || "User"}
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">{item.user?.name || "Unknown User"}</div>
                  <div className="text-normal text-gray-500">{item.user?.email || "No email provided"}</div>
                </div>
              </td>
              <td className="px-6 py-4">{item.user?.gender || "Not provided"}</td>
              <td className="px-6 py-4">
                {item.isPaid ? (
                  <div className="flex items-center text-green-600 font-medium">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                    Paid
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 font-medium">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                    Pending
                  </div>
                )}
              </td>
              <td className="px-6 py-4">{item.ticketPrice || "N/A"}</td>
              <td className="px-6 py-4">{FormatDate(item.createdAt)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center py-4 text-gray-500">
              No appointments available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Appointments;