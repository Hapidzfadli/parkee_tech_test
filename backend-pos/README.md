# 🚗 Parking POS - Backend (Spring Boot)

Backend aplikasi **Parking POS** menggunakan **Spring Boot** untuk mengelola transaksi parkir.

## 📌 Fitur

✅ Check-in kendaraan  
✅ Check-out kendaraan & hitung biaya parkir  
✅ Melihat daftar kendaraan yang masih parkir  
✅ Melihat riwayat transaksi

---

## 📂 Struktur Proyek

# 🚗 Parking POS - Backend (Spring Boot)

Backend aplikasi **Parking POS** menggunakan **Spring Boot** untuk mengelola transaksi parkir.

## 📌 Fitur

✅ Check-in kendaraan  
✅ Check-out kendaraan & hitung biaya parkir  
✅ Melihat daftar kendaraan yang masih parkir  
✅ Melihat riwayat transaksi

---

## 🛠️ Instalasi & Menjalankan Backend

### **1️⃣ Clone Repository**

```bash
git clone https://github.com/username/parking-pos.git
cd parking-pos/backend
```

### 2️⃣ Konfigurasi Database

Buka src/main/resources/application.properties dan sesuaikan:

```bash
spring.datasource.url=jdbc:mysql://localhost:3306/parking_db
spring.datasource.username=root
spring.datasource.password=yourpassword
```

### 3️⃣ Jalankan Backend

Jalankan perintah berikut untuk memulai backend:

```bash
mvn spring-boot:run

```

## 🔌 API Endpoint

POST /api/parking/check-in Check-in kendaraan
POST /api/parking/checkout Check-out kendaraan & hitung biaya
GET /api/parking/status Daftar kendaraan yang masih parkir
GET /api/parking/status/{plateNumber} Detail kendaraan berdasarkan plat nomor
GET /api/parking/history Riwayat transaksi parkir

## 📦 Build & Deploy

### Build JAR file

```bash
mvn clean package

```

### Jalankan JAR file

```bash
java -jar target/parking-pos.jar

```
