import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
// import Skills from './components/Skills'
// import SectionTransition removed as all section transitions have been removed
import './App.css'

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
    </div>
  )
}

export default App