import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Instagram,
  ArrowUp,
} from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import Typewriter from "typewriter-effect";

// ============================================================================
// CUSTOM HOOK untuk Media Query Responsif
// ============================================================================
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Pastikan kode ini hanya berjalan di sisi client
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

// ============================================================================
// KOMPONEN 1: VectorArrow (Sesuai kode Anda)
// ============================================================================
const VectorArrow = React.memo(
  ({ mousePosition, cellCenterX, cellCenterY }) => {
    const MAX_INTERACTION_DISTANCE = 200;

    const { rotation, opacity } = useMemo(() => {
      if (mousePosition.x === null || mousePosition.y === null) {
        return { rotation: 0, opacity: 0.15 };
      }
      const deltaX = mousePosition.x - cellCenterX;
      const deltaY = mousePosition.y - cellCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
      const calculatedOpacity = Math.max(
        0,
        1 - distance / MAX_INTERACTION_DISTANCE
      );
      return {
        rotation: angle,
        opacity: 0.15 + calculatedOpacity * 0.85,
      };
    }, [mousePosition, cellCenterX, cellCenterY]);

    return (
      <div className="flex items-center justify-center w-full h-full">
        <ArrowUp
          className="transition-transform opacity duration-100 ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            opacity: opacity,
            filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.6))",
          }}
          color="#3b82f6"
          size={16}
        />
      </div>
    );
  }
);

// ============================================================================
// KOMPONEN 2: VectorGrid (Sesuai kode Anda)
// ============================================================================
const VectorGrid = ({ mousePosition }) => {
  const gridRef = useRef(null);
  const GRID_SIZE = 20;
  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE });

  return (
    <div
      ref={gridRef}
      className="relative grid w-full h-full gap-1"
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
    >
      {cells.map((_, index) => {
        const col = index % GRID_SIZE;
        const row = Math.floor(index / GRID_SIZE);
        const containerWidth = gridRef.current?.clientWidth || 0;
        const containerHeight = gridRef.current?.clientHeight || 0;
        const totalHorizontalGaps = (GRID_SIZE - 1) * 4;
        const totalVerticalGaps = (GRID_SIZE - 1) * 4;
        const cellWidth = (containerWidth - totalHorizontalGaps) / GRID_SIZE;
        const cellHeight = (containerHeight - totalVerticalGaps) / GRID_SIZE;
        const cellCenterX = col * (cellWidth + 4) + cellWidth / 2;
        const cellCenterY = row * (cellHeight + 4) + cellHeight / 2;

        return (
          <VectorArrow
            key={index}
            mousePosition={mousePosition}
            cellCenterX={cellCenterX}
            cellCenterY={cellCenterY}
          />
        );
      })}
    </div>
  );
};

// ============================================================================
// KOMPONEN 3: HeroContentLeft (Sesuai kode Anda)
// ============================================================================
const HeroContentLeft = ({ visibleElements, scrollToSection }) => (
  <div
    className={`text-center lg:text-left space-y-6 max-w-xl transition-all duration-1000 ${
      visibleElements.has("hero-content")
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-10"
    }`}
    data-animate-id="hero-content"
  >
    <div className="space-y-3">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
        Hi, I'm{" "}
        <div className="relative inline-block">
          {/* TEKS BACKGROUND GLOW */}
          <span className="absolute inset-0 text-sky-400 blur-md animate-glow z-0 font-bold">
            Tetew
          </span>

          {/* TEKS UTAMA */}
          <span className="relative z-10 bg-gradient-to-r from-teal-600 to-yellow-400 bg-clip-text text-transparent font-bold">
            Tetew
          </span>

          <style>
            {`
      @keyframes glow {
        0%, 100% {
          opacity: 0.6;
        }
        50% {
          opacity: 1;
        }
      }

      .animate-glow {
        animation: glow 2s ease-in-out infinite;
      }
    `}
          </style>
        </div>
      </h1>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
        <span className="bg-gradient-to-r bg-cyan-400 inline-block text-transparent bg-clip-text">
          <Typewriter
            options={{
              strings: ["Mathematics", "Programming", "Game"],
              autoStart: true,
              loop: true,
              loopCount: Infinity,
              deleteSpeed: "natural", // lebih smooth dari "natural"
              pauseFor: 1000, // jeda sebelum menghapus
            }}
          />
        </span>
      </h2>
    </div>
    <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-lg mt-6 mb-8 mx-auto lg:mx-0">
      Passionate Mathematics student at ITS Surabaya. I enjoy olympiads, coding,
      and creating solutions that are accessible to others.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
      <button
        onClick={() => scrollToSection("projects")}
        className="px-8 py-3 bg-white text-cyan-900 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-base"
      >
        My Projects
      </button>
      <button
        onClick={() => scrollToSection("contact")}
        className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-cyan-900 transition-all duration-300 text-base"
      >
        Download CV
      </button>
    </div>
    <div className="flex gap-4 justify-center lg:justify-start">
      <a
        href="https://github.com/TetewHeroez"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-cyan-900 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <Github className="w-5 h-5" />
      </a>
      <a
        href="https://linkedin.com/in/teosofihidayahagung"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-cyan-900 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href="mailto:teosofihidayahagung@gmail.com"
        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-cyan-900 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <Mail className="w-5 h-5" />
      </a>
      <a
        href="https://instagram.com/tetewheroez"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-cyan-900 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <Instagram className="w-5 h-5" />
      </a>
      <a
        href="https://open.spotify.com/user/31t3xxdpi65uon4rvhej6oarmx7y"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-cyan-900 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <FaSpotify className="w-5 h-5" />
      </a>
    </div>
  </div>
);

