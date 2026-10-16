/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ChartNoAxesCombined,
  Sparkles,
  ArrowDown,
  ArrowUp,
  ArrowRight,
  Search,
  Bot,
  FileText,
  User,
  Check,
  TriangleAlert,
  Brain,
  BrainCircuit,
  ChartColumn,
  Database,
  CodeXml,
  FileSpreadsheet,
  Award,
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
  Maximize2,
  CircleArrowOutUpRight,
} from 'lucide-react';
import { DigitalSparkles } from './components/DigitalSparkles';
import { DataSculpture } from './components/DataSculpture';

interface Project {
  id: 'hr' | 'sales' | 'research' | 'telecom' | 'cnn';
  category: string;
  title: string;
  description: string;
  tools: string[];
  metric: string;
  metricValue?: number | null;
  metricQualifier?: string | null;
  repo: string;
  demo?: string;
}

interface Dashboard {
  id: string;
  title: string;
  platform: string;
  repo: string;
  image: string;
  alt: string;
}

const PROFILE = {
  name: 'Mokshada Patil',
  email: 'mokshadapatil207@gmail.com',
  github: 'https://github.com/TechieMoksha',
  linkedin: 'https://www.linkedin.com/in/mokshada-patil-80132b2b0/',
  cgpa: '8.67',
  resumeUrl: '/Mokshada-Patil-Resume.pdf',
  artUrl: '/assets/data-sculpture.png',
};

const NAV_ITEMS: [string, string][] = [
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Dashboards', 'dashboards'],
  ['Experience', 'experience'],
  ['Certificates', 'certifications'],
];

const SKILL_GROUPS = [
  {
    icon: Database,
    title: 'Data Analysis',
    tools: [
      'Python',
      'SQL',
      'Pandas',
      'NumPy',
      'EDA',
      'Excel',
      'Data Cleaning',
      'Statistical Analysis',
      'Feature Engineering',
      'Data Wrangling',
    ],
  },
  {
    icon: ChartColumn,
    title: 'BI & Visualization',
    tools: [
      'Power BI',
      'Tableau',
      'DAX',
      'Power Query',
      'Data Modeling',
      'KPI Metrics',
      'Data Visualization',
      'Dashboard Development',
      'Interactive Reporting',
    ],
  },
  {
    icon: BrainCircuit,
    title: 'Machine Learning & AI',
    tools: [
      'Scikit-learn',
      'SHAP',
      'Predictive Modeling',
      'Deep Learning',
      'CNN & Vision',
      'NLP',
      'Generative AI',
      'LangChain',
      'RAG',
      'Vector DBs (Chroma)',
      'Agentic AI',
      'Model Evaluation',
    ],
  },
  {
    icon: CodeXml,
    title: 'Development & Tools',
    tools: [
      'MySQL',
      'SQL Server',
      'PostgreSQL',
      'Streamlit',
      'Flask',
      'REST APIs',
      'Git',
      'GitHub',
      'Jupyter',
      'AWS',
    ],
  },
];

const PROJECTS: Project[] = [
  {
    id: 'hr',
    category: 'People analytics · Machine learning',
    title: 'HR Analytics & Employee Retention Intelligence',
    description:
      'Uncovering attrition patterns and retention factors with explainable predictions and interactive HR dashboards.',
    tools: ['Python', 'Power BI', 'SHAP', 'Streamlit'],
    metric: '10+ HR KPIs tracked',
    metricValue: 10,
    metricQualifier: '+',
    repo: 'https://github.com/TechieMoksha/Employee-Retention-Insights-through-Data-Driven-HR-Analysis',
  },
  {
    id: 'sales',
    category: 'Sales analytics · Business intelligence',
    title: 'Pizza Sales Analysis Dashboard',
    description:
      'Turning sales records into a clear view of revenue trends, product performance, and customer ordering patterns.',
    tools: ['SQL Server', 'SQL', 'Excel'],
    metric: '48K+ sales records analyzed',
    metricValue: 48000,
    metricQualifier: '+',
    repo: 'https://github.com/TechieMoksha/Pizza-Sales-Analysis-Dashboard',
  },
  {
    id: 'research',
    category: 'Generative AI · Agentic workflows',
    title: 'ResearchMind — AI Research System',
    description:
      'A multi-agent research assistant that gathers web sources and generates reports through research and review workflows.',
    tools: ['Python', 'LangChain', 'Gemini', 'Tavily'],
    metric: 'Multi-agent research & review',
    metricValue: null,
    metricQualifier: null,
    repo: 'https://github.com/TechieMoksha/AI-Search_system',
  },
  {
    id: 'telecom',
    category: 'Generative AI · Retrieval-augmented generation',
    title: 'Telecom RAG Support Chatbot',
    description:
      'A customer-support chatbot that retrieves answers from FAQs, resolved support tickets and a user guide, with source citations and confidence-based fallback.',
    tools: ['Python', 'LangChain', 'ChromaDB', 'Groq', 'Streamlit'],
    metric: 'Recall@3 retrieval evaluation',
    metricValue: null,
    metricQualifier: null,
    repo: 'https://github.com/TechieMoksha/telecom-rag-chatbot',
    demo: 'https://telecom-rag-chatbot-8pqx6z8gfmicgm6tnxc87r.streamlit.app/',
  },
  {
    id: 'cnn',
    category: 'Deep learning · Computer vision',
    title: 'Brain Tumor Detection Using CNN',
    description:
      'A convolutional neural network that classifies MRI brain scans as healthy or tumor, served through a Flask prediction web app.',
    tools: ['Python', 'CNN', 'Flask', 'MRI (Kaggle)'],
    metric: 'Healthy vs. tumor MRI classification',
    metricValue: null,
    metricQualifier: null,
    repo: 'https://github.com/TechieMoksha/Brain-Tumor-Detection-Using-CNN',
  },
];

const DASHBOARDS: Dashboard[] = [
  {
    id: 'hr',
    title: 'HR Analytics & Retention',
    platform: 'Power BI · People analytics',
    repo: 'https://github.com/TechieMoksha/Employee-Retention-Insights-through-Data-Driven-HR-Analysis',
    image: '/assets/hr-retention-dashboard.png',
    alt: 'Employee Retention Dashboard: attrition rate, average retention score, leave count and average monthly income, a gender split donut, average leave probability by age group, attrition hotspots by city on a map, and an employee-level retention and risk table.',
  },
  {
    id: 'sales',
    title: 'Pizza Sales Performance',
    platform: 'Sales analytics · SQL & Excel',
    repo: 'https://github.com/TechieMoksha/Pizza-Sales-Analysis-Dashboard',
    image: '/assets/pizza-sales-dashboard.png',
    alt: 'Pizza Sales dashboard: total revenue, average order value, pizzas sold, orders and pizzas per order, daily and hourly order trends, sales by pizza category and size, and best- and worst-selling pizzas.',
  },
];

export const COMMON_DRIVE_FOLDER =
  'https://drive.google.com/drive/folders/1MlL_8EjnlFVKGjCjpPrIdjuzcCJ_8jd3';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  fullName: string;
  image: string;
  driveUrl: string;
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'ibm',
    title: 'IBM Data Analyst Professional Certificate',
    issuer: 'Coursera',
    fullName: 'IBM Data Analyst Professional Certificate · Coursera',
    image: '/assets/certificates/cert-ibm.svg',
    driveUrl: COMMON_DRIVE_FOLDER,
  },
  {
    id: 'forage',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Forage · Tata',
    fullName: 'GenAI Powered Data Analytics Job Simulation · Forage',
    image: '/assets/certificates/cert-tata.svg',
    driveUrl: COMMON_DRIVE_FOLDER,
  },
  {
    id: 'cisco',
    title: 'Data Analytics Essentials',
    issuer: 'Cisco Networking Academy',
    fullName: 'Data Analytics Essentials · Cisco',
    image: '/assets/certificates/cert-cisco.svg',
    driveUrl: COMMON_DRIVE_FOLDER,
  },
  {
    id: 'cyber',
    title: 'Cyber Forensics Practices',
    issuer: 'Student Development Program',
    fullName: 'Cyber Forensics Practices · Student Development Program',
    image: '/assets/certificates/cert-cyber.svg',
    driveUrl: COMMON_DRIVE_FOLDER,
  },
  {
    id: 'nasscom',
    title: 'Gen AI Tools',
    issuer: 'IT-ITeS Sector Skills Council, Nasscom',
    fullName: 'Gen AI Tools · IT-ITeS Sector Skills Council, Nasscom',
    image: '/assets/certificates/cert-nasscom.svg',
    driveUrl: COMMON_DRIVE_FOLDER,
  },
];

const TOOL_STRIP_ITEMS = [
  { icon: CodeXml, label: 'Python' },
  { icon: Database, label: 'SQL' },
  { icon: ChartColumn, label: 'Power BI' },
  { icon: ChartNoAxesCombined, label: 'Tableau' },
  { icon: FileSpreadsheet, label: 'Excel' },
];

function ProjectPreview({
  type,
  onOpenLightbox,
}: {
  type: Project['id'];
  onOpenLightbox?: () => void;
}) {
  const getHeaderTitle = (t: Project['id']) => {
    switch (t) {
      case 'hr':
        return 'HR ANALYTICS';
      case 'sales':
        return 'PIZZA SALES OVERVIEW';
      case 'research':
        return 'ResearchMind';
      case 'telecom':
        return 'TELECOM RAG CHATBOT';
      case 'cnn':
        return 'MRI TUMOR DETECTION';
      default:
        return 'PROJECT PREVIEW';
    }
  };

  const previewClasses = [
    'project-preview',
    type === 'sales' ? 'sales-preview' : '',
    type === 'research' ? 'research-preview' : '',
    type === 'telecom' ? 'telecom-preview' : '',
    type === 'cnn' ? 'cnn-preview' : '',
    type === 'hr' ? 'hr-preview' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={previewClasses} aria-label="Illustrative project preview">
      <div className="preview-window">
        <div className="preview-top">
          <span>{getHeaderTitle(type)}</span>
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
        </div>

        {type === 'research' ? (
          <div
            className="project-shot-content"
            onClick={onOpenLightbox}
            title="Click to view full screen"
          >
            <img
              src="/assets/researchmind-screenshot.svg"
              alt="ResearchMind AI research studio application"
              className="project-shot-img"
            />
          </div>
        ) : type === 'telecom' ? (
          <div
            className="project-shot-content"
            onClick={onOpenLightbox}
            title="Click to view full screen"
          >
            <img
              src="/assets/telecom-screenshot.svg"
              alt="Telecom Support Customer Care Assistant application"
              className="project-shot-img"
            />
          </div>
        ) : type === 'cnn' ? (
          <div
            className="project-shot-content"
            onClick={onOpenLightbox}
            title="Click to view full screen"
          >
            <img
              src="/assets/brain-tumor-screenshot.svg"
              alt="Brain Tumor Detection application"
              className="project-shot-img"
            />
          </div>
        ) : type === 'hr' ? (
          <div
            className="project-shot-content"
            onClick={onOpenLightbox}
            title="Click to view full screen"
          >
            <img
              src="/assets/hr-analytics-screenshot.svg"
              alt="Employee Retention Prediction and HR Dashboard"
              className="project-shot-img"
            />
          </div>
        ) : type === 'sales' ? (
          <div
            className="project-shot-content"
            onClick={onOpenLightbox}
            title="Click to view full screen"
          >
            <img
              src="/assets/pizza-sales-art.svg"
              alt="Pizza Sales Analysis Project Artwork"
              className="project-shot-img"
            />
          </div>
        ) : (
          <div className="mini-chart-row">
            <div className="donut" />
          </div>
        )}
      </div>
      <span className="preview-label">PROJECT PREVIEW</span>
    </div>
  );
}

