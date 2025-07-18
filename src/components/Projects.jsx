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

// --- DATA & CONFIGURATION (Moved outside for clarity) ---

const projectsData = [
  {
    id: 1,
    title: "Depi Store Manager",
    description:
      "A modern store management app that streamlines inventory, sales, and reporting for small retail businesses.",
    detailedDescription:
      "Depi Store Manager is a desktop application designed to simplify daily operations in small retail stores. It offers features for managing product data, automating transactions, and generating insightful business reports. With a clean and user-friendly interface, store owners can efficiently track stock, monitor sales performance, and make data-driven decisions to grow their business.",
    category: "personal",
    tags: ["Java", "MySQL", "JavaFX", "Maven", "Apache POI", "OpenPDF"],
    gradientColor: "from-cyan-400 to-teal-400",
    icon: "📦",
    link: "https://github.com/depichan18/depistore-manager",
    github: "https://github.com/depichan18/depistore-manager",
    images: [
      "https://placehold.co/600x400/00FFFF/000000?text=Depi+Store+1",
      "https://placehold.co/600x400/20B2AA/FFFFFF?text=Depi+Store+2",
      "https://placehold.co/600x400/5F9EA0/FFFFFF?text=Depi+Store+3",
    ],
    features: [
      "Product and stock management (CRUD)",
      "Automated sales recording",
      "Business dashboard with analytics",
      "Printable daily, weekly, and monthly reports",
      "Quick search and sort functions",
    ],
  },
  {
    id: 2,
    title: "Paw Jump Game",
    description:
      "A 2D endless runner game where players dodge obstacles, collect fish, and level up to achieve high scores.",
    detailedDescription:
      "Paw Jump is an endless runner game inspired by the classic Dino Chrome experience. Players control a character that runs automatically and must jump or duck to avoid increasingly difficult obstacles while collecting fish to survive and progress. Every 250 meters, the game speeds up and introduces new challenges. With a lives system, level-up conditions, and special buff items, Paw Jump combines reflex-based gameplay with strategic item collection for a fun and addictive experience.",
    category: "academic",
    tags: ["Java", "Java Swing", "Game Development", "OOP", "2D Game"],
    gradientColor: "from-cyan-400 to-green-400",
    icon: "🐾",
    link: "https://github.com/depichan18/paw-jump",
    github: "https://github.com/depichan18/paw-jump",
    images: [
      "https://placehold.co/600x400/32CD32/FFFFFF?text=Paw+Jump+1",
      "https://placehold.co/600x400/228B22/FFFFFF?text=Paw+Jump+2",
      "https://placehold.co/600x400/006400/FFFFFF?text=Paw+Jump+3",
    ],
    features: [
      "Dynamic level progression and speed scaling",
      "Fish collection system for leveling up",
      "Lives and buffs for strategic survival",
      "Simple jump/drop controls with intuitive UI",
    ],
  },
  {
    id: 3,
    title: "Bookkeeping Application",
    description:
      "A complete accounting application with double-entry bookkeeping, financial reports, and CSV data import — all in a clean, modern interface.",
    detailedDescription:
      "This project is a fully functional double-entry accounting system built for small to medium businesses. It supports full Chart of Accounts management, transaction tracking with automatic validation, and generation of key financial reports like Trial Balance, Balance Sheet, and Income Statement — all exportable to PDF. With bulk CSV import for accounts and transactions, plus a modern, user-friendly UI, this application streamlines financial management while maintaining accounting standards.",
    category: "personal",
    tags: ["JavaFX", "Accounting", "SQLite", "JPA", "Hibernate", "Maven"],
    gradientColor: "from-green-400 to-green-400",
    icon: "🔄",
    link: "https://github.com/depichan18/bookkeeping-app",
    github: "https://github.com/depichan18/bookkeeping-app",
    images: [
      "https://placehold.co/600x400/8FBC8F/FFFFFF?text=Bookkeeping+1",
      "https://placehold.co/600x400/3CB371/FFFFFF?text=Bookkeeping+2",
      "https://placehold.co/600x400/2E8B57/FFFFFF?text=Bookkeeping+3",
    ],
    features: [
      "Full double-entry bookkeeping",
      "Chart of Accounts & transaction tracking",
      "Financial reports (PDF export)",
      "CSV data import for bulk entries",
    ],
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "A fast, responsive personal website to showcase projects, skills, and contact details with a clean, modern look.",
    detailedDescription:
      "This personal portfolio website is designed to highlight your work and skills in a professional yet creative way. Built for performance and responsiveness, it includes smooth animations, interactive visuals, and a unique mathematical theme that reflects analytical thinking. The interface adapts to all screen sizes and provides an engaging experience through subtle mouse interactions and floating elements.",
    category: "personal",
    tags: ["React", "JavaScript", "Vite.js", "Tailwind CSS", "Web Design"],
    gradientColor: "from-green-400 to-green-400",
    icon: "💰",
    link: "https://github.com/depichan18/portfolio-website",
    github: "https://github.com/depichan18/portfolio-website",
    images: [
      "https://placehold.co/600x400/6A5ACD/FFFFFF?text=Portfolio+1",
      "https://placehold.co/600x400/483D8B/FFFFFF?text=Portfolio+2",
      "https://placehold.co/600x400/7B68EE/FFFFFF?text=Portfolio+3",
    ],
    features: [
      "Interactive hero section",
      "Math-themed floating visuals",
      "Fully responsive layout",
      "Smooth animations with clean UI",
    ],
  },
  {
    id: 5,
    title: "OMITS 18 Math Problems",
    description:
      "A curated set of elementary-level math problems designed for the 18th National Mathematics Olympiad at ITS (OMITS 18).",
    detailedDescription:
      "OMITS Math Problems is a personal collection of competition-style math questions created for the 18th edition of the National Mathematics Olympiad (OMITS) organized by ITS. Targeted at primary school participants, the set includes both easy and mid-to-high difficulty problems that challenge logical thinking, number sense, and creative problem solving. This project was developed as part of my committee responsibilities to support the academic quality of the event.",
    category: "committee",
    tags: [
      "LaTeX",
      "Math Olympiad",
      "Mathematics",
      "Education",
      "Problem Design",
    ],
    gradientColor: "from-purple-400 to-cyan-400",
    icon: "🧮",
    link: "https://github.com/depichan18/OMITS-18",
    github: "https://github.com/depichan18/OMITS-18",
    images: [
      "https://placehold.co/600x400/DA70D6/FFFFFF?text=OMITS+1",
      "https://placehold.co/600x400/BA55D3/FFFFFF?text=OMITS+2",
      "https://placehold.co/600x400/9932CC/FFFFFF?text=OMITS+3",
    ],
    features: [
      "Custom-made math problems for elementary level",
      "Covers easy to advanced competition difficulty",
      "Designed for OMITS 18 national event",
      "Supports critical and creative thinking",
    ],
  },
  {
    id: 6,
    title: "Quant Roadmap",
    description:
      "An interactive web app documenting a personal 8-week journey to become a quantitative researcher — complete with tasks, tracking, and study tools in a playful, pastel-themed interface.",
    detailedDescription:
      "Quant Journey is a personalized learning platform designed to support my transition into quantitative research. It combines structured curriculum planning, progress tracking, and built-in study tools across topics like statistics, finance, and programming. With a vibrant pink-blue theme and engaging UI, the app offers daily task management, real-time analytics, and exportable reports. This tool reflects my self-guided exploration of quantitative finance and serves both as a study companion and a public portfolio of my learning path.",
    category: "personal",
    tags: ["Cute", "Quant", "React", "Productivity", "Tailwind CSS"],
    gradientColor: "from-purple-400 to-cyan-400",
    icon: "📘",
    link: "https://github.com/depichan18/quant-roadmap",
    github: "https://github.com/depichan18/quant-roadmap",
    images: [
      "https://placehold.co/600x400/FF69B4/FFFFFF?text=Quant+Roadmap+1",
      "https://placehold.co/600x400/FFB6C1/000000?text=Quant+Roadmap+2",
      "https://placehold.co/600x400/DB7093/FFFFFF?text=Quant+Roadmap+3",
    ],
    features: [
      "Visual progress tracker & daily checklist",
      "Built-in Pomodoro study timer",
      "Exportable learning reports (JSON, CSV, HTML)",
      "Fully responsive, local data storage",
    ],
  },
];

