// scripts/resize-images.js
import sharp from "sharp";
import { glob } from "glob";
import fs from "fs";

// --- PENGATURAN ---
// Ubah pengaturan ini sesuai kebutuhan Anda.

// 1. Folder target berisi gambar yang akan diproses.
const TARGET_FOLDER = "public/images";

// 2. Batas ukuran file dalam KILOBYTE (KB).
//    Gambar dengan ukuran di atas ini akan diproses.
//    500 KB adalah nilai awal yang bagus.
const FILE_SIZE_THRESHOLD_KB = 500;

// 3. Lebar maksimum yang diinginkan untuk gambar (dalam piksel).
const MAX_WIDTH = 800;

// 4. Kualitas untuk gambar JPEG (antara 1 hingga 100).
const JPEG_QUALITY = 80;

// --- AKHIR PENGATURAN ---

// Fungsi utama untuk menjalankan proses
async function processImages() {
  console.log("Mencari gambar di folder target:", TARGET_FOLDER);
  const thresholdBytes = FILE_SIZE_THRESHOLD_KB * 1024;

  const imagePaths = await glob(`${TARGET_FOLDER}/**/*.{jpg,jpeg,png}`);

  if (imagePaths.length === 0) {
    console.log("Tidak ada gambar yang ditemukan.");
    return;
  }

  console.log(
    `Ditemukan ${imagePaths.length} gambar. Memulai pengecekan ukuran file...`
  );

  let processedCount = 0;
  let skippedCount = 0;

  for (const imagePath of imagePaths) {
    try {
      // Dapatkan informasi file, termasuk ukurannya dalam byte
      const stats = fs.statSync(imagePath);
      const fileSizeInBytes = stats.size;

      // Periksa apakah ukuran file melebihi batas
      if (fileSizeInBytes > thresholdBytes) {
        console.log(
          `⏳ Memproses: ${imagePath} (${(fileSizeInBytes / 1024).toFixed(
            2
          )} KB)`
        );

        const imageBuffer = fs.readFileSync(imagePath);

        const processedBuffer = await sharp(imageBuffer)
          .resize({
            width: MAX_WIDTH,
            fit: "inside",
            withoutEnlargement: true,
          })
          .jpeg({ quality: JPEG_QUALITY })
          .toBuffer();

        fs.writeFileSync(imagePath, processedBuffer);

        const newSizeInBytes = processedBuffer.length;
        console.log(
          `✅ Berhasil! Ukuran baru: ${(newSizeInBytes / 1024).toFixed(2)} KB`
        );
        processedCount++;
      } else {
        // Lewati file jika ukurannya sudah di bawah batas
        console.log(
          `⏭️  Melewati: ${imagePath} (${(fileSizeInBytes / 1024).toFixed(
            2
          )} KB) - Sudah optimal.`
        );
        skippedCount++;
      }
    } catch (error) {
      console.error(`❌ Gagal memproses ${imagePath}:`, error);
    }
  }

  console.log("\n🎉 Proses selesai!");
  console.log(`Diproses: ${processedCount}, Dilewati: ${skippedCount}`);
}

// Jalankan fungsi
processImages();
