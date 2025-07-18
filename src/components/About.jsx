import React, { useState, useEffect, useRef } from "react";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiLatex,
  SiCplusplus,
} from "react-icons/si";
import { FaJava, FaTrophy, FaMedal } from "react-icons/fa";
import { PiMedal } from "react-icons/pi";
import { LuBraces } from "react-icons/lu";
import { ChevronLeft, ChevronRight, SquareSigma } from "lucide-react";
import { GoGear } from "react-icons/go";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

import IconMatrix from "./icons/IconMatrix";
import IconGroup from "./icons/IconGroup";
import IconSqrt from "./icons/IconSqrt";
import IconLimit from "./icons/IconLimit";
import IconK5 from "./icons/IconK5";

// --- 1. DATA DEFINITIONS ---

const getImagePath = (imageName) => {
  const isDev = process.env.NODE_ENV === "development";
  const base = isDev ? "" : "";
  return `${base}/images/${imageName}`;
};

const getAllImagePaths = (imageNames) => {
  return imageNames.map((name) => getImagePath(name));
};

const experiencesData = [
  {
    id: 1,
    role: "Assistant Lecturer Calculus I & II",
    organization: "SKPB ITS | Mathematics ITS",
    period: "Aug 2023 - Now",
    logo: getImagePath("logo/asdos.png"),
    documentation: [
      {
        imageSrc: getImagePath("exp/kalkulus1.jpg"),
        altText: "ML Project Documentation 1",
      },
      {
        imageSrc: getImagePath("exp/kalkulus2.png"),
        altText: "ML Project Documentation 2",
      },
    ],
  },
  {
    id: 2,
    role: "Mathwork AI Virtual Intern",
    organization: "Mathwork | AICTE",
    period: "Completed May 2023",
    logo: "https://placehold.co/40x40/000000/FFFFFF?text=MW",
    documentation: [
      {
        imageSrc:
          "https://placehold.co/800x500/222222/FFFFFF?text=MATLAB+Signal+Processing",
        altText: "MATLAB Signal Processing",
      },
    ],
  },
  {
    id: 3,
    role: "Data Analyst",
    organization: "DataCamp",
    period: "Completed Jan 2023",
    logo: "https://placehold.co/40x40/05192D/FFFFFF?text=DC",
    documentation: [
      {
        imageSrc:
          "https://placehold.co/800x500/03EF7B/05192D?text=Data+Analysis+Portfolio",
        altText: "Data Analysis Portfolio",
      },
    ],
  },
  {
    id: 4,
    role: "Quantitative Researcher",
    organization: "Personal Projects",
    period: "2022 - Present",
    logo: "https://placehold.co/40x40/4F46E5/FFFFFF?text=QR",
    documentation: [
      {
        imageSrc:
          "https://placehold.co/800x500/4F46E5/FFFFFF?text=Algorithmic+Trading+Strategy",
        altText: "Algorithmic Trading Strategy",
      },
    ],
  },
  {
    id: 5,
    role: "Teaching Assistant",
    organization: "University Math Department",
    period: "Aug 2022 - Dec 2022",
    logo: "https://placehold.co/40x40/881337/FFFFFF?text=U",
    documentation: [
      {
        imageSrc:
          "https://placehold.co/800x500/881337/FFFFFF?text=Calculus+I+Syllabus",
        altText: "Calculus I Syllabus",
      },
    ],
  },
];

const programmingSkillsData = [
  {
    name: "LaTeX",
    icon: SiLatex,
    color: "text-green-600",
    bgColor: "hover:bg-green-600",
  },
  {
    name: "Java",
    icon: FaJava,
    color: "text-red-600",
    bgColor: "hover:bg-red-600",
  },
  {
    name: "HTML5",
    icon: SiHtml5,
    color: "text-orange-600",
    bgColor: "hover:bg-orange-600",
  },
  {
    name: "CSS3",
    icon: SiCss3,
    color: "text-blue-500",
    bgColor: "hover:bg-blue-500",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-yellow-500",
    bgColor: "hover:bg-yellow-500",
  },
  {
    name: "Python",
    icon: SiPython,
    color: "text-blue-400",
    bgColor: "hover:bg-blue-400",
  },
  {
    name: "C++",
    icon: SiCplusplus,
    color: "text-blue-600",
    bgColor: "hover:bg-blue-600",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "text-orange-500",
    bgColor: "hover:bg-orange-500",
  },
];