export default function App() {
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    title: string;
    driveUrl?: string;
  } | null>(null);

  // Initialize theme from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mokshada-theme');
      if (stored === 'light') {
        setIsLightMode(true);
      }
    } catch {
      // ignore
    }

    // Scroll reveal observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    // Active navigation observer
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -65% 0px' }
    );

    document.querySelectorAll('main > section[id]').forEach((el) => navObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      navObserver.disconnect();
    };
  }, []);

  // Update theme data attribute on root html
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.dataset.theme = 'light';
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    const next = !isLightMode;
    setIsLightMode(next);
    try {
      localStorage.setItem('mokshada-theme', next ? 'light' : 'dark');
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Ambient Digital Sparkles across entire website */}
      <DigitalSparkles />

      {/* Site Header */}
      <header className="site-header">
        <div className="site-container header-inner">
          <a href="#home" className="brand" aria-label="Mokshada Patil home">
            <span className="brand-mark">
              m<span className="text-foreground">.</span>
            </span>
            <span>
              Mokshada<span className="text-primary">.</span>
            </span>
          </a>

          <nav
            aria-label="Main navigation"
            className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}
          >
            {NAV_ITEMS.map(([label, href]) => (
              <a
                key={href}
                href={`#${href}`}
                className={`nav-link ${activeSection === href ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="mobile-talk-wrap">
              <a
                href="#contact"
                className="lets-talk-btn w-full inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold cursor-pointer h-10 px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let’s talk <ArrowUpRight size={16} />
              </a>
            </div>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground h-9 w-9"
              onClick={toggleTheme}
              aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
              title={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <a
              href="#contact"
              className="lets-talk-btn inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-lg text-xs sm:text-sm font-semibold cursor-pointer h-9 px-3.5 sm:px-4 py-2 header-contact"
            >
              Let’s talk <ArrowUpRight size={16} />
            </a>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground h-9 w-9 mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="site-container">
            <div className="hero-layout">
              <div>
                <div className="eyebrow">Curiosity. Data. Impact.</div>
                <h1>
                  <span className="hello">Hi, I’m</span>
                  Mokshada <span className="text-primary">Patil.</span>
                </h1>
                <div className="hero-role">
                  Data Professional <span className="divider" /> Analytical Thinker
                </div>
                <p className="hero-copy">
                  I turn data into{' '}
                  <strong>insights that drive better decisions.</strong> Bringing
                  analytical thinking to life with Python, SQL, and meaningful
                  visualizations.
                </p>

                <div className="hero-buttons">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8"
                  >
                    View my projects <ArrowUpRight size={18} />
                  </a>
                  <a
                    href={PROFILE.resumeUrl}
                    download="Mokshada-Patil-Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8"
                  >
                    <Download size={18} /> Download resume
                  </a>
                </div>

                <div className="social-row">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    aria-label="Email Mokshada"
                  >
                    <Mail size={18} />
                  </a>
                  <span className="social-divider" />
                  <span className="location">
                    <MapPin size={12} /> Pune, India
                  </span>
                </div>
              </div>

              <div className="hero-art">
                <DataSculpture />
                <div className="floating-note note-top">
                  <span className="note-icon">
                    <ChartNoAxesCombined size={21} />
                  </span>
                  <div>
                    <strong>Data to decisions</strong>
                    <small>Finding the story in every dataset</small>
                  </div>
                </div>
                <div className="floating-note note-bottom">
                  <span className="note-icon">
                    <Sparkles size={20} />
                  </span>
                  <div>
                    <strong>Analytical mind. Creative edge.</strong>
                    <small>Python · SQL · Power BI</small>
                  </div>
                </div>
                <div className="art-caption">
                  <span className="status-dot" /> BUILT ON CURIOSITY
                </div>
              </div>
            </div>

            <div className="hero-footer">
              <p className="availability">
                <span className="status-dot" /> Open to Data Analyst &amp; Data
                Scientist opportunities
              </p>
              <a href="#about" className="scroll-cue">
                Scroll to explore <ArrowDown size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section pt-10 pb-16">
          <div className="site-container about-grid reveal">
            <div className="about-heading">
              <div className="eyebrow">01 / A little about me</div>
              <h2>
                A curious mind.
                <br />
                A <span className="text-primary">data-driven</span> approach.
              </h2>
              <p>Behind every number, there’s a story worth understanding.</p>
            </div>
            <div className="about-content">
              <p>
                I’m a Data Science graduate passionate about transforming raw data into meaningful insights and building data-driven solutions that solve real-world problems. With hands-on experience in Python, SQL, Excel, Power BI, and Machine Learning, I’ve worked on projects involving business analytics, predictive modeling, and interactive dashboards.
              </p>
              <p>
                I enjoy exploring data, identifying patterns, and turning complex findings into clear, actionable insights. I’m now looking for opportunities where I can apply my analytical skills, keep learning, and contribute to impactful business decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Analytical Toolkit Strip */}
        <div className="tool-strip">
          <div className="site-container tool-strip-inner">
            <div className="tool-strip-label">
              My everyday
              <br />
              analytical toolkit
            </div>
            {TOOL_STRIP_ITEMS.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.label} className="tool-logo">
                  <IconComp size={23} />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Section */}
        <section id="skills" className="section">
          <div className="site-container reveal">
            <div className="section-heading">
              <div>
                <div className="eyebrow">02 / Skills &amp; toolkit</div>
                <h2>The tools behind the insights.</h2>
              </div>
              <p>
                From raw data to clear dashboards — and the models that connect
                the dots.
              </p>
            </div>
            {/* Interactive Category Filter Toggles */}
            <div className="skills-filter-toggles" role="tablist" aria-label="Skill categories">
              <button
                type="button"
                role="tab"
                aria-selected={selectedSkillCategory === 'all'}
                onClick={() => setSelectedSkillCategory('all')}
                className={`skill-category-toggle ${selectedSkillCategory === 'all' ? 'active' : ''}`}
              >
                <span>All Skills</span>
                <span className="count-badge">
                  {SKILL_GROUPS.reduce((acc, g) => acc + g.tools.length, 0)}
                </span>
              </button>
              {SKILL_GROUPS.map((group) => {
                const isSelected = selectedSkillCategory === group.title;
                const IconComp = group.icon;
                return (
                  <button
                    key={group.title}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedSkillCategory(group.title)}
                    className={`skill-category-toggle ${isSelected ? 'active' : ''}`}
                  >
                    <IconComp size={13} />
                    <span>{group.title}</span>
                    <span className="count-badge">{group.tools.length}</span>
                  </button>
                );
              })}
            </div>

            <div className="skills-grid">
              {SKILL_GROUPS.map((group) => {
                const isCategoryActive =
                  selectedSkillCategory === 'all' || selectedSkillCategory === group.title;
                const GroupIcon = group.icon;
                return (
                  <div
                    key={group.title}
                    className={`skill-group ${isCategoryActive ? 'is-active-category' : 'is-dimmed-category'}`}
                  >
                    <GroupIcon size={25} />
                    <h3>{group.title}</h3>
                    <div className="skill-tags">
                      {group.tools.map((tool) => (
                        <span key={tool} className="skill-tag">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="site-container reveal">
            <div className="section-heading">
              <div>
                <div className="eyebrow">03 / Selected work</div>
                <h2>
                  Real questions.{' '}
                  <span className="text-primary">Data-backed answers.</span>
                </h2>
              </div>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                <Github size={15} /> All on GitHub <ArrowUpRight size={13} />
              </a>
            </div>

            <div className="projects-grid">
              {PROJECTS.map((project) => (
                <article key={project.id} className="project-card">
                  <ProjectPreview
                    type={project.id}
                    onOpenLightbox={() => {
                      const imageMap: Record<string, { src: string; alt: string; title: string }> = {
                        hr: {
                          src: '/assets/hr-analytics-screenshot.svg',
                          alt: 'Employee Retention Prediction & HR Dashboard Interface',
                          title: 'HR Analytics & Employee Retention Intelligence',
                        },
                        sales: {
                          src: '/assets/pizza-sales-art.svg',
                          alt: 'Pizza Sales Analysis Project Artwork',
                          title: 'Pizza Sales Analysis Dashboard & Business Intelligence',
                        },
                        research: {
                          src: '/assets/researchmind-screenshot.svg',
                          alt: 'ResearchMind AI Research Studio Interface',
                          title: 'ResearchMind — AI Research System',
                        },
                        telecom: {
                          src: '/assets/telecom-screenshot.svg',
                          alt: 'Telecom Support Customer Care Assistant Interface',
                          title: 'Telecom Support Customer Care Assistant',
                        },
                        cnn: {
                          src: '/assets/brain-tumor-screenshot.svg',
                          alt: 'Brain Tumor Detection Using CNN Interface',
                          title: 'Brain Tumor Detection Using CNN',
                        },
                      };
                      if (imageMap[project.id]) {
                        setLightboxImage(imageMap[project.id]);
                      }
                    }}
                  />
                  <div className="project-body">
                    <div className="project-category">{project.category}</div>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tools">
                      {project.tools.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <p className="project-metric">
                      {project.id === 'research' || project.id === 'telecom' ? (
                        <Sparkles size={13} />
                      ) : project.id === 'cnn' ? (
                        <Brain size={13} />
                      ) : (
                        <ChartNoAxesCombined size={13} />
                      )}{' '}
                      {project.metric}
                    </p>
                    <div className="project-footer">
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github size={13} /> View project
                      </a>
                      {project.demo && (
                        <a
                          className="demo-link"
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink size={13} /> Try live
                        </a>
                      )}
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title}`}
                      >
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Live Dashboards Section */}
        <section id="dashboards" className="section">
          <div className="site-container reveal">
            <div className="section-heading">
              <div>
                <div className="eyebrow">04 / Live dashboards</div>
                <h2>A clearer view of the big picture.</h2>
              </div>
              <p>
                KPIs, trends, and comparisons — making complex data easier to
                understand.
              </p>
            </div>

            <div className="dashboard-grid">
              {DASHBOARDS.map((dash) => (
                <article key={dash.id} className="dashboard-item">
                  <div className="dashboard-top">
                    <div>
                      <h3>{dash.title}</h3>
                      <p>{dash.platform}</p>
                    </div>
                    <span className="dashboard-badge">Screenshot</span>
                  </div>

                  <a
                    className="dashboard-shot"
                    href={dash.image}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open the ${dash.title} dashboard full screen`}
                    onClick={(e) => {
                      // Also open in custom lightbox on modal click if desired
                      if (!e.metaKey && !e.ctrlKey) {
                        e.preventDefault();
                        setLightboxImage({
                          src: dash.image,
                          alt: dash.alt,
                          title: dash.title,
                        });
                      }
                    }}
                  >
                    <img src={dash.image} alt={dash.alt} loading="lazy" />
                    <span className="dashboard-shot-cta">
                      <Maximize2 size={12} /> Full screen
                    </span>
                  </a>

                  <div className="dashboard-bottom">
                    <span>Static screenshot · live embed coming soon</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={dash.repo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${dash.title} source`}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground h-9 w-9"
                        title={`View ${dash.title} source`}
                      >
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="experience" className="section">
          <div className="site-container journey-grid reveal">
            <div>
              <div className="eyebrow">05 / Experience</div>
              <h2>Learning by doing.</h2>
              <div className="timeline">
                <div className="timeline-date">FEB 2025 — MAY 2025</div>
                <h3>Python with ML Intern</h3>
                <h4>RVNS Solutions Pvt. Ltd.</h4>
                <ul>
                  <li>
                    Assisted in developing predictive machine learning models
                    using Python, Pandas, NumPy, and Scikit-learn.
                  </li>
                  <li>
                    Worked on data preprocessing, exploratory analysis, feature
                    engineering, and model evaluation.
                  </li>
                </ul>
                <div className="skill-tags mt-5">
                  {['Python', 'Pandas', 'NumPy', 'Scikit-learn'].map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div id="education">
              <div className="eyebrow">06 / Education</div>
              <h2>A strong foundation.</h2>
              <div className="timeline">
                <div className="timeline-date">NOV 2022 — MAY 2026</div>
                <h3>B.Tech in Data Science</h3>
                <h4>G H Raisoni Institute of Engineering and Management</h4>
                <p>Jalgaon, Maharashtra</p>
                <div className="cgpa">
                  CGPA: <strong>{PROFILE.cgpa} / 10</strong>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg border border-border bg-card/60">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <Award size={16} /> 5 Verified Credentials
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Certifications in Data Analytics, GenAI, Networking, and Cyber Security.
                </p>
                <a
                  href="#certifications"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-2.5 font-medium"
                >
                  View visual certificate showcase <ArrowDown size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Dedicated full-width certifications section */}
          <div id="certifications" className="site-container cert-showcase reveal mt-14">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="eyebrow">Professional Certifications</div>
                <h2 className="text-3xl font-bold mt-2">Always adding to the toolkit</h2>
                <p className="text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
                  Verified certifications spanning modern data analytics, generative AI job simulations, enterprise networking, and cybersecurity practices.
                </p>
              </div>
              <a
                href={COMMON_DRIVE_FOLDER}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-5 py-2 shrink-0 self-start sm:self-auto"
                title="Open verified certificates Google Drive folder"
              >
                <ExternalLink size={16} /> Open Google Drive Folder
              </a>
            </div>

            <div className="cert-grid">
              {CERTIFICATES_DATA.map((cert) => (
                <div key={cert.id} className="cert-card">
                  <div
                    className="cert-preview-box"
                    onClick={() =>
                      setLightboxImage({
                        src: cert.image,
                        alt: cert.fullName,
                        title: cert.fullName,
                        driveUrl: cert.driveUrl,
                      })
                    }
                    title={`Click to view ${cert.fullName} full size`}
                  >
                    <img
                      src={cert.image}
                      alt={cert.fullName}
                      className="cert-preview-img"
                      loading="lazy"
                    />
                    <div className="cert-hover-overlay">
                      <Maximize2 size={16} />
                      <span>View Full Certificate</span>
                    </div>
                  </div>
                  <div className="cert-info">
                    <div>
                      <span className="cert-badge">{cert.issuer}</span>
                      <h4 className="cert-title mt-1">{cert.title}</h4>
                      <p className="cert-issuer mt-1">{cert.fullName}</p>
                    </div>
                    <div className="cert-actions">
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxImage({
                            src: cert.image,
                            alt: cert.fullName,
                            title: cert.fullName,
                            driveUrl: cert.driveUrl,
                          })
                        }
                        className="cert-btn cursor-pointer font-medium"
                      >
                        <Maximize2 size={13} /> Full View
                      </button>
                      <a
                        href={cert.driveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="cert-btn cert-drive-btn"
                        title="View certificate document in Google Drive"
                      >
                        Drive Folder <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="site-container contact-grid reveal">
            <div>
              <div className="eyebrow">07 / Let’s connect</div>
              <h2>
                Good conversations.
                <br />
                <span className="text-primary">Better possibilities.</span>
              </h2>
              <p>
                Have a data or analytics opportunity? I’m open to entry-level
                roles where I can contribute, learn from experienced teams, and
                work on real-world problems.
              </p>
            </div>

            <div className="contact-right">
              <span className="text-xs text-muted-foreground">
                Have something in mind? Say hello.
              </span>
              <a href={`mailto:${PROFILE.email}`} className="email-link">
                {PROFILE.email}
                <CircleArrowOutUpRight size={28} />
              </a>

              <div className="contact-socials">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={15} /> LinkedIn <ArrowUpRight size={12} />
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={15} /> GitHub <ArrowUpRight size={12} />
                </a>
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  download="Mokshada-Patil-Resume.pdf"
                >
                  <Download size={15} /> Resume
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="site-container footer-quote-section reveal">
          <div className="footer-quote-card">
            <span className="quote-sparkle">
              <Sparkles size={16} />
            </span>
            <h3 className="footer-quote-heading">
              “Every dataset has a story,{' '}
              <span className="quote-highlight">
                I’m here to uncover it.
              </span>”
            </h3>
            <div className="quote-subline">
              <span className="quote-dot" />
              <span>Data Professional · Analytical Thinker</span>
            </div>
          </div>
        </div>

        <div className="site-container footer-inner">
          <a href="#home" className="brand">
            Mokshada<span className="text-primary">.</span>
          </a>
          <p>© 2026 Mokshada Patil. Made with curiosity &amp; a little code.</p>
          <a href="#home" className="back-top">
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </footer>

      {/* Image Lightbox Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/90">
              <div>
                <h3 className="font-semibold text-foreground text-base">
                  {lightboxImage.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Click outside or press Close to dismiss
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {lightboxImage.driveUrl && (
                  <a
                    href={lightboxImage.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium shadow-sm"
                    title="View credentials on Google Drive"
                  >
                    <ExternalLink size={13} /> Open on Google Drive
                  </a>
                )}
                <a
                  href={lightboxImage.src}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-secondary hover:bg-accent text-foreground transition-colors"
                >
                  <ExternalLink size={13} /> Open original
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-accent transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center bg-black/40">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-h-[75vh] w-auto max-w-full rounded object-contain shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
