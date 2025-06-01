'use client'

export default function Contact() {
  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      action: 'mailto:ping@aenig.in',
      color: '#3b82f6', // Blue
      hoverColor: '#1d4ed8'
    },
    {
      icon: 'fab fa-linkedin-in',
      title: 'LinkedIn',
      action: 'https://www.linkedin.com/in/akashjena98',
      color: '#0077b5', // LinkedIn Blue
      hoverColor: '#005885'
    },
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      action: 'https://github.com/aenigmaakash',
      color: '#6b7280', // GitHub Gray
      hoverColor: '#374151'
    }
  ]

  return (
    <section id="contact" className="contact-section">
      <div className="container mx-auto px-6">
        <div className="section-header">
          <h2 className="section-heading">
            <i className="section-title-icon fas fa-envelope"></i>
            Let&apos;s Connect
          </h2>
          <p className="section-subtitle">
            Ready to turn ideas into innovative solutions? Let&apos;s start a conversation.
          </p>
        </div>

        <div className="contact-methods">
          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                target={method.action.startsWith('http') ? '_blank' : '_self'}
                rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                className="contact-item"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  '--icon-color': method.color,
                  '--icon-hover-color': method.hoverColor
                } as React.CSSProperties}
              >
                <div className="contact-icon-wrapper">
                  <i className={`${method.icon} contact-icon`}></i>
                </div>
                <span className="contact-title">{method.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          padding: 3rem 0;
          background: rgba(0, 0, 0, 0.3);
          min-height: 50vh;
        }

        .contact-methods {
          max-width: 32rem;
          margin: 0 auto;
          animation: slideInUp 0.8s ease-out;
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .methods-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          justify-items: center;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          animation: scaleIn 0.6s ease-out both;
          padding: 1rem;
          border-radius: 1rem;
        }

        .contact-item:hover {
          transform: translateY(-5px) scale(1.05);
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .contact-icon-wrapper {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .contact-icon-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--icon-color);
          opacity: 0.1;
          border-radius: 50%;
          transition: opacity 0.3s ease;
        }

        .contact-item:hover .contact-icon-wrapper::before {
          opacity: 0.2;
        }

        .contact-icon-wrapper:hover {
          border-color: var(--icon-color);
          box-shadow: 0 0 20px var(--icon-color);
        }

        .contact-icon {
          font-size: 1.5rem;
          color: var(--icon-color);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .contact-item:hover .contact-icon {
          color: var(--icon-hover-color);
          transform: scale(1.1);
        }

        .contact-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #d1d5db;
          transition: color 0.3s ease;
          text-align: center;
        }

        .contact-item:hover .contact-title {
          color: white;
        }

        /* Responsive Design */
        @media (min-width: 640px) {
          .methods-grid {
            gap: 3rem;
          }

          .contact-icon-wrapper {
            width: 5rem;
            height: 5rem;
          }

          .contact-icon {
            font-size: 1.75rem;
          }

          .contact-title {
            font-size: 1rem;
          }
        }

        @media (min-width: 768px) {
          .section-heading {
            font-size: 2.5rem;
          }

          .contact-header {
            margin-bottom: 4rem;
          }

          .contact-methods {
            max-width: 40rem;
          }

          .methods-grid {
            gap: 4rem;
          }
        }

        @media (min-width: 1024px) {
          .contact-section {
            padding: 4rem 0;
          }

          .contact-icon-wrapper {
            width: 6rem;
            height: 6rem;
          }

          .contact-icon {
            font-size: 2rem;
          }

          .contact-title {
            font-size: 1.125rem;
          }
        }

        /* Mobile optimization */
        @media (max-width: 480px) {
          .methods-grid {
            gap: 1.5rem;
          }

          .contact-icon-wrapper {
            width: 3.5rem;
            height: 3.5rem;
          }

          .contact-icon {
            font-size: 1.25rem;
          }

          .contact-title {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  )
} 