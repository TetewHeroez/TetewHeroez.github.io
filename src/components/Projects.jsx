import React, { useState, useEffect, useRef } from "react";
import {
  FaStore,
  FaGamepad,
  FaCalculator,
  FaUser,
  FaBrain,
  FaBook,
  FaLock,
  FaFileAlt,
  FaHeart,
  FaShoppingCart,
  FaComments,
  FaPaperPlane,
} from "react-icons/fa";
import {
  MdDashboard,
  MdGames,
  MdAccountBalance,
  MdWeb,
  MdSchool,
} from "react-icons/md";
import { HiOutlineDocumentText, HiOutlineHeart } from "react-icons/hi";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import Threads from "./anim/Threads";

// --- DATA & KONFIGURASI ---

const categories = {
  all: "All Projects",
  personal: "Personal",
  academic: "Academic",
  committee: "Committee",
  research: "Research",
  work: "Work",
};

const projectMetadata = {
  store: { icon: FaStore, gradientColor: "from-sky-400 to-cyan-400" },
  gamepad: { icon: FaGamepad, gradientColor: "from-slate-500 to-slate-700" },
  calculator: {
    icon: FaCalculator,
    gradientColor: "from-amber-500 to-orange-500",
  },
  account: {
    icon: MdAccountBalance,
    gradientColor: "from-emerald-500 to-green-600",
  },
  web: { icon: MdWeb, gradientColor: "from-indigo-500 to-blue-600" },
  school: { icon: MdSchool, gradientColor: "from-blue-500 to-sky-600" },
  book: { icon: FaBook, gradientColor: "from-orange-400 to-red-500" },
  lock: { icon: FaLock, gradientColor: "from-rose-500 to-pink-600" },
  document: { icon: FaFileAlt, gradientColor: "from-gray-500 to-gray-600" },
  heart: { icon: FaHeart, gradientColor: "from-red-500 to-rose-500" },
  cart: { icon: FaShoppingCart, gradientColor: "from-lime-500 to-green-500" },
  chat: { icon: FaComments, gradientColor: "from-violet-500 to-purple-600" },
  send: { icon: FaPaperPlane, gradientColor: "from-sky-400 to-emerald-500" },
  dashboard: {
    icon: MdDashboard,
    gradientColor: "from-fuchsia-500 to-purple-600",
  },
  brain: { icon: FaBrain, gradientColor: "from-pink-500 to-rose-500" },
  user: { icon: FaUser, gradientColor: "from-gray-400 to-gray-500" }, // Default
};

// --- KOMPONEN YANG DAPAT DIGUNAKAN KEMBALI & PRESENTASIONAL ---

const AnimatedBackground = () => (
  <>
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-100 to-cyan-100"></div>
      <div
        className="absolute inset-0 opacity-35"
        style={{
          background: `
            radial-gradient(circle at 25% 75%, rgba(56, 189, 248, 0.25) 0%, transparent 60%),
            radial-gradient(circle at 75% 25%, rgba(6, 182, 212, 0.20) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 70%)
          `,
          animation: "clearBlueGradientMove 16s ease-in-out infinite",
        }}
      ></div>
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `
            linear-gradient(45deg, rgba(56, 189, 248, 0.12) 0%, transparent 30%, rgba(6, 182, 212, 0.10) 50%, transparent 70%, rgba(14, 165, 233, 0.08) 100%)
          `,
          animation: "clearBlueGradientShift 22s linear infinite",
        }}
      ></div>
    </div>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-24 left-12 text-8xl text-sky-400/20 font-light animate-pulse">
        ∂
      </div>
      <div
        className="absolute bottom-24 right-12 text-8xl text-cyan-400/20 font-light animate-bounce"
        style={{ animationDuration: "5s" }}
      >
        ∫
      </div>
      <div
        className="absolute top-1/3 right-1/4 text-6xl text-blue-400/15 font-light animate-spin"
        style={{ animationDuration: "30s" }}
      >
        ∞
      </div>
      <div
        className="absolute bottom-1/3 left-1/4 text-5xl text-sky-500/20 font-light animate-pulse"
        style={{ animationDelay: "3s" }}
      >
        π
      </div>
      <div
        className="absolute top-1/2 left-16 text-4xl text-cyan-500/25 font-light animate-bounce"
        style={{ animationDuration: "7s", animationDelay: "2s" }}
      >
        √
      </div>
      <div
        className="absolute bottom-1/2 right-16 text-7xl text-blue-500/18 font-light animate-pulse"
        style={{ animationDelay: "4s" }}
      >
        Σ
      </div>
    </div>
    <style>{`
      @keyframes clearBlueGradientMove { 0%, 100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.08) rotate(90deg); } }
      @keyframes clearBlueGradientShift { 0% { transform: translateX(-30%) rotate(0deg); } 50% { transform: translateX(30%) rotate(120deg); } 100% { transform: translateX(-30%) rotate(240deg); } }
      @keyframes slideProgress { from { width: 0%; } to { width: 100%; } }
      @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
      .animate-fadein { animation: fadein 0.3s ease-out; }
      
      /* Custom Scrollbar Styles */
      .scrollbar-thin {
        scrollbar-width: thin;
        scrollbar-color: #67e8f9 #f1f5f9;
      }
      
      .scrollbar-thin::-webkit-scrollbar {
        width: 6px;
      }
      
      .scrollbar-thin::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 3px;
      }
      
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #67e8f9, #06b6d4);
        border-radius: 3px;
      }
      
      .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #22d3ee, #0891b2);
      }
    `}</style>
  </>
);

const ProjectsHeader = () => (
  <div className="text-center mb-16 scroll-animate" id="projects-header">
    <div className="inline-block">
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent mb-2 border-2 pb-2">
        My Projects
      </h2>
      <div className="w-32 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 mx-auto rounded-full mb-6"></div>
    </div>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
      Mathematical thinking meets modern development
    </p>
  </div>
);

const CategoryFilter = ({ activeCategory, onSelectCategory }) => (
  <div
    className="flex justify-center mb-12 scroll-animate scroll-animate-delay-1"
    id="category-filter"
  >
    <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-2 p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
      {Object.entries(categories).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onSelectCategory(key)}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeCategory === key
              ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg"
              : "text-gray-600 hover:text-cyan-600 hover:bg-cyan-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

const PrevIcon = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NextIcon = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const titleToSlug = (title) => {
  if (!title) return "";
  return title.replace(/\s+/g, "-");
};

const ProjectCard = ({ project, onImageClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const SLIDE_DURATION_MS = 6000;

  // --- PERBAIKAN 1: Reset timer gambar saat navigasi manual ---
  useEffect(() => {
    let intervalId = null;
    if (isHovered && project.images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, SLIDE_DURATION_MS);
    }
    return () => clearInterval(intervalId);
    // Tambahkan currentImageIndex sebagai dependensi
  }, [isHovered, project.images.length, currentImageIndex]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  const handleImageError = (e) => {
    e.target.style.display = "none";
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  const metadata = projectMetadata[project.icon] || projectMetadata.user;
  const IconComponent = metadata.icon;
  const gradientColor = metadata.gradientColor;
  const projectSlug = titleToSlug(project.title);

  return (
    <div
      className="w-full flex-shrink-0 px-3 scroll-animate"
      id={`project-${project.id}`}
    >
      <div
        className={`
          relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100/50 overflow-hidden
          transition-all duration-300 ease-in-out
          hover:border-cyan-200/50 
          hover:shadow-2xl hover:shadow-cyan-100/25 
          hover:-translate-y-2 
          hover:z-30
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientColor} z-10`}
        ></div>

        <div className="relative h-56 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {project.images.map((image, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center relative"
              >
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="max-w-full max-h-full object-contain cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onImageClick(image);
                  }}
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
              </div>
            ))}
          </div>
          {isHovered && project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50 transition-colors z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50 transition-colors z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div
                  key={`progress-${project.id}-${currentImageIndex}`}
                  className={`h-full bg-gradient-to-r ${gradientColor}`}
                  style={{
                    animation: `slideProgress ${
                      SLIDE_DURATION_MS / 1000
                    }s linear forwards`,
                  }}
                ></div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-4 pt-0">
          <div className="flex items-center mb-3 mt-4 px-2 justify-center">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <IconComponent className="text-lg text-cyan-600" />
            </div>
            <h3 className="flex-1 text-left text-lg font-bold text-cyan-800 mx-2 truncate">
              {project.title}
            </h3>
            <span
              className={`flex-shrink-0 inline-block px-2 py-1 text-xs font-medium rounded-full text-white bg-gradient-to-r ${gradientColor}`}
            >
              {project.category}
            </span>
          </div>

          <div
            className={`text-gray-600 text-sm leading-relaxed mb-3 font-light px-1 transition-all duration-300 ${
              isHovered
                ? "h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-300 scrollbar-track-gray-100"
                : "h-20 overflow-hidden"
            }`}
          >
            <ReactMarkdown>
              {isHovered ? project.detailedDescription : project.description}
            </ReactMarkdown>
          </div>

          {isHovered ? (
            <div className="mb-4 animate-fadein">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Key Features:
              </h4>
              <ul className="space-y-1">
                {project.features.slice(0, 3).map((feature, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></span>
                    <ReactMarkdown>{feature}</ReactMarkdown>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1 mb-3 h-full overflow-hidden">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg border border-gray-200/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {isHovered && (
            <div className="flex gap-2 mt-3 animate-fadein">
              {project.homepage ? (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-sky-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-200/50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdWeb className="text-sm" /> View Project
                </a>
              ) : (
                <Link
                  to={`/${projectSlug}`}
                  className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-sky-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-200/50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdWeb className="text-sm" /> View Details
                </Link>
              )}

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-cyan-300 hover:text-cyan-700 hover:bg-cyan-50 transition-all duration-300 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <FaFileAlt className="text-sm" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const useResponsiveProjects = () => {
  const getProjectsPerPage = () => {
    if (typeof window === "undefined") {
      return 3;
    }
    if (window.innerWidth < 768) {
      return 1;
    }
    if (window.innerWidth < 1024) {
      return 2;
    }
    return 3;
  };

  const [projectsPerPage, setProjectsPerPage] = useState(getProjectsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setProjectsPerPage(getProjectsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return projectsPerPage;
};

const ProjectCarousel = ({
  projects,
  currentPage,
  totalSlides,
  projectsPerPage,
  onImageClick,
  nextPage,
  prevPage,
  goToPage,
  autoSlideDuration,
}) => {
  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              style={{ flex: `0 0 ${100 / projectsPerPage}%` }}
              className="flex-shrink-0"
            >
              <ProjectCard project={project} onImageClick={onImageClick} />
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <div className="flex items-center justify-center mt-8 gap-4">
          <button
            onClick={prevPage}
            className="flex items-center justify-center text-cyan-600 hover:text-cyan-500 transition-all duration-300 hover:scale-125"
          >
            <PrevIcon />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 scale-125 shadow-lg"
                    : "bg-gray-300 hover:bg-cyan-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextPage}
            className="flex items-center justify-center text-cyan-600 hover:text-cyan-500 transition-all duration-300 hover:scale-125"
          >
            <NextIcon />
          </button>
        </div>
      )}
      {totalSlides > 1 && (
        <div className="mt-4 w-full max-w-md mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              key={`page-progress-${currentPage}`}
              className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full"
              style={{
                animation: `slideProgress ${
                  autoSlideDuration / 1000
                }s linear forwards`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

const ImagePopup = ({ image, onClose }) => {
  if (!image) return null;
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadein"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt="Project Popup"
          className="w-full h-full object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl leading-none hover:text-cyan-300"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT (Container) ---

const Projects = () => {
  const AUTO_SLIDE_DURATION_MS = 15000; // 15 detik

  // State for main page logic
  const [activeCategory, setActiveCategory] = useState("all");
  const [popupImage, setPopupImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageIntervalRef = useRef(null);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/projects-data.json");
        const data = await response.json();
        setProjectsData(data);
      } catch (error) {
        console.error("Gagal memuat data proyek:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          } else {
            entry.target.classList.remove("animate-in");
          }
        });
      },
      { root: null, rootMargin: "0px 0px -100px 0px", threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading, activeCategory, projectsData]);

  // Close popup on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setPopupImage(null);
    };
    if (popupImage) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [popupImage]);

  // Derived state for projects
  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const projectsPerPage = useResponsiveProjects();
  const slideStep = 1;
  const totalSlides = Math.ceil(filteredProjects.length / projectsPerPage);

  // Page navigation logic
  const nextPage = () => {
    if (totalSlides > 0) {
      setCurrentPage((prev) => (prev + 1) % totalSlides);
    }
  };
  const prevPage = () => {
    if (totalSlides > 0) {
      setCurrentPage((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };
  const goToPage = (index) => setCurrentPage(index);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  // Auto-slide page functionality
  useEffect(() => {
    if (totalSlides > 1) {
      if (pageIntervalRef.current) clearInterval(pageIntervalRef.current);
      pageIntervalRef.current = setInterval(nextPage, AUTO_SLIDE_DURATION_MS);
    }
    return () => clearInterval(pageIntervalRef.current);
  }, [totalSlides, currentPage, activeCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div id="projects" className="py-20 pt-32 px-6 relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 z-0">
        <Threads />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ProjectsHeader />

        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <ProjectCarousel
          projects={filteredProjects}
          currentPage={currentPage}
          totalSlides={totalSlides}
          projectsPerPage={projectsPerPage}
          onImageClick={setPopupImage}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
          autoSlideDuration={AUTO_SLIDE_DURATION_MS}
        />

        <ImagePopup image={popupImage} onClose={() => setPopupImage(null)} />
      </div>
    </div>
  );
};

export default Projects;
