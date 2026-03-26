// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx"; // Halaman utama Anda dengan carousel
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx"; // Komponen halaman detail baru
import NotFoundPage from "./pages/NotFoundPage.jsx"; // Komponen untuk halaman 404
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx"; // Komponen halaman kebijakan privasi
import "./index.css";

import RouterProvider from "./RouterProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/:projectName" element={<ProjectDetailPage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </RouterProvider>
  </React.StrictMode>,
);