// ============================================================================
// HELPER & SUB-COMPONENTS untuk ProfileCard
// ============================================================================
const getImagePath = (imageName) => {
  const isDev = process.env.NODE_ENV === "development";
  const base = isDev ? "" : "";
  return `${base}/images/${imageName}`;
};

// FIX: Komponen dipindah ke luar dan menerima props
const ProfileInnerContent = ({ mousePosition }) => (
  <>
    <div className="absolute inset-0">
      <VectorGrid mousePosition={mousePosition} />
    </div>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-6 left-6 text-2xl text-white/30 animate-float">
        ∫
      </div>
      <div className="absolute top-12 right-8 text-xl text-white/30 animate-pulse">
        π
      </div>
      <div className="absolute bottom-4 left-8 text-white text-2xl font-bold animate-bounce">
        ✨
      </div>
      <div className="absolute top-1/2 right-8 text-white text-xl font-bold animate-pulse">
        ∞
      </div>
    </div>
    <div className="mb-4 sm:mb-8 flex justify-center relative z-10">
      <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-white/20 to-cyan-200/30 p-1 shadow-xl">
        <img
          src={getImagePath("profile.jpg")}
          alt="Teosofi Hidayah Agung"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
    <div className="text-center text-white relative z-10">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
        Teosofi Hidayah Agung
      </h3>
      <p className="text-sm sm:text-base text-cyan-100 mb-1 font-medium">
        Mathematics Student
      </p>
      <p className="text-xs sm:text-sm text-white/80 mb-3">
        Institut Teknologi Sepuluh Nopember
      </p>
      <div className="flex items-center justify-center gap-2 text-xs text-white/70">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span>Available for projects</span>
      </div>
    </div>
  </>
);

