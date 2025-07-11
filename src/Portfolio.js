import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Star, Code, Palette, Zap, Mail, Github, Linkedin, ExternalLink, ChevronDown } from 'lucide-react';

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState('Me');
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

   console.log("isLoading:", isLoading); // ✅ RIGHT HERE

  // 3D Background Setup
  useEffect(() => {
  // ✅ Always run timeout
  const timeout = setTimeout(() => {
    console.log("✅ Timeout complete – setting isLoading to false");
    setIsLoading(false);
  }, 2000);
  
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00ff88,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add geometric shapes
    const torusGeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff88, 
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);
    
    camera.position.z = 5;
    sceneRef.current = { scene, camera, renderer, particlesMesh, torus };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.001;
      
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Loading simulation
   return () => {
    clearTimeout(timeout); // ✅ Clean up the timeout
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
  };
    
    
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-green-400 text-xl font-mono">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  const projects = [
    {
      title: "Gradient Boosted Dyslexia Detection Framework",
      description: "Developed a machine learning pipeline using Gradient Boosted Decision Trees with SMOTE oversampling for accurate dyslexia detection. Outperformed five baselines and demonstrated strong real-world clinical potential.",
      tech: ["Python", "Scikit-learn", "SMOTE", "Pandas"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Food Court Management System using Spring Boot",
      description: "Built a modular food court system with JWT-based authentication, real-time order tracking via WebSockets, and role-based access for multiple user types using Spring Boot microservices.",
      tech: ["Spring Boot", "MySQL", "JavaScript", "HTML/CSS"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Courier Management Platform with Real-Time Tracking",
      description: "Designed a backend system with REST APIs and real-time status updates for courier operations. Optimized database schema with indexing and caching for 40% faster response times.",
      tech: ["Flask", "SQL Server", "REST API", "JavaScript"],
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Interactive Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills with smooth scroll, 3D background using Three.js, and responsive Tailwind CSS design.",
      tech: ["React", "Tailwind CSS", "Three.js"],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const skills = [
    { name: "Java", level: 95, icon: <Code className="w-6 h-6" /> },
  { name: "Python", level: 95, icon: <Code className="w-6 h-6" /> },
  { name: "C++", level: 90, icon: <Code className="w-6 h-6" /> },
  { name: "C", level: 85, icon: <Code className="w-6 h-6" /> },
  { name: "JavaScript", level: 90, icon: <Code className="w-6 h-6" /> },

  { name: "HTML/CSS", level: 95, icon: <Zap className="w-6 h-6" /> },
  { name: "React", level: 90, icon: <Zap className="w-6 h-6" /> },
  { name: "Flask", level: 85, icon: <Zap className="w-6 h-6" /> },
  { name: "Django", level: 85, icon: <Zap className="w-6 h-6" /> },
  { name: "Spring Boot", level: 80, icon: <Zap className="w-6 h-6" /> },
  { name: "REST API", level: 80, icon: <Zap className="w-6 h-6" /> },
  { name: "SQL", level: 90, icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 3D Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-green-400/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {['Me', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="hover:text-green-400 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Me Section */}
      <section id="Me" className="relative min-h-screen flex items-center justify-center z-10">
        <div className="text-center px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Purva Borse
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Computer Science Student at SRM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-400 text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-green-400/50"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-green-400 text-green-400 font-semibold rounded-full hover:bg-green-400 hover:text-black transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-green-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-2xl p-8 backdrop-blur-sm border border-green-400/20">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I'm a passionate full-stack developer with a love for creating immersive digital experiences. 
                With expertise in modern web technologies and a keen eye for design, I transform ideas into 
                reality through code.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring the latest in AI, 3D graphics, and emerging 
                technologies. I believe in the power of technology to solve real-world problems and create 
                meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-2xl p-6 backdrop-blur-sm border border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="text-green-400 mr-3">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000 delay-200"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400">{skill.level}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-r from-green-400/5 to-blue-400/5 rounded-2xl p-8 backdrop-blur-sm border border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                  <div className={`w-full h-48 bg-gradient-to-r ${project.gradient} rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <ExternalLink className="w-12 h-12 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-green-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-2xl p-8 backdrop-blur-sm border border-green-400/20">
              <p className="text-lg text-gray-300 mb-8">
                Let's collaborate on something amazing! I'm always open to discussing new opportunities 
                and interesting projects.
              </p>
              <div className="flex justify-center space-x-8">
                <a
                  href="mailto:john@example.com"
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                  <span>Email</span>
                </a>
                <a
                  href="https://github.com"
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <Github className="w-6 h-6" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 border-t border-green-400/20 z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 John Doe. Built with React & Three.js
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;