# 🚗 Parking POS - Frontend (React TypeScript)

Frontend aplikasi **Parking POS** dibangun dengan **React TypeScript** dan **Tailwind CSS**.  
Aplikasi ini memungkinkan pengguna untuk **check-in kendaraan, check-out, dan melihat status parkir**.

---

## 📌 Fitur

✅ **Check-in Kendaraan**

- Input manual nomor kendaraan
- Deteksi plat nomor dengan kamera

✅ **Check-out Kendaraan**

- Input manual atau deteksi plat nomor dengan kamera
- Hitung total biaya parkir

✅ **Parking Status**

- Menampilkan daftar kendaraan yang masih parkir
- Informasi nomor plat & waktu check-in

✅ **Tampilan Modern dengan Sidebar Navigasi**

- Akses mudah ke semua halaman aplikasi
- Sidebar yang bisa diperbesar/diperkecil

---

## 🛠️ Instalasi & Menjalankan Frontend

### **1️⃣ Clone Repository**

```bash
git clone https://github.com/username/parking-pos.git
cd parking-pos/frontend

```

### **2️⃣ Install Dependencies**

```bash
npm install

```

### **3️⃣ Jalankan Frontend**

```bash
npm run dev

```

## 🔌 API Configuration

Pastikan src/services/api.ts menggunakan URL backend yang benar:

```bash
const API_BASE_URL = "http://localhost:8080/api/parking";

```
