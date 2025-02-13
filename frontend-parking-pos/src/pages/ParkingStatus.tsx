import { useEffect, useState } from "react";
import { getParkingStatus } from "../services/api";

const ParkingStatus = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchParkingStatus();
  }, []);

  const fetchParkingStatus = async () => {
    try {
      const response = await getParkingStatus();
      setVehicles(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch parking status.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Parking Status</h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && vehicles.length === 0 && (
        <p className="text-center text-gray-500">No vehicles currently parked.</p>
      )}

      {vehicles.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2">Plate Number</th>
              <th className="border border-gray-300 p-2">Check-In Time</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index} className="border border-gray-300 text-center">
                <td className="p-2">{vehicle.plate_number}</td>
                <td className="p-2">{new Date(vehicle.check_in_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ParkingStatus;
