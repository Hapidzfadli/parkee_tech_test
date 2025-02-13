import { useState, useRef } from "react";
import { checkOut, getVehicleStatus } from "../services/api";
import Tesseract from "tesseract.js";

const CheckOutPage = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState<any>(null);
  const [message, setMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCheckOut = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await checkOut(plateNumber);
      setMessage(`Total Price: Rp${response.data.total_price}`);
      setVehicleInfo(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Check-out failed");
    }
  };

  const fetchVehicleStatus = async () => {
    try {
      const response = await getVehicleStatus(plateNumber);
      setVehicleInfo(response.data);
      setMessage("");
    } catch (error) {
      setMessage("Vehicle not found or not checked in.");
      setVehicleInfo(null);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera", error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        processImage(canvasRef.current);
      }
    }
  };

  const processImage = async (canvas: HTMLCanvasElement) => {
    const dataUrl = canvas.toDataURL("image/png");

    Tesseract.recognize(
      dataUrl,
      "eng",
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      const detectedPlate = text.trim();
      setPlateNumber(detectedPlate);
      fetchVehicleStatus();
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Check-Out Parking</h2>

      {/* Input Manual */}
      <div className="flex flex-col gap-4">
        <label className="font-semibold">Enter Plate Number</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="B 1234 XYZ"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
          />
          <button
            onClick={fetchVehicleStatus}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Check Status
          </button>
        </div>
      </div>

      {/* Kamera Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Scan License Plate</h3>
        <button
          onClick={startCamera}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Start Camera
        </button>
        <div className="mt-4 flex flex-col items-center">
          <video ref={videoRef} autoPlay className="border rounded w-64"></video>
          <canvas ref={canvasRef} width="300" height="150" className="hidden"></canvas>
          <button
            onClick={captureImage}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 hover:bg-yellow-700"
          >
            Capture & Detect Plate
          </button>
        </div>
      </div>

      {/* Informasi Kendaraan */}
      {vehicleInfo && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Vehicle Information</h3>
          <p><strong>Plate Number:</strong> {vehicleInfo.plate_number}</p>
          <p><strong>Check-In Time:</strong> {new Date(vehicleInfo.check_in_time).toLocaleString()}</p>
        </div>
      )}

      {/* Tombol Check-Out */}
      <form onSubmit={handleCheckOut} className="mt-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          disabled={!vehicleInfo}
        >
          Check-Out & Calculate Price
        </button>
      </form>

      {/* Pesan */}
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default CheckOutPage;
