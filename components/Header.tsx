'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLogoClicked, setIsLogoClicked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = () => {
    setIsLogoClicked(true)
    setTimeout(() => setIsLogoClicked(false), 800)
  }

  const navItems = [
    { text: 'yes?', id: 'about', icon: 'fas fa-user' },
    { text: 'polymath-in-progress', id: 'skills', icon: 'fas fa-cogs' },
    { text: 'stuff-i-build', id: 'projects', icon: 'fas fa-folder-open' },
    { text: 'ping-me', id: 'contact', icon: 'fas fa-envelope' },
  ]

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        {/* Logo */}
        <a 
          href="#hero" 
          className="logo-link"
          title="Home - Go to top"
          onClick={(e) => {
            e.preventDefault()
            handleLogoClick()
            scrollToSection('hero')
          }}
        >
          <div className={`logo ${isLogoClicked ? 'clicked' : ''}`}>
            <img src="/favicon.ico" alt="Logo" className="logo-img" />
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className={`nav-item nav-item-${index + 1}`}
            >
              <i className={`${item.icon} mr-2`}></i>
              {item.text}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`menu-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`menu-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`menu-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className={`mobile-nav-item mobile-nav-item-${index + 1}`}
            >
              <i className={`${item.icon} mr-3`}></i>
              {item.text}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .header.scrolled {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: 4rem;
        }

        .logo-link {
          text-decoration: none;
          animation: slideDown 0.6s ease-out;
        }

        .logo {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: transform var(--transition-speed), background var(--transition-speed), box-shadow var(--transition-speed);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          z-index: 15;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .logo::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          opacity: 0;
          transition: opacity var(--transition-speed);
          z-index: 1;
          pointer-events: none;
          border-radius: 50%;
        }

        .logo:hover {
          transform: rotate(5deg) scale(1.05);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-color: rgba(59, 130, 246, 0.4);
        }

        .logo:hover::before {
          opacity: 1;
        }

        .logo-img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          animation: pulse 4s infinite ease-in-out;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1) drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
          }
          50% {
            transform: scale(1.2);
            filter: brightness(1.3) drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
          }
        }

        /* On click animation */
        .logo.clicked .logo-img {
          animation: spin 0.8s ease-out;
        }

        @keyframes spin {
          0% {
            transform: rotate(0) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.5);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        .nav-menu {
          display: none;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-item {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          color: #d1d5db;
          display: flex;
          align-items: center;
          animation: fadeInUp 0.6s ease-out both;
        }

        .nav-item:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .nav-item-1 {
          border-color: rgba(59, 130, 246, 0.3);
          color: #93c5fd;
          animation-delay: 0.1s;
        }

        .nav-item-2 {
          border-color: rgba(139, 92, 246, 0.3);
          color: #c4b5fd;
          animation-delay: 0.2s;
        }

        .nav-item-3 {
          border-color: rgba(6, 182, 212, 0.3);
          color: #67e8f9;
          animation-delay: 0.3s;
        }

        .nav-item-4 {
          border-color: rgba(34, 197, 94, 0.3);
          color: #86efac;
          animation-delay: 0.4s;
        }

        .mobile-menu-btn {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background: none;
          border: none;
          cursor: pointer;
          animation: slideInRight 0.6s ease-out;
        }

        .menu-line {
          width: 100%;
          height: 2px;
          background: white;
          margin: 2px 0;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .menu-line.open:nth-child(1) {
          transform: rotate(45deg) translate(3px, 3px);
        }

        .menu-line.open:nth-child(2) {
          opacity: 0;
        }

        .menu-line.open:nth-child(3) {
          transform: rotate(-45deg) translate(3px, -3px);
        }

        .mobile-menu {
          position: fixed;
          top: 4rem;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          transform: translateY(-100%);
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-menu-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .mobile-nav-item {
          padding: 1rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #d1d5db;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          text-align: left;
        }

        .mobile-nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateX(0.5rem);
        }

        .mobile-nav-item-1 {
          border-color: rgba(59, 130, 246, 0.3);
          color: #93c5fd;
        }

        .mobile-nav-item-2 {
          border-color: rgba(139, 92, 246, 0.3);
          color: #c4b5fd;
        }

        .mobile-nav-item-3 {
          border-color: rgba(6, 182, 212, 0.3);
          color: #67e8f9;
        }

        .mobile-nav-item-4 {
          border-color: rgba(34, 197, 94, 0.3);
          color: #86efac;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Desktop Navigation */
        @media (min-width: 768px) {
          .nav-menu {
            display: flex;
          }

          .mobile-menu-btn {
            display: none;
          }

          .mobile-menu {
            display: none;
          }
        }

        /* Larger screens */
        @media (min-width: 1024px) {
          .nav-container {
            padding: 0 3rem;
          }

          .nav-item {
            font-size: 1rem;
            padding: 0.75rem 1.25rem;
          }
        }
      `}</style>
    </header>
  )
} 