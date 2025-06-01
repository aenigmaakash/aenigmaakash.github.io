'use client'

export default function Projects() {
  const projects = [
    {
      title: 'Healthcare Data Migration',
      icon: 'fas fa-hospital',
      color: 'text-red-400',
      description: 'Migrated healthcare data from Azure B2C to PostgreSQL while maintaining data integrity and security compliance.',
      tech: ['Azure B2C', 'PostgreSQL', 'Python', 'Data Migration']
    },
    {
      title: 'Education Foundation Data Lake',
      icon: 'fas fa-school',
      color: 'text-blue-400',
      description: 'Built a data lake for a major foundation that consolidated university and healthcare statistics, transforming unstructured data into actionable insights.',
      tech: ['Azure Data Factory', 'PostgreSQL', 'PowerBI', 'AI Services']
    },
    {
      title: 'Retail Finance Automation',
      icon: 'fas fa-shopping-cart',
      color: 'text-green-400',
      description: 'Created metadata ETL pipelines for multiple finance teams at a major retailer, streamlining Excel data into Tableau visualizations.',
      tech: ['Python', 'Pandas', 'Tableau', 'SharePoint']
    },
    {
      title: 'Metadata-driven Automation',
      icon: 'fas fa-robot',
      color: 'text-purple-400',
      description: 'Built an in-house solution that automates data engineering workflows using metadata, significantly reducing manual configuration.',
      tech: ['AWS', 'Great Expectations', 'Selenium', 'CI/CD']
    },
    {
      title: 'Educational Data Standardization',
      icon: 'fas fa-graduation-cap',
      color: 'text-yellow-400',
      description: 'Created metadata-driven ETL for educational data systems, transforming CSVs into standardized nested JSON structures.',
      tech: ['Python', 'Pandas', 'Airflow', 'PostgreSQL']
    },
    {
      title: 'Media Inventory Analytics',
      icon: 'fas fa-film',
      color: 'text-pink-400',
      description: 'Built an analytics platform for a media inventory database with dimensional modeling and historical tracking.',
      tech: ['PySpark', 'AWS EMR', 'Athena', 'PowerBI']
    },
    {
      title: 'Local Produce E-commerce',
      icon: 'fas fa-shopping-basket',
      color: 'text-cyan-400',
      description: 'Developed an API for an e-commerce platform enabling local fresh produce ordering and delivery.',
      tech: ['.NET MVC', 'REST API', 'Payment Gateway', 'SMS']
    },
    {
      title: 'Security Patrol Monitoring',
      icon: 'fas fa-shield-alt',
      color: 'text-orange-400',
      description: 'Built a Progressive Web App that interfaces with IoT devices to monitor security patrol activities.',
      tech: ['PWA', 'IoT', 'Real-time Analytics', '.NET']
    },
    {
      title: 'Ozone Generator Control',
      icon: 'fas fa-bluetooth',
      color: 'text-indigo-400',
      description: 'Created an Android app to control an ozone-generating device via Bluetooth for sanitization applications.',
      tech: ['Android Studio', 'Bluetooth LE', 'Kotlin', 'ESP32']
    },
    {
      title: '3D Waste Volume Estimation',
      icon: 'fas fa-trash',
      color: 'text-emerald-400',
      description: 'Developed an image processing system that estimates garbage volume from photographic data for waste management optimization.',
      tech: ['VisualSFM', 'MeshLab', 'Android', 'Computer Vision']
    },
    {
      title: 'Smart Home Integration',
      icon: 'fas fa-network-wired',
      color: 'text-amber-400',
      description: 'Built a custom smart home system integrating various IoT devices and services with centralized control.',
      tech: ['Raspberry Pi', 'ESP32', 'Home Assistant', 'MQTT']
    },
    {
      title: 'Home Network Management',
      icon: 'fas fa-server',
      color: 'text-teal-400',
      description: 'Configured and optimized a comprehensive home network with VLANs, VPN, and content filtering.',
      tech: ['Networking', 'VPN', 'VLAN', 'Security']
    }
  ]

  return (
    <section id="projects" className="projects-section">
      <div className="container mx-auto px-6">
        <div className="section-header">
          <h2 className="section-heading">
            <i className="section-title-icon fas fa-folder-open"></i>
            Project Highlights
          </h2>
          <p className="section-subtitle">
            A showcase of innovative solutions spanning data engineering, cloud architecture, and IoT development
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card-main"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-header">
                <h3 className="card-heading">
                  <i className={`card-heading-icon ${project.icon} ${project.color}`}></i>
                  {project.title}
                </h3>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-footer">
                <div className="tech-stack">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="tech-tag"
                      style={{ animationDelay: `${index * 0.1 + techIndex * 0.05}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-section">
          <div className="summary-content">
            <h3 className="summary-title">
              <i className="fas fa-lightbulb"></i>
              Innovation at Scale
            </h3>
            <p className="summary-description">
              From automating complex data pipelines to building IoT solutions that solve real-world problems, 
              each project represents a commitment to excellence and innovation. I focus on creating scalable, 
              maintainable solutions that deliver measurable business value.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 