const categories = {
  all: "All Projects",
  personal: "Personal",
  academic: "Academic",
  committee: "Committee",
};

const projectIcons = {
  1: FaStore,
  2: FaGamepad,
  3: MdAccountBalance,
  4: MdWeb,
  5: MdSchool,
  6: FaBook,
  7: FaLock,
  8: HiOutlineDocumentText,
  9: HiOutlineHeart,
  10: FaShoppingCart,
};

// --- REUSABLE & PRESENTATIONAL COMPONENTS ---

/**
 * Renders the animated background with mathematical symbols and gradients.
 */
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
    `}</style>
  </>
);

const ProjectsHeader = () => (
  <div className="text-center mb-16 scroll-animate" id="projects-header">
    <div className="inline-block">
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-4">
        My Projects
      </h2>
      <div className="w-32 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mx-auto rounded-full mb-6"></div>
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
    <div className="flex gap-2 p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
      {Object.entries(categories).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onSelectCategory(key)}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeCategory === key
              ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg"
              : "text-gray-600 hover:text-cyan-600 hover:bg-cyan-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ project, onImageClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    startAutoSlide();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    stopAutoSlide();
    setCurrentImageIndex(0);
  };

  const handleImageError = (e) => {
    e.target.style.display = "none";
    const fallback = e.target.nextElementSibling;
    if (fallback) {
      fallback.style.display = "flex";
    }
  };

  const IconComponent = projectIcons[project.id] || FaUser;

  return (
    <div
      className={`w-full flex-shrink-0 px-3 scroll-animate`}
      id={`project-${project.id}`}
    >
      <div
        className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100/50 hover:border-cyan-200/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-100/25 overflow-hidden ${
          isHovered ? "z-30 shadow-2xl shadow-cyan-200/50" : "relative"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradientColor} z-10`}
        ></div>

        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          {isHovered ? (
            // Image Slider
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
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
                    className="max-w-full max-h-full object-contain cursor-zoom-in"
                    onClick={(e) => {
                      e.stopPropagation();
                      onImageClick(image);
                    }}
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                </div>
              ))}
            </div>
          ) : (
            // Static Image
            <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center relative">
              <img
                src={project.images[0]}
                alt={`${project.title} preview`}
                className="max-w-full max-h-full object-contain cursor-zoom-in"
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(project.images[0]);
                }}
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
            </div>
          )}
          {/* Hover-only elements */}
          {isHovered && (
            <>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div
                  key={`progress-${project.id}-${currentImageIndex}`}
                  className="h-full bg-gradient-to-r from-cyan-400 to-teal-400"
                  style={{ animation: "slideProgress 3s linear forwards" }}
                ></div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
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

        {/* Content Section */}
        <div className="p-4 pt-0">
          <div className="flex items-center mb-3 mt-4 px-4 justify-center">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <IconComponent className="text-lg text-cyan-600 group-hover:text-cyan-500 transition-colors duration-300" />
            </div>
            <h3 className="flex-1 text-center text-lg font-bold text-cyan-800 group-hover:text-cyan-600 transition-colors duration-300 mx-2 truncate">
              {project.title}
            </h3>
            <span
              className={`flex-shrink-0 inline-block px-2 py-1 text-xs font-medium rounded-full text-white bg-gradient-to-r ${project.gradientColor}`}
            >
              {project.category}
            </span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-3 font-light h-20 overflow-hidden">
            {isHovered ? project.detailedDescription : project.description}
          </p>

          {isHovered ? (
            // Features List on Hover
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
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            // Tags List by Default
            <div className="flex flex-wrap gap-1 mb-3 h-12 overflow-hidden">
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

          {/* Action Buttons on Hover */}
          {isHovered && (
            <div className="flex gap-2 mt-3 animate-fadein">
              <a
                href={project.link}
                className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-200/50"
                onClick={(e) => e.stopPropagation()}
              >
                <MdWeb className="text-sm" /> View Project
              </a>
              {project.github && (
                <a
                  href={project.github}
                  className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-cyan-300 hover:text-cyan-700 hover:bg-cyan-50 transition-all duration-300 hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaFileAlt className="text-sm" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
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
}) => {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentPage * (100 / projectsPerPage)}%)`,
          }}
        >
          {projects.map((project) => (
            <div key={project.id} className="w-1/3 flex-shrink-0">
              <ProjectCard project={project} onImageClick={onImageClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalSlides > 1 && (
        <div className="flex items-center justify-center mt-8 gap-4">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            className="flex items-center justify-center text-cyan-600 hover:text-cyan-500 transition-all duration-300 hover:scale-125 p-0 m-0 border-none bg-transparent focus:outline-none"
            style={{
              background: "none",
              boxShadow: "none",
              width: "auto",
              height: "auto",
            }}
            disabled={totalSlides <= 1}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              style={{ fontWeight: "bold" }}
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
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 scale-125 shadow-lg"
                    : "bg-gray-300 hover:bg-cyan-300"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextPage}
            className="flex items-center justify-center text-cyan-600 hover:text-cyan-500 transition-all duration-300 hover:scale-125 p-0 m-0 border-none bg-transparent focus:outline-none"
            style={{
              background: "none",
              boxShadow: "none",
              width: "auto",
              height: "auto",
            }}
            disabled={totalSlides <= 1}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              style={{ fontWeight: "bold" }}
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
          </button>
        </div>
      )}

      {/* Auto-slide Progress Bar */}
      {totalSlides > 1 && (
        <div className="mt-4 w-full max-w-md mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              key={`page-progress-${currentPage}`}
              className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full"
              style={{
                animation: "slideProgress 10s linear forwards",
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

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Software Developer",
      message:
        "Amazing mathematical approach to problem solving! The projects show great attention to detail and innovative thinking.",
      avatar: "developer",
      timestamp: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "Data Scientist",
      message:
        "Impressive combination of mathematics and programming. The Hill Cipher implementation was particularly well-documented.",
      avatar: "scientist",
      timestamp: new Date().toLocaleDateString(),
    },
  ]);
  const [form, setForm] = useState({ name: "", role: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.message) {
      const newTestimonial = {
        id: testimonials.length + 1,
        name: form.name,
        role: form.role || "Visitor",
        message: form.message,
        avatar: "visitor",
        timestamp: new Date().toLocaleDateString(),
      };
      setTestimonials([newTestimonial, ...testimonials]);
      setForm({ name: "", role: "", message: "" });
    }
  };

  const getAvatarIcon = (avatar, role) => {
    if (avatar === "developer" || role?.toLowerCase().includes("developer"))
      return <FaUser className="text-cyan-600" />;
    if (avatar === "scientist" || role?.toLowerCase().includes("scientist"))
      return <FaBrain className="text-purple-600" />;
    return <FaUser className="text-gray-600" />;
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 mb-16 mt-16">
      {/* Form */}
      <div
        className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-cyan-100/50 shadow-lg scroll-animate scroll-animate-left"
        id="testimonial-form"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mr-3"></span>
          Share Your Thoughts
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Inputs and Textarea */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name *"
              className="w-full px-4 py-2 border border-cyan-200/50 rounded-lg focus:ring-2 focus:ring-cyan-400 bg-white/80 text-sm"
            />
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Your role (Optional)"
              className="w-full px-4 py-2 border border-cyan-200/50 rounded-lg focus:ring-2 focus:ring-cyan-400 bg-white/80 text-sm"
            />
          </div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Share your thoughts... *"
            className="w-full px-4 py-2 border border-cyan-200/50 rounded-lg focus:ring-2 focus:ring-cyan-400 resize-none bg-white/80 text-sm"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-cyan-200/50 text-sm"
          >
            <FaPaperPlane /> Submit Testimonial
          </button>
        </form>
      </div>
      {/* List */}
      <div
        className="space-y-6 scroll-animate scroll-animate-right"
        id="testimonials-display"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mr-3"></span>
          What People Say
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-100/50 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {getAvatarIcon(t.avatar, t.role)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {t.name}
                      </h4>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                    <span className="text-xs text-gray-400">{t.timestamp}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    "{t.message}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CallToAction = () => (
  <div className="text-center mb-16 scroll-animate" id="call-to-action">
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-cyan-100/50 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Interested in Collaboration?
      </h3>
      <p className="text-gray-600 mb-6 font-light">
        I'm always excited to work on projects that combine mathematics and
        technology. Let's create something amazing together!
      </p>
      <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-teal-600 transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-200/50">
        Get In Touch
      </button>
    </div>
  </div>
);

// --- MAIN COMPONENT (Container) ---

const Projects = () => {
  // State for main page logic
  const [activeCategory, setActiveCategory] = useState("all");
  const [popupImage, setPopupImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageIntervalRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
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

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

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

  const projectsPerPage = 3;
  const slideStep = 1;
  const totalSlides = Math.max(
    1,
    filteredProjects.length - projectsPerPage + 1
  );

  // Page navigation logic
  const nextPage = () =>
    setCurrentPage((prev) => (prev + slideStep) % totalSlides);
  const prevPage = () =>
    setCurrentPage((prev) => (prev - slideStep + totalSlides) % totalSlides);
  const goToPage = (index) => setCurrentPage(index);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  // Auto-slide page functionality
  useEffect(() => {
    if (totalSlides > 1) {
      if (pageIntervalRef.current) clearInterval(pageIntervalRef.current);
      pageIntervalRef.current = setInterval(nextPage, 10000);
    }
    return () => clearInterval(pageIntervalRef.current);
  }, [totalSlides, currentPage]); // Re-start timer on nav

  return (
    <div id="projects" className="py-20 pt-32 px-6 relative overflow-hidden">
      <AnimatedBackground />

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
        />

        <ImagePopup image={popupImage} onClose={() => setPopupImage(null)} />

        <Testimonials />

        <CallToAction />
      </div>
    </div>
  );
};

export default Projects;