// ============================================================================
// KOMPONEN 4: ProfileCard (DIUBAH MENJADI RESPONSIVE)
// ============================================================================
const ProfileCard = ({ visibleElements }) => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const cardRef = useRef(null);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    let finalX, finalY;

    if (!isLargeScreen) {
      const rotationAngle = 12;
      const angleRad = -rotationAngle * (Math.PI / 180);
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const cosAngle = Math.cos(angleRad);
      const sinAngle = Math.sin(angleRad);
      const rotatedX = mouseX * cosAngle - mouseY * sinAngle;
      const rotatedY = mouseX * sinAngle + mouseY * cosAngle;
      finalX = rotatedX + rect.width / 2;
      finalY = rotatedY + rect.height / 2;
    } else {
      finalX = e.clientX - rect.left;
      finalY = e.clientY - rect.top;
    }
    setMousePosition({ x: finalX, y: finalY });
  };

  const handleMouseLeave = () => setMousePosition({ x: null, y: null });

  return (
    <div
      className={`relative flex justify-center items-center transition-all duration-1000 delay-300 ${
        visibleElements.has("hero-profile") ? "opacity-100" : "opacity-0"
      }`}
      data-animate-id="hero-profile"
    >
      {isLargeScreen ? (
        // Tampilan PC: Monitor
        <div className="relative flex flex-col items-center w-full">
          {/* FIX: Menambahkan div gradien di sini */}
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-[3rem] transform-gpu rotate-3 scale-110 blur-xl -z-10"></div>
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-[3rem] transform-gpu -rotate-3 scale-110 blur-xl -z-10"></div>

          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative bg-black/20 backdrop-blur-lg rounded-t-xl p-2 border-x-4 border-t-4 border-b-8 border-gray-800 shadow-2xl w-full max-w-3xl aspect-video"
          >
            <div className="bg-gradient-to-br from-cyan-500/90 to-sky-600/90 rounded-lg w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
              <ProfileInnerContent mousePosition={mousePosition} />
            </div>
          </div>
          <div className="w-1/3 h-3 bg-gray-700 shadow-inner"></div>
          <div className="w-1/2 h-3 bg-gray-800 rounded-b-lg shadow-lg"></div>
        </div>
      ) : (
        // Tampilan HP/Tablet: Kartu Miring
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-[3rem] transform rotate-12 scale-105 blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-[3rem] transform -rotate-6 scale-110 blur-sm"></div>
          <div className="absolute -top-12 -left-12 text-5xl text-cyan-300/30 animate-float">
            ∑
          </div>
          <div className="absolute -bottom-12 -right-12 text-4xl text-sky-300/30 animate-pulse">
            ∫
          </div>
          {/* FIX: Menambahkan md:max-w-md untuk tampilan tablet */}
          <div className="relative bg-white/10 backdrop-blur-lg rounded-[3rem] p-1 border border-white/30 shadow-2xl w-full max-w-sm md:max-w-md h-[510px] transform transition-transform duration-500 rotate-12 hover:rotate-6">
            <div className="bg-gradient-to-br from-cyan-500/90 to-sky-600/90 rounded-[2.8rem] w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
              <ProfileInnerContent mousePosition={mousePosition} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// KOMPONEN 5: AnimatedBackgroundVector (Sesuai kode Anda)
// ============================================================================
const AnimatedBackgroundVector = ({ mousePosition }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-sky-200/20 rounded-full blur-xl animate-float"
      style={{
        left: `${20 + mousePosition.x * 0.02}%`,
        top: `${30 + mousePosition.y * 0.02}%`,
      }}
    />
    <div
      className="absolute w-48 h-48 bg-gradient-to-br from-blue-200/30 to-green-200/30 rounded-full blur-xl animate-float-reverse"
      style={{
        right: `${15 + mousePosition.x * 0.03}%`,
        bottom: `${25 + mousePosition.y * 0.03}%`,
      }}
    />
    <div
      className="absolute text-6xl text-cyan-300/10 font-bold animate-bounce"
      style={{ left: "10%", top: "20%" }}
    >
      ∞
    </div>
    <div
      className="absolute text-4xl text-sky-300/10 font-bold animate-pulse"
      style={{ right: "15%", top: "15%" }}
    >
      π
    </div>
  </div>
);

// ============================================================================
// KOMPONEN UTAMA: Hero (Sesuai kode Anda)
// ============================================================================
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.dataset.animateId;
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const elements = document.querySelectorAll("[data-animate-id]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) =>
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      id="hero"
      className="z-10 min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-cyan-900 via-sky-800 to-blue-900 py-20 px-4 sm:px-6"
    >
      <AnimatedBackgroundVector mousePosition={mousePosition} />
      <div className="container mx-auto grid lg:grid-cols-2 items-center gap-y-20 lg:gap-x-12 relative z-10 max-w-7xl">
        <div className="md:place-items-center sm:place-items-center">
          <HeroContentLeft
            visibleElements={visibleElements}
            scrollToSection={scrollToSection}
          />
        </div>
        <ProfileCard visibleElements={visibleElements} />
      </div>
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <button
          onClick={() => scrollToSection("about")}
          className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-cyan-900 transition-all duration-300 border border-white/20"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
