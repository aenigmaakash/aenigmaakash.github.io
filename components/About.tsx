'use client'

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container mx-auto px-6">
        <div className="about-content">
          {/* Header */}
          <div className="section-header">
            <h2 className="section-heading">
              <i className="section-title-icon fas fa-user-circle"></i>
              About Me
            </h2>
            <p className="section-subtitle">
              Started my Google quest early on — now I&apos;m a search wizard!
            </p>
          </div>

          {/* Content Grid */}
          <div className="content-grid">
            {/* Personal Story */}
            <div className="content-card intro-card">
              <div className="card-content">
                <p>
                  I&apos;m a tech enthusiast who loves making complex systems work together. When I&apos;m not at my day job as a data engineer, you&apos;ll find me tinkering with home networks, IoT devices, and single-board computers like Raspberry Pi and ESP32. 
                  <i className="fas fa-microchip ml-2 text-blue-400"></i>
                </p>
                
                <p>
                  I find joy in exploring cloud networking solutions and building systems that bridge the gap between cutting-edge technology and practical applications. I&apos;m the person friends call when they need someone to explain tech in a way that actually makes sense. 
                  <i className="fas fa-wifi ml-2 text-purple-400"></i>
                </p>

                <div className="expertise-tags">
                  {[
                    { icon: 'fas fa-database', text: 'Big Data Expert' },
                    { icon: 'fab fa-aws', text: 'Cloud Architect' },
                    { icon: 'fas fa-robot', text: 'Automation Specialist' },
                    { icon: 'fas fa-microchip', text: 'IoT Enthusiast' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="expertise-tag"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <i className={`${item.icon} text-blue-400`}></i>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="content-card education-card">
              <div className="card-header">
                <h3 className="card-heading">
                  <i className="card-heading-icon fas fa-graduation-cap text-blue-400"></i>
                  Education
                </h3>
              </div>
              <div className="card-content">
                <div className="education-item">
                  <h4 className="education-degree">Bachelor of Engineering</h4>
                  <p className="education-field">Electronics and Communication</p>
                  <p className="education-school">PES University, ECC (2016 - 2020)</p>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="content-card experience-card">
              <div className="card-header">
                <h3 className="card-heading">
                  <i className="card-heading-icon fas fa-briefcase text-purple-400"></i>
                  Experience
                </h3>
              </div>
              <div className="card-content">
                <div className="experience-timeline">
                  <div className="experience-item">
                    <h4 className="experience-role">Data Engineer</h4>
                    <p className="experience-company">krtrimaIQ Cognitive Solutions</p>
                    <p className="experience-period">Oct 2021 - Present</p>
                  </div>
                  <div className="experience-item">
                    <h4 className="experience-role">R&D Engineer</h4>
                    <p className="experience-company">i47 Innovation Labs</p>
                    <p className="experience-period">Jan 2021 - Sept 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 