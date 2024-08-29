# Panduan Instalasi Project backend-perumahan

## Langkah-langkah Instalasi

1. Clone atau Download Repository

- Clone repository menggunakan git atau download file zip dari repository project.

2. Ekstrak File (Jika Download Zip)

3. Pastikan konfigurasi di dalam file .env sesuai dengan kebutuhan, terutama untuk koneksi database.
   Buat Database di MySQL

4. Buat database di MySQL sesuai dengan nama yang ada pada file .env (DB_NAME). Contoh: perumahan

5. Install Dependencies
   Lakukan instalasi dependencies dengan menjalankan perintah berikut di terminal:
   npm install

6. Jalankan Project
   Setelah instalasi selesai, jalankan project menggunakan nodemon:
   nodemon start
