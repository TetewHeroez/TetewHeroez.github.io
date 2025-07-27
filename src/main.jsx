// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx"; // Halaman utama Anda dengan carousel
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx"; // Komponen halaman detail baru
import NotFoundPage from "./pages/NotFoundPage.jsx"; // Komponen untuk halaman 404
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rute untuk halaman utama */}
        <Route path="/" element={<App />} />

        {/* Rute dinamis untuk halaman detail proyek */}
        <Route path="/project/:projectName" element={<ProjectDetailPage />} />

        {/* Rute fallback jika halaman tidak ditemukan */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
