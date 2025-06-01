'use client'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      icon: 'fas fa-code',
      color: 'text-blue-400',
      skills: ['Python', 'SQL (ANSI SQL & PSQL)', 'C#', 'ASP .NET', 'Kotlin']
    },
    {
      title: 'Data Storage',
      icon: 'fas fa-database',
      color: 'text-green-400',
      skills: ['PostgreSQL', 'SQL Server', 'HBase', 'Data Modeling', 'Hive']
    },
    {
      title: 'Big Data & BI',
      icon: 'fas fa-mountain',
      color: 'text-purple-400',
      skills: ['Spark (Python)', 'PowerBI', 'DBT', 'Dimensional Modeling', 'ETL/ELT Pipelines']
    },
    {
      title: 'AWS',
      icon: 'fab fa-aws',
      color: 'text-orange-400',
      skills: ['Glue & Data Migration', 'RDS & Redshift', 'S3 & Athena', 'Lambda & API Gateway', 'EMR & ECR']
    },
    {
      title: 'Azure',
      icon: 'fab fa-microsoft',
      color: 'text-cyan-400',
      skills: ['Data Factory & Flow', 'PostgreSQL & Storage', 'Functions', 'Power BI', 'App Service']
    },
    {
      title: 'Cloud & Automation',
      icon: 'fab fa-google',
      color: 'text-yellow-400',
      skills: ['GCP (BigQuery, Storage)', 'Kubernetes & Docker', 'CI/CD Pipelines', 'Airflow', 'Great Expectations']
    },
    {
      title: 'IoT & Hardware',
      icon: 'fas fa-cogs',
      color: 'text-red-400',
      skills: ['Raspberry Pi', 'ESP32', 'Home Automation', 'Network Design', 'Bluetooth Applications']
    },
    {
      title: 'Development Tools',
      icon: 'fas fa-tools',
      color: 'text-pink-400',
      skills: ['Git & Version Control', 'Selenium', 'REST API Design', 'Android Studio', 'Vue.js']
    }
  ]

  return (
    <section id="skills" className="skills-section">
      <div className="container mx-auto px-6">
        <div className="section-header">
          <h2 className="section-heading">
            <i className="section-title-icon fas fa-cogs"></i>
            Skills & Technologies
          </h2>
          <p className="section-subtitle">
            A comprehensive toolkit for building scalable data solutions and innovative applications
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title} 
              className="skill-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-card-header">
                <h3 className="card-heading">
                  <i className={`card-heading-icon ${category.icon} ${category.color}`}></i>
                  {category.title}
                </h3>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="skill-item"
                    style={{ animationDelay: `${index * 0.1 + skillIndex * 0.05}s` }}
                  >
                    <span className="skill-bullet"></span>
                    <span className="skill-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="summary-section">
          <div className="summary-content">
            <h3 className="summary-title">
              <i className="fas fa-magic mr-2"></i>
              What I Actually Do
            </h3>
            <p className="summary-description">
              I specialize in transforming raw data into valuable business insights through scalable 
              cloud architectures, automated ETL pipelines, and intelligent IoT integrations. 
              My expertise spans the entire data lifecycle from ingestion to visualization.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 