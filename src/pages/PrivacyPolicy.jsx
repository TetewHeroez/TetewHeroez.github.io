// src/pages/PrivacyPolicy.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Cookie, Mail, Clock } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-cyan-400" />,
      title: "Informasi yang Kami Kumpulkan",
      content: [
        "Informasi yang Anda berikan secara langsung: Nama, alamat email, dan pesan yang Anda kirimkan melalui form kontak.",
        "Informasi otomatis: Data teknis seperti jenis browser, sistem operasi, dan alamat IP untuk keperluan analitik website.",
        "Informasi penggunaan: Halaman yang dikunjungi dan waktu yang dihabiskan di website untuk meningkatkan pengalaman pengguna.",
      ],
    },
    {
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      title: "Bagaimana Kami Menggunakan Informasi",
      content: [
        "Merespons pertanyaan atau pesan yang Anda kirimkan melalui form kontak.",
        "Meningkatkan kualitas dan performa website.",
        "Menganalisis tren penggunaan untuk pengembangan website yang lebih baik.",
        "Mengirimkan informasi terkait project atau update jika Anda memberikan persetujuan.",
      ],
    },
    {
      icon: <Cookie className="w-6 h-6 text-cyan-400" />,
      title: "Penggunaan Cookies",
      content: [
        "Website ini menggunakan cookies untuk meningkatkan pengalaman browsing Anda.",
        "Cookies digunakan untuk mengingat preferensi dan menyediakan fitur yang dipersonalisasi.",
        "Anda dapat mengatur browser untuk menolak cookies, namun beberapa fitur website mungkin tidak berfungsi optimal.",
      ],
    },
    {
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      title: "Keamanan Data",
      content: [
        "Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi Anda.",
        "Data yang dikirimkan melalui form kontak diproses dengan aman dan hanya digunakan untuk tujuan yang telah disebutkan.",
        "Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.",
      ],
    },
    {
      icon: <Mail className="w-6 h-6 text-cyan-400" />,
      title: "Tautan ke Website Lain",
      content: [
        "Website ini mungkin berisi tautan ke website eksternal seperti GitHub, LinkedIn, atau platform lainnya.",
        "Kami tidak bertanggung jawab atas praktik privasi atau konten dari website pihak ketiga tersebut.",
        "Kami menyarankan Anda untuk membaca kebijakan privasi dari setiap website yang Anda kunjungi.",
      ],
    },
    {
      icon: <Clock className="w-6 h-6 text-cyan-400" />,
      title: "Perubahan Kebijakan",
      content: [
        "Kebijakan privasi ini dapat diperbarui sewaktu-waktu.",
        "Perubahan akan diumumkan melalui halaman ini dengan tanggal pembaruan yang baru.",
        "Kami menyarankan Anda untuk memeriksa halaman ini secara berkala.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-blue-900/20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/25 mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Kebijakan Privasi
          </h1>
          <p className="text-slate-400 text-lg">
            Terakhir diperbarui: 5 Februari 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700/50 mb-8">
          <p className="text-slate-300 leading-relaxed">
            Selamat datang di website portfolio saya. Privasi Anda sangat
            penting bagi saya. Kebijakan privasi ini menjelaskan bagaimana saya
            mengumpulkan, menggunakan, dan melindungi informasi Anda saat
            menggunakan website ini.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-slate-700/50 rounded-xl">
                  {section.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 sm:p-8 border border-cyan-500/30">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Mail className="w-6 h-6 text-cyan-400" />
            Hubungi Kami
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau
            ingin menggunakan hak-hak Anda terkait data pribadi, silakan hubungi
            saya melalui{" "}
            <Link
              to="/#contact"
              className="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-300"
            >
              halaman kontak
            </Link>
            .
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Tetew Heroez. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
