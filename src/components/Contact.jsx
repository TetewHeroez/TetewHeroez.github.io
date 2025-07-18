import React, { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Instagram, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Hook untuk animasi scroll
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(
              (prev) => new Set([...prev, entry.target.dataset.animateId])
            );
          } else {
            // Hapus dari set agar bisa mengulang animasi
            setVisibleElements((prev) => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.dataset.animateId);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observerRef.current = observer;

    // Observe all elements with data-animate-id
    const elementsToObserve = document.querySelectorAll("[data-animate-id]");
    elementsToObserve.forEach((el) => observer.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      id="contact"
      className="min-h-screen py-20 pt-32 bg-gradient-to-br from-cyan-900 via-teal-800 to-blue-900 relative overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-800/60 via-teal-700/40 to-blue-800/50 opacity-80 animate-pulse-slow"></div>

      {/* Live Animated Gradient Layers */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse at 25% 75%, rgba(6, 182, 212, 0.3) 0%, transparent 60%),
            radial-gradient(ellipse at 75% 25%, rgba(20, 184, 166, 0.25) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
          `,
          animation: "gradientFloat 18s ease-in-out infinite",
        }}
      ></div>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(60deg, rgba(6, 182, 212, 0.1) 0%, transparent 30%, rgba(20, 184, 166, 0.15) 50%, transparent 70%, rgba(14, 165, 233, 0.1) 100%)
          `,
          animation: "gradientWave 25s linear infinite",
        }}
      ></div>

      {/* Mathematical Background with Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-8 text-9xl text-cyan-300/20 font-light animate-pulse">
          ∫
        </div>
        <div
          className="absolute bottom-32 right-8 text-9xl text-teal-400/15 font-light animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          ∑
        </div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-blue-300/10 font-light animate-spin"
          style={{ animationDuration: "20s" }}
        >
          ∞
        </div>
        <div
          className="absolute top-20 right-20 text-4xl text-cyan-200/25 font-light animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          ∂
        </div>
        <div
          className="absolute bottom-20 left-20 text-5xl text-teal-300/15 font-light animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        >
          π
        </div>
        <div
          className="absolute top-1/3 left-1/4 text-3xl text-blue-300/20 font-light animate-pulse"
          style={{ animationDelay: "3s" }}
        >
          θ
        </div>
        <div
          className="absolute bottom-1/3 right-1/4 text-4xl text-cyan-200/15 font-light animate-bounce"
          style={{ animationDuration: "5s", animationDelay: "0.5s" }}
        >
          √
        </div>
      </div>

      <style>{`
        @keyframes gradientFloat {
          0%, 100% {
            transform: scale(1) rotate(0deg) translate(0, 0);
          }
          33% {
            transform: scale(1.1) rotate(120deg) translate(20px, -20px);
          }
          66% {
            transform: scale(0.9) rotate(240deg) translate(-20px, 20px);
          }
        }
        
        @keyframes gradientWave {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(100%) skewX(-15deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            visibleElements.has("contact-header")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          data-animate-id="contact-header"
        >
          <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-300 bg-clip-text text-transparent mb-6">
            Let's Connect
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-xl mx-auto font-light text-lg">
            Ready to explore mathematical solutions together?
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Contact Form */}
          <div
            className={`md:col-span-3 transition-all duration-1000 delay-200 ${
              visibleElements.has("contact-form")
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
            data-animate-id="contact-form"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-cyan-200/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-cyan-300">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-cyan-200/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 font-light text-white placeholder-gray-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-cyan-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-cyan-200/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 font-light text-white placeholder-gray-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-cyan-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/20 border border-cyan-200/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none font-light text-white placeholder-gray-200"
                    placeholder="Share your ideas..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-medium hover:scale-[1.02] transition-all duration-300 shadow-lg hover:from-cyan-400 hover:to-teal-400"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className={`md:col-span-2 space-y-8 transition-all duration-1000 delay-400 ${
              visibleElements.has("contact-info")
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
            data-animate-id="contact-info"
          >
            {/* Direct Contact */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-cyan-200/20 shadow-2xl">
              <h3 className="text-xl font-medium text-white mb-6">
                Direct Contact
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center mt-1">
                    <MapPin className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Surabaya, Indonesia
                    </p>
                    <p className="text-gray-300 text-sm text-left">East Java</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-400/20 rounded-full flex items-center justify-center mt-1">
                    <Mail className="w-5 h-5 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      depichan18@gmail.com
                    </p>
                    <p className="text-gray-300 text-sm text-left">
                      Email me anytime
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-400/20 rounded-full flex items-center justify-center mt-1">
                    <Phone className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">+62 851-5630-2120</p>
                    <p className="text-gray-300 text-sm text-left">
                      Available 9AM - 6PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-cyan-200/20 shadow-2xl">
              <h3 className="text-xl font-medium text-white mb-6">
                Social Links
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://github.com/depichan18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-400/20 hover:border-gray-300/40 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gray-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Github className="w-6 h-6 text-gray-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    GitHub
                  </span>
                </a>

                <a
                  href="https://linkedin.com/in/devirosa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-4 rounded-xl border border-cyan-200/20 hover:border-cyan-300/40 hover:bg-cyan-500/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="w-6 h-6 text-cyan-300" />
                  </div>
                  <span className="text-sm font-medium text-cyan-300">
                    LinkedIn
                  </span>
                </a>

                <a
                  href="mailto:depichan18@gmail.com"
                  className="flex flex-col items-center gap-3 p-4 rounded-xl border border-teal-200/20 hover:border-teal-300/40 hover:bg-teal-500/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-teal-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-teal-300" />
                  </div>
                  <span className="text-sm font-medium text-teal-300">
                    Email
                  </span>
                </a>

                <a
                  href="https://instagram.com/devirosaa24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-4 rounded-xl border border-pink-200/20 hover:border-pink-300/40 hover:bg-pink-500/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-pink-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Instagram className="w-6 h-6 text-pink-300" />
                  </div>
                  <span className="text-sm font-medium text-pink-300">
                    Instagram
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mathematical Quote */}
        <div
          className={`text-center py-8 border-t border-cyan-300/20 transition-all duration-1000 delay-600 ${
            visibleElements.has("contact-quote")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          data-animate-id="contact-quote"
        >
          <div className="inline-flex items-center gap-4 text-gray-300">
            <span className="text-2xl text-cyan-400">∂</span>
            <p className="font-light italic">
              "Mathematics is the language in which God has written the
              universe"
            </p>
            <span className="text-2xl text-teal-400">∫</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">- Galileo Galilei</p>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-gray-400 font-light">
            © {new Date().getFullYear()} Devi Rosa Aprilla. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
