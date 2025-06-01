'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-section">
      <div className="container mx-auto px-6">
        <div className="footer-content">
          <div className="footer-text">
            <p className="copyright">
              © {currentYear} aenig.in. Made with ❤️ and{' '}
              <a 
                href="https://cursor.sh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cursor-link"
              >
                Cursor
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 