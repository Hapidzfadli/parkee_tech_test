import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api/parking';

export const checkIn = async (plateNumber: string) => {
    return await axios.post(`${API_BASE_URL}/check-in`, { plateNumber });
};

export const checkOut = async (plateNumber: string) => {
    return await axios.post(`${API_BASE_URL}/checkout`, { plateNumber });
};
  
export const getVehicleStatus = async (plateNumber: string) => {
    return await axios.get(`${API_BASE_URL}/status/${plateNumber}`);
};

export const getParkingStatus = async () => {
    return await axios.get(`${API_BASE_URL}/status`);
  };