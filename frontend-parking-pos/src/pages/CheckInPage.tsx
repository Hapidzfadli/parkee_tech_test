import { useState, useRef } from "react";
import { checkIn } from "../services/api";
import Tesseract from "tesseract.js";

const CheckInPage = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [message, setMessage] = useState("");
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateNumber.trim()) {
      setMessage("Plate number cannot be empty");
      return;
    }
    try {
      const response = await checkIn(plateNumber);
      setMessage(response.data.message);
      setCheckInTime(new Date().toLocaleString());
    } catch (error) {
      if (error instanceof Error) {
        if ((error as any).response) {
          setMessage((error as any).response.data.message || "Check-in failed");
        } else {
          setMessage("Check-in failed due to network error");
        }
      } else {
        setMessage("An unexpected error occurred");
      }
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
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Check-In Parking</h2>

      {/* Input Manual */}
      <form onSubmit={handleCheckIn} className="flex flex-col gap-4">
        <label className="font-semibold">Enter Plate Number</label>
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="B 1234 XYZ"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Check-In
        </button>
      </form>

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

      {/* Informasi Check-in */}
      {checkInTime && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Check-In Details</h3>
          <p><strong>Plate Number:</strong> {plateNumber}</p>
          <p><strong>Check-In Time:</strong> {checkInTime}</p>
        </div>
      )}

      {message && <p className="text-center text-green-500 mt-4">{message}</p>}
    </div>
  );
};

export default CheckInPage;
