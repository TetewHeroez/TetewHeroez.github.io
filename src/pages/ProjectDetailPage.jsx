// src/pages/ProjectDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// FIX 1: Hapus kurung kurawal '}' yang tidak perlu di akhir komentar
import NotFoundPage from "./NotFoundPage.jsx";

// Helper function untuk mengubah judul menjadi format URL (slug)
const titleToSlug = (title) => {
  if (!title) return "";
  return title.toLowerCase().replace(/\s+/g, "-");
};

const ProjectDetailPage = () => {
  const { projectName } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/projects-data.json");
        if (!response.ok) {
          throw new Error("Gagal memuat data proyek.");
        }
        const projects = await response.json();

        const foundProject = projects.find(
          (p) => titleToSlug(p.title) === projectName
        );

        // FIX 2: Kembalikan logika penggunaan state untuk menangani error
        // Jangan panggil komponen di sini. Cukup set state error.
        if (foundProject) {
          setProject(foundProject);
        } else {
          // Jika proyek tidak ditemukan, kita set state error.
          setError("Proyek tidak ditemukan.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Memuat Proyek...
      </div>
    );
  }

  // Jika ada error (termasuk "Proyek tidak ditemukan"), tampilkan halaman 404.
  if (error) {
    // Anda bisa memilih untuk menampilkan pesan error sederhana atau komponen 404 lengkap
    return <NotFoundPage />;
  }

  // FIX 3: Kembalikan pengecekan ini untuk mencegah error 'cannot read properties of null'
  // Ini sangat penting karena komponen dirender sebelum data siap.
  if (!project) {
    return null; // Atau pesan loading lain jika Anda mau
  }

  // Kode di bawah ini sekarang aman
  const exampleCode =
    project.exampleCode || `// Tidak ada contoh kode untuk proyek ini.`;
  const pdfUrl = project.pdfUrl;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <Link
          to="/"
          className="text-cyan-600 hover:underline mb-6 inline-block"
        >
          &larr; Kembali ke Semua Proyek
        </Link>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {project.title}
        </h1>
        <p className="text-gray-500 mb-6">{project.detailedDescription}</p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Galeri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${project.title} - Screenshot ${index + 1}`}
                className="rounded-lg w-full h-auto object-cover shadow-md"
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Fitur Utama
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {project.features.map((feature, index) => (
              <li key={index} className="text-gray-600">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Contoh Kode
          </h2>
          <div className="rounded-lg overflow-hidden">
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              showLineNumbers
            >
              {exampleCode}
            </SyntaxHighlighter>
          </div>
        </div>

        {pdfUrl && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Dokumentasi PDF
            </h2>
            <iframe
              src={pdfUrl}
              title={`Dokumentasi PDF untuk ${project.title}`}
              className="w-full h-[500px] border rounded-lg"
            >
              Browser Anda tidak mendukung iframe. Silakan unduh PDF{" "}
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                di sini
              </a>
              .
            </iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
