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
        <Route path="/" element={<App />} />

        <Route path="/:projectName" element={<ProjectDetailPage />} />

        <Route path="*" element={<NotFoundPage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
