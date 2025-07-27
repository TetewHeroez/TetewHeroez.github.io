// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-6xl md:text-9xl font-extrabold text-cyan-600">404</h1>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        Maaf, halaman yang Anda cari tidak ada atau mungkin telah dipindahkan.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-all duration-300"
      >
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
};

export default NotFoundPage;
