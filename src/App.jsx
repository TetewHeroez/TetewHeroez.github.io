import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";
// import Skills from './components/Skills'
// import SectionTransition removed as all section transitions have been removed
import "./App.css";

function App() {
  return (
    <div className="App relative">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* <Skills /> */}

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />

      {/* Custom Scroll Progress Bar */}
      <ScrollProgress />
    </div>
  );
}

export default App;