const mathProficiencyData = [
  {
    name: "Linear Algebra",
    value: 38,
    color: "bg-sky-500",
    borderColor: "border-sky-500",
    textColor: "text-sky-500",
    shadowColor: "shadow-sky-500/50",
    icon: IconMatrix,
  },
  {
    name: "Combinatorics",
    value: 21,
    color: "bg-teal-500",
    borderColor: "border-teal-500",
    textColor: "text-teal-500",
    shadowColor: "shadow-teal-500/50",
    icon: IconK5,
  },
  {
    name: "Abstract Algebra",
    value: 17,
    color: "bg-amber-500",
    borderColor: "border-amber-500",
    textColor: "text-amber-500",
    shadowColor: "shadow-amber-500/50",
    icon: IconGroup,
  },
  {
    name: "Complex Analysis",
    value: 13,
    color: "bg-rose-500",
    borderColor: "border-rose-500",
    textColor: "text-rose-500",
    shadowColor: "shadow-rose-500/50",
    icon: IconSqrt,
  },
  {
    name: "Real Analysis",
    value: 11,
    color: "bg-indigo-500",
    borderColor: "border-indigo-500",
    textColor: "text-indigo-500",
    shadowColor: "shadow-indigo-500/50",
    icon: IconLimit,
  },
];

const achievementsData = [
  {
    title: "ONMIPA-PT Mathematics Finalist 2024",
    detail: "National Mathematics Olympiad Indonesian University Level",
    rank: "other",
  },
  {
    title: "National Mathematics Olympiad",
    detail: "Top 10 Finalist, 2023",
    rank: "gold",
  },
  {
    title: "University Dean's List",
    detail: "4 Consecutive Semesters",
    rank: "silver",
  },
  {
    title: "Best Paper Award",
    detail: "Student Conference on Financial Modeling",
    rank: "bronze",
  },
];

const MedalIcon = ({ variant }) => {
  const styles = {
    gold: {
      Icon: FaMedal,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-100",
      shadow: "drop-shadow-[0_0_1px_#d4af37]",
    },
    silver: {
      Icon: FaMedal,
      iconColor: "text-gray-400",
      bgColor: "bg-gray-200",
      shadow: "drop-shadow-[0_0_1px_#aaa]",
    },
    bronze: {
      Icon: FaMedal,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-200",
      shadow: "drop-shadow-[0_0_1px_#b87333]",
    },
    other: {
      Icon: PiMedal,
      iconColor: "text-cyan-700",
      bgColor: "bg-cyan-100",
      shadow: "drop-shadow-[0_0_1px_#0e7490]",
    },
  };

  const { Icon, iconColor, bgColor, shadow } = styles[variant] || styles.gold;

  return (
    <div
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${bgColor} ${shadow}`}
    >
      <Icon className={`${iconColor}`} size={24} />
    </div>
  );
};

// --- 2. CHILD COMPONENTS (Defined as Functions) ---
// Semua bagian UI dipecah menjadi komponen fungsional di sini.

const AnimatedBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleOptions = {
    background: {
      // Warna latar belakang dihapus dari sini, akan di-handle oleh CSS gradasi di parent
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      // Perubahan di sini: deteksi interaksi di seluruh window
      detect_on: "window",
      modes: {
        push: {
          quantity: 4,
        },
        grab: {
          distance: 150,
        },
      },
    },
    particles: {
      color: {
        value: "#334155",
      },
      links: {
        color: "#64748b",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 50,
      },
      opacity: {
        value: 0.4,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 4 },
      },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={particleOptions}
        className="absolute inset-0 z-0"
      />
    );
  }

  return null;
};

const SectionHeader = ({ isVisible }) => (
  <div
    data-animate-id="about-header"
    className={`text-center mb-20 transition-all duration-1000 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
      About Me
    </h2>
    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
      Passionate about mathematics, logic, and the intersection with financial
      technology.
    </p>
  </div>
);

const ImageCarousel = ({ documentation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (documentation.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % documentation.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [documentation.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + documentation.length) % documentation.length
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % documentation.length);
  };

  return (
    <div className="relative w-full h-full bg-slate-800 rounded-xl overflow-hidden group/carousel">
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {documentation.map((doc, index) => (
          <img
            key={index}
            src={doc.imageSrc}
            alt={doc.altText}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      {documentation.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition-opacity opacity-0 group-hover/carousel:opacity-100 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition-opacity opacity-0 group-hover/carousel:opacity-100 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {documentation.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TimelineItem = ({ experience, isFlipped, onExperienceClick }) => {
  return (
    <div className="relative pl-12 pb-8 group">
      {/* Timeline Dot */}
      <div
        className={`absolute left-0 top-1 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center ring-4 transition-colors duration-300 ${
          isFlipped
            ? "ring-teal-400"
            : "ring-slate-200 group-hover:ring-sky-400"
        }`}
      >
        <img
          src={experience.logo}
          alt={`${experience.organization} logo`}
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:items-center">
        {/* Flippable Card Container (for mobile/tablet) and Info Card (for PC) */}
        <div
          className="w-full h-48 lg:h-full"
          style={{ perspective: "1000px" }}
          onClick={() => onExperienceClick(experience.id)}
        >
          <div
            className={`transition-transform duration-700 w-full h-full lg:transform-none ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Side */}
            <div className="absolute inset-0 w-full h-full backface-hidden cursor-pointer">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200 shadow-md group-hover:shadow-xl group-hover:border-slate-300 transition-all duration-300 h-full flex flex-col justify-center">
                <h4 className="font-bold text-sky-800 text-lg mb-1">
                  {experience.role}
                </h4>
                <p className="text-sm text-teal-600 font-medium mb-3">
                  {experience.organization}
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  {experience.period}
                </p>
              </div>
            </div>

            {/* Back Side (Mobile/Tablet Only) */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 cursor-pointer lg:hidden">
              <ImageCarousel documentation={experience.documentation} />
            </div>
          </div>
        </div>

        {/* Documentation Carousel (PC Only) */}
        <div className="hidden lg:block aspect-video">
          <ImageCarousel documentation={experience.documentation} />
        </div>
      </div>
    </div>
  );
};

const JourneyTimeline = ({
  isVisible,
  flippedExperienceId,
  onExperienceClick,
}) => (
  <div
    data-animate-id="about-journey"
    className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg transition-all duration-1000 delay-200 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
    <style>{`
        @keyframes move-dot {
            0% { transform: translateY(10px); }
            100% { transform: translateY(calc(100% - 10px)); }
        }
    `}</style>
    <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
      <GoGear className="h-7 mr-2" />
      Work Experience
    </h3>
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-300">
        <div className="absolute w-full h-full bg-gradient-to-b from-sky-400 to-teal-400 opacity-50 animate-pulse"></div>
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 rounded-full bg-sky-500 shadow-lg"
          style={{ animation: "move-dot 8s ease-in-out infinite alternate" }}
        ></div>
      </div>
      {experiencesData.map((exp) => (
        <TimelineItem
          key={exp.id}
          experience={exp}
          isFlipped={flippedExperienceId === exp.id}
          onExperienceClick={onExperienceClick}
        />
      ))}
    </div>
  </div>
);

const ProgrammingSkills = ({ isVisible }) => (
  <div
    data-animate-id="about-skills"
    className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg transition-all duration-1000 delay-500 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
    <h3 className="text-2xl font-bold text-amber-600 mb-6 flex items-center">
      <LuBraces className={"h-7 mr-2 "} />
      Programming Skills
    </h3>
    <div className="flex flex-wrap gap-3">
      {programmingSkillsData.map((skill) => {
        const SkillIcon = skill.icon;
        return (
          <span
            key={skill.name}
            className={`group px-4 py-2 text-slate-700 rounded-lg text-sm font-medium border border-slate-200 flex items-center gap-2 transition-colors duration-300
              ${skill.bgColor} hover:text-slate-200`}
          >
            <SkillIcon
              className={`h-5 w-5 ${skill.color} group-hover:text-slate-200 transition-colors duration-300`}
            />
            {skill.name}
          </span>
        );
      })}
    </div>
  </div>
);

const MathProficiency = ({ isVisible }) => {
  const [hoveredField, setHoveredField] = useState(null);

  return (
    <div
      data-animate-id="math-proficiency"
      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg transition-all duration-1000 delay-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
        <SquareSigma className="h-8 mr-2" />
        Math Proficiency
      </h3>

      <div className="w-full flex rounded-full h-7 overflow-hidden mb-6 relative">
        {mathProficiencyData.map((field) => (
          <div
            key={field.name}
            className={`${field.color} transition-all duration-300 flex items-center justify-center`}
            style={{
              width: `${field.value}%`,
              filter:
                hoveredField === field.name
                  ? "brightness(1.25)"
                  : "brightness(1)",
            }}
            title={`${field.name}: ${field.value}%`}
          >
            <span className="relative text-white text-xs md:text-xm font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              {field.value}%
            </span>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-4">
        {mathProficiencyData.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.name}
              className="flex items-center gap-3 cursor-pointer group"
              onMouseEnter={() => setHoveredField(field.name)}
              onMouseLeave={() => setHoveredField(null)}
            >
              <div
                className={`w-11 h-11 flex-shrink-0 bg-slate-100 rounded-md flex items-center justify-center border-2 transition-all duration-300 ${
                  hoveredField === field.name
                    ? `${field.borderColor} ${field.shadowColor} shadow-lg`
                    : "border-slate-200"
                }`}
              >
                <Icon
                  className={`h-7 w-7 transition-colors duration-300 ${
                    hoveredField === field.name
                      ? field.textColor
                      : "text-slate-600"
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-sky-800 flex-grow">
                {field.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Achievements = ({ isVisible }) => (
  <div
    data-animate-id="achievements"
    className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg transition-all duration-1000 delay-300 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
    <h3 className="text-2xl font-bold text-stone-600 mb-6 flex items-center">
      <FaTrophy className="h-7 mr-2" />
      Achievements
    </h3>
    <ul className="space-y-4">
      {achievementsData.map((ach, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="pt-1 text-amber-500 flex-shrink-0">
            <MedalIcon variant={ach.rank} />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-sky-800">{ach.title}</h4>
            <p className="text-sm text-slate-600">{ach.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// --- MAIN ABOUT COMPONENT ---
const About = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [flippedExperienceId, setFlippedExperienceId] = useState(null);
  const observerRef = useRef(null);

  const handleExperienceClick = (id) => {
    if (window.innerWidth < 1024) {
      setFlippedExperienceId((prevId) => (prevId === id ? null : id));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) =>
              new Set(prev).add(entry.target.dataset.animateId)
            );
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    observerRef.current = observer;
    const elementsToObserve = document.querySelectorAll("[data-animate-id]");
    elementsToObserve.forEach((el) => observer.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setFlippedExperienceId(null);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>{`
          .rotate-y-180 { transform: rotateY(180deg); }
          .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
      <div
        id="about"
        className="min-h-screen py-20 pt-32 relative overflow-hidden bg-gradient-to-br from-zinc-100 via-sky-200 to-blue-400 font-[Poppins,sans-serif]"
      >
        <AnimatedBackground />

        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader isVisible={visibleElements.has("about-header")} />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2 space-y-8">
              <ProgrammingSkills
                isVisible={visibleElements.has("about-skills")}
              />
              <MathProficiency
                isVisible={visibleElements.has("math-proficiency")}
              />
              <Achievements isVisible={visibleElements.has("achievements")} />
            </div>
            <div className="lg:col-span-3">
              <JourneyTimeline
                isVisible={visibleElements.has("about-journey")}
                flippedExperienceId={flippedExperienceId}
                onExperienceClick={handleExperienceClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
