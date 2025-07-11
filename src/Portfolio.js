import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Star, Code, Palette, Zap, Mail, Github, Linkedin, ExternalLink, ChevronDown, Terminal, Monitor, Folder, Music, Heart, Coffee, Gamepad2 } from 'lucide-react';

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState('Me');
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3D Background Setup - Colorful pixel aesthetic
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create colorful pixel grid
    const gridGeometry = new THREE.PlaneGeometry(25, 25, 60, 60);
    const gridMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff69b4, 
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -3;
    scene.add(grid);
    
    // Create floating pixel cubes with different colors
    const cubes = [];
    const colors = [0xff69b4, 0x9370db, 0x4169e1, 0x00bfff, 0xda70d6, 0xff1493];
    
    for (let i = 0; i < 30; i++) {
      const cubeGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
      const cubeMaterial = new THREE.MeshBasicMaterial({ 
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.8
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      scene.add(cube);
      cubes.push(cube);
    }
    
    // Add floating hearts
    const heartGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const hearts = [];
    for (let i = 0; i < 10; i++) {
      const heartMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff69b4,
        transparent: true,
        opacity: 0.6
      });
      const heart = new THREE.Mesh(heartGeometry, heartMaterial);
      heart.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      scene.add(heart);
      hearts.push(heart);
    }
    
    camera.position.z = 8;
    sceneRef.current = { scene, camera, renderer, grid, cubes, hearts };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      grid.rotation.z += 0.003;
      
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.02 * (index * 0.1 + 1);
        cube.rotation.y += 0.02 * (index * 0.1 + 1);
        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });
      
      hearts.forEach((heart, index) => {
        heart.rotation.y += 0.03;
        heart.position.y += Math.sin(Date.now() * 0.002 + index) * 0.002;
      });
      
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
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Pixel art components
  const PixelCat = () => (
    <div className="w-16 h-16 grid grid-cols-8 gap-0 mx-auto">
      {[
        0,1,1,1,1,1,1,0,
        0,1,2,1,1,2,1,0,
        0,1,1,1,1,1,1,0,
        0,1,2,1,1,2,1,0,
        0,1,1,3,3,1,1,0,
        0,1,1,1,1,1,1,0,
        0,0,1,1,1,1,0,0,
        0,0,0,0,0,0,0,0
      ].map((pixel, i) => (
        <div 
          key={i} 
          className={`w-2 h-2 ${
            pixel === 1 ? 'bg-pink-400' : 
            pixel === 2 ? 'bg-purple-600' : 
            pixel === 3 ? 'bg-red-400' : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );

  const PixelHeart = () => (
    <div className="w-8 h-8 grid grid-cols-4 gap-0">
      {[
        0,1,0,1,
        1,1,1,1,
        1,1,1,1,
        0,1,1,0
      ].map((pixel, i) => (
        <div 
          key={i} 
          className={`w-2 h-2 ${pixel === 1 ? 'bg-pink-400' : 'bg-transparent'}`}
        />
      ))}
    </div>
  );

  const PixelStar = () => (
    <div className="w-8 h-8 grid grid-cols-4 gap-0">
      {[
        0,1,1,0,
        1,1,1,1,
        1,1,1,1,
        0,1,1,0
      ].map((pixel, i) => (
        <div 
          key={i} 
          className={`w-2 h-2 ${pixel === 1 ? 'bg-yellow-400' : 'bg-transparent'}`}
        />
      ))}
    </div>
  );

  const PixelComputer = () => (
    <div className="w-12 h-12 grid grid-cols-6 gap-0">
      {[
        0,1,1,1,1,0,
        0,1,2,2,1,0,
        0,1,2,2,1,0,
        0,1,1,1,1,0,
        0,0,1,1,0,0,
        0,1,1,1,1,0
      ].map((pixel, i) => (
        <div 
          key={i} 
          className={`w-2 h-2 ${
            pixel === 1 ? 'bg-purple-400' : 
            pixel === 2 ? 'bg-blue-400' : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );

  // Loading screen - Kawaii style
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 flex items-center justify-center z-50 font-mono">
        <div className="text-center border-4 border-pink-400 bg-purple-900/90 p-8 max-w-md rounded-lg">
          <div className="mb-6">
            <PixelCat />
          </div>
          <div className="text-pink-400 text-left mb-4">
            <div className="border-b-2 border-pink-400 pb-2 mb-4">
              <span className="text-white bg-pink-400 px-3 py-1 rounded">✨ KAWAII BOOT ✨</span>
            </div>
            <div className="space-y-2">
              <div>🌸 Loading cute portfolio...</div>
              <div>💖 Initializing pixel graphics...</div>
              <div>🎀 Loading kawaii data...</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 bg-pink-400 animate-pulse mr-2 rounded"></div>
            <span className="text-pink-400">Please wait... (◕‿◕)</span>
          </div>
        </div>
      </div>
    );
  }

  const projects = [
    {
      title: "Gradient Boosted Dyslexia Detection Framework",
      description: "Developed a machine learning pipeline using Gradient Boosted Decision Trees with SMOTE oversampling for accurate dyslexia detection. Outperformed five baselines and demonstrated strong real-world clinical potential.",
      tech: ["Python", "Scikit-learn", "SMOTE", "Pandas"],
      icon: <PixelComputer />,
      emoji: "🧠"
    },
    {
      title: "Food Court Management System using Spring Boot",
      description: "Built a modular food court system with JWT-based authentication, real-time order tracking via WebSockets, and role-based access for multiple user types using Spring Boot microservices.",
      tech: ["Spring Boot", "MySQL", "JavaScript", "HTML/CSS"],
      icon: <PixelComputer />,
      emoji: "🍜"
    },
    {
      title: "Courier Management Platform with Real-Time Tracking",
      description: "Designed a backend system with REST APIs and real-time status updates for courier operations. Optimized database schema with indexing and caching for 40% faster response times.",
      tech: ["Flask", "SQL Server", "REST API", "JavaScript"],
      icon: <PixelComputer />,
      emoji: "📦"
    },
    {
      title: "Interactive Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills with smooth scroll, 3D background using Three.js, and responsive design with kawaii pixel aesthetic.",
      tech: ["React", "CSS", "Three.js"],
      icon: <PixelComputer />,
      emoji: "🎨"
    }
  ];

  const skills = [
    { name: "Java", level: 95, icon: <PixelStar />, emoji: "☕" },
    { name: "Python", level: 95, icon: <PixelStar />, emoji: "🐍" },
    { name: "C++", level: 90, icon: <PixelStar />, emoji: "⚡" },
    { name: "C", level: 85, icon: <PixelStar />, emoji: "🔧" },
    { name: "JavaScript", level: 90, icon: <PixelStar />, emoji: "🌟" },
    { name: "HTML/CSS", level: 95, icon: <PixelHeart />, emoji: "🎨" },
    { name: "React", level: 90, icon: <PixelHeart />, emoji: "⚛️" },
    { name: "Flask", level: 85, icon: <PixelHeart />, emoji: "🌶️" },
    { name: "Django", level: 85, icon: <PixelHeart />, emoji: "🎵" },
    { name: "Spring Boot", level: 80, icon: <PixelHeart />, emoji: "🌸" },
    { name: "REST API", level: 80, icon: <PixelHeart />, emoji: "🔗" },
    { name: "SQL", level: 90, icon: <PixelHeart />, emoji: "📊" }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 text-white overflow-x-hidden font-mono">

      {/* 3D Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      
      {/* Desktop Taskbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-800 to-pink-800 border-b-4 border-pink-400 h-10 flex items-center justify-between px-4 text-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 border-2 border-pink-400 px-3 py-1 text-white rounded">
            💖 Kawaii Portfolio OS 💖
          </div>
        </div>
        <div className="flex items-center space-x-4 text-pink-200">
          <div>🌸 {formatDate(currentTime)}</div>
          <div className="font-bold">⏰ {formatTime(currentTime)}</div>
        </div>
      </div>

      {/* Navigation Window */}
      <div className="fixed top-16 left-4 z-50 w-64">
        <div className="bg-gradient-to-br from-purple-800 to-pink-800 border-4 border-pink-400 rounded-lg shadow-lg shadow-pink-400/50">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 border-b-2 border-pink-400 px-4 py-2 text-white text-sm flex items-center justify-between rounded-t">
            <div className="flex items-center space-x-2">
              <PixelHeart />
              <span>Navigation</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-yellow-400 border-2 border-yellow-600 rounded-full"></div>
              <div className="w-4 h-4 bg-green-400 border-2 border-green-600 rounded-full"></div>
              <div className="w-4 h-4 bg-red-400 border-2 border-red-600 rounded-full"></div>
            </div>
          </div>
          <div className="p-3 space-y-2">
            {[
              { name: 'Me', emoji: '🌸' },
              { name: 'About', emoji: '💖' },
              { name: 'Skills', emoji: '⭐' },
              { name: 'Projects', emoji: '🎨' },
              { name: 'Contact', emoji: '📧' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.name.toLowerCase())}
                className="w-full text-left px-3 py-2 text-pink-200 hover:bg-pink-600/50 hover:text-white transition-colors border-2 border-transparent hover:border-pink-400 rounded flex items-center space-x-2"
              >
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-10">
        {/* Me Section */}
        <section id="me" className="relative min-h-screen flex items-center justify-center z-10">
          <div className="text-center px-6 max-w-4xl">
            <div className="bg-gradient-to-br from-purple-800/90 to-pink-800/90 border-4 border-pink-400 rounded-lg p-8 mb-8 shadow-lg shadow-pink-400/50">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 border-b-2 border-pink-400 px-4 py-2 text-white text-sm mb-6 rounded-t flex items-center justify-center space-x-2">
                <PixelCat />
                <span>User Profile - Purva Borse.exe</span>
              </div>
              <div className="space-y-6">
                <div className="text-4xl md:text-6xl font-bold text-pink-300 mb-4">
                  ✨ PURVA BORSE ✨
                </div>
                <div className="text-xl text-purple-200">
                  🌸 Computer Science Student at SRM 🌸
                </div>
                <div className="text-sm text-pink-300 bg-purple-900/50 p-3 rounded-lg border-2 border-pink-400">
                  Status: Online 💖 | Location: India 🇮🇳 | Specialty: 
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold border-4 border-pink-400 hover:from-pink-400 hover:to-purple-400 transition-all transform hover:scale-105 rounded-lg shadow-lg shadow-pink-400/50"
              >
                🎨 [VIEW PROJECTS] 🎨
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-transparent text-pink-300 font-bold border-4 border-pink-400 hover:bg-pink-400 hover:text-white transition-all transform hover:scale-105 rounded-lg"
              >
                💌 [CONTACT ME] 💌
              </button>
            </div>
          </div>
        </section>

        {/* About Section - Character Select Style */}
        <section id="about" className="relative py-20 z-10">
        <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
            {/* Character Select Header */}
            <div className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wider text-center" style={{ textShadow: '4px 4px 0px #000', fontFamily: 'monospace' }}>
                ABOUT ME
            </div>
            
            {/* Character Select Window */}
            <div className="bg-gradient-to-br from-pink-300 to-pink-200 border-8 border-black rounded-lg shadow-2xl shadow-black/50 mb-8">
                {/* Window Header with Tabs */}
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 border-b-4 border-black px-4 py-2">
                <div className="flex justify-center space-x-2">
                    <div className="bg-pink-200 border-4 border-black px-4 py-2 rounded-t-lg">
                    <div className="w-8 h-6 bg-gradient-to-b from-gray-300 to-gray-400 border-2 border-black rounded"></div>
                    </div>
                    <div className="bg-gray-300 border-4 border-black px-4 py-2 rounded-t-lg">
                    <div className="w-8 h-6 bg-gradient-to-b from-gray-400 to-gray-500 border-2 border-black rounded"></div>
                    </div>
                    <div className="bg-gray-300 border-4 border-black px-4 py-2 rounded-t-lg">
                    <div className="w-8 h-6 bg-gradient-to-b from-gray-400 to-gray-500 border-2 border-black rounded"></div>
                    </div>
                    <div className="bg-gray-300 border-4 border-black px-4 py-2 rounded-t-lg">
                    <div className="w-8 h-6 bg-gradient-to-b from-gray-400 to-gray-500 border-2 border-black rounded"></div>
                    </div>
                </div>
                </div>
                
                {/* Character Info Panel */}
                <div className="p-8">
                <div className="text-2xl font-bold text-black mb-6" style={{ fontFamily: 'monospace' }}>
                    "Aspriring Developer and ML enthusiast"
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Character Portrait + Pixel Decoration */}
                <div className="relative w-48 h-48 bg-gradient-to-br from-pink-400 to-purple-400 border-4 border-black rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                    src="/download20250705165252.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    />

                
                </div>

        {/* Character Stats */}
        <div className="flex-1 text-left">
            <div className="bg-pink-200 border-4 border-black rounded-lg p-6 space-y-4">
            <div className="text-black font-bold" style={{ fontFamily: 'monospace' }}>
                <div className="mb-2">
                <span className="text-gray-950">Specialty:</span> Full-Stack Development
                </div>
                <div className="mb-2">
                <span className="text-gray-1100">Experience:</span> Web Technologies & AI
                </div>
                <div className="mb-2">
                <span className="text-gray-1100">Style:</span> Kawaii Design & Immersive UX
                </div>
                <div className="mb-2">
                <span className="text-gray-1100">Passion:</span> Problem Solving & Innovation
                </div>
                <div className="mb-4">
                <span className="text-gray-1100">Mission:</span> Creating meaningful digital connections
                </div>
            </div>
        </div>
        </div>

    </div>
  </div>
  </div>
  </div>
  </div>
</section>
{/* Skills Section */}
        <section id="skills" className="relative py-20 z-10">
          <div className="container mx-auto px-6">
            <div className="text-3xl font-bold text-pink-300 mb-12 text-center flex items-center justify-center space-x-3">
              <PixelStar />
              <span>⭐ SKILLS.DAT ⭐</span>
              <PixelStar />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-800/90 to-pink-800/90 border-4 border-pink-400 rounded-lg shadow-lg shadow-pink-400/30">
                  <div className="bg-gradient-to-r from-pink-600 to-purple-600 border-b-2 border-pink-400 px-3 py-2 text-white text-sm rounded-t flex items-center space-x-2">
                    <span>{skill.emoji}</span>
                    <span>{skill.name}.exe</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-3 space-x-2">
                      <div className="text-pink-300">
                        {skill.icon}
                      </div>
                      <span className="text-white font-semibold">{skill.name}</span>
                    </div>
                    <div className="w-full bg-purple-900 border-2 border-pink-400 rounded-full h-6 mb-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-pink-400 to-purple-400 h-full flex items-center justify-center text-white text-xs font-bold transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      >
                        {skill.level}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative py-20 z-10">
          <div className="container mx-auto px-6">
            <div className="text-3xl font-bold text-pink-300 mb-12 text-center flex items-center justify-center space-x-3">
              <PixelComputer />
              <span>🎨 PROJECTS.DIR 🎨</span>
              <PixelComputer />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-800/90 to-pink-800/90 border-4 border-pink-400 rounded-lg shadow-lg shadow-pink-400/30">
                  <div className="bg-gradient-to-r from-pink-600 to-purple-600 border-b-2 border-pink-400 px-4 py-2 text-white text-sm rounded-t flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{project.emoji}</span>
                      <span>Project_{index + 1}.exe</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-4 h-4 bg-yellow-400 border-2 border-yellow-600 rounded-full"></div>
                      <div className="w-4 h-4 bg-green-400 border-2 border-green-600 rounded-full"></div>
                      <div className="w-4 h-4 bg-red-400 border-2 border-red-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4 space-x-3">
                      <div className="text-pink-300">
                        {project.icon}
                      </div>
                      <h3 className="text-lg font-bold text-pink-300">{project.title}</h3>
                    </div>
                    <p className="text-purple-200 mb-4 text-sm">{project.description}</p>
                    <div className="space-y-3">
                      <div className="text-pink-300 text-sm font-semibold">✨ Technologies:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white border-2 border-pink-400 text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
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
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-purple-800/90 to-pink-800/90 border-4 border-pink-400 rounded-lg shadow-lg shadow-pink-400/50">
                <div className="bg-gradient-to-r from-pink-600 to-purple-600 border-b-2 border-pink-400 px-4 py-2 text-white text-sm rounded-t flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Contact.exe - Kawaii Terminal</span>
                </div>
                <div className="p-8">
                  <div className="text-2xl font-bold text-pink-300 mb-6 flex items-center space-x-3">
                    <PixelHeart />
                    <span>💌 ESTABLISH_CONNECTION.BAT 💌</span>
                  </div>
                  <div className="space-y-6 text-purple-200">
                    <p>
                      🌸 Let's collaborate on something amazing! I'm always open to discussing new opportunities 
                      and interesting projects. Let's create something kawaii together! (◕‿◕)✨
                    </p>
                    <div className="mt-8 space-y-4">
                      <div className="text-pink-300 text-lg">🔗 Available connections:</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a
                          href="mailto:purva@example.com"
                          className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-600 to-purple-600 border-2 border-pink-400 hover:from-pink-500 hover:to-purple-500 transition-all transform hover:scale-105 rounded-lg"
                        >
                          <Mail className="w-6 h-6" />
                          <span>💌 Email.exe</span>
                        </a>
                        <a
                          href="https://github.com"
                          className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-600 to-purple-600 border-2 border-pink-400 hover:from-pink-500 hover:to-purple-500 transition-all transform hover:scale-105 rounded-lg"
                        >
                          <Github className="w-6 h-6" />
                          <span>🐙 GitHub.exe</span>
                        </a>
                        <a
                          href="https://linkedin.com"
                          className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-600 to-purple-600 border-2 border-pink-400 hover:from-pink-500 hover:to-purple-500 transition-all transform hover:scale-105 rounded-lg"
                        >
                          <Linkedin className="w-6 h-6" />
                          <span>💼 LinkedIn.exe</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-8 border-t-4 border-pink-400 z-10">
          <div className="container mx-auto px-6 text-center">
            <div className="bg-gradient-to-r from-purple-800/90 to-pink-800/90 border-4 border-pink-400 rounded-lg p-6 shadow-lg shadow-pink-400/50">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <PixelHeart />
                <span className="text-pink-300 text-lg">Made by Purva Borse</span>
                <PixelHeart />
              </div>
              <div className="text-purple-200 text-sm">
                🌸 Powered by React + Three.js + Kawaii Magic ✨
              </div>
              <div className="mt-4 text-pink-300 text-xs">
                © 2024 Purva Borse. All rights reserved. (◕‿◕)♡
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;