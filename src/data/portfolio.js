// src/data/portfolio.js
// Single source of truth for Thanuja M's portfolio data

export const personal = {
  name: 'Thanuja M',
  initials: 'TM',
  tagline: 'DATA ANALYST • AI & DATA SCIENCE',
  headline: ['Turning Data', 'Into Meaningful', 'Insights.'],
  bio: 'Aspiring Data Analyst with a strong foundation in Python, SQL, MS Excel, and Power BI, passionate about transforming raw data into meaningful insights that support data-driven decision-making.',
  location: 'Chennai, India',
  phone: '+91 88259 12425',
  email: 'mthanuja140606@gmail.com',
  cgpa: '8.47',
  resumePath: '/resume/Thanuja_M_Resume.pdf',
};

export const socials = {
  github: 'https://github.com/mthanuja140606-ux',
  linkedin: 'https://linkedin.com/in/thanuja-m-78034a340',
  email: 'mailto:mthanuja140606@gmail.com',
};

export const about = {
  summary: [
    'I am an aspiring Data Analyst pursuing B.Tech in Artificial Intelligence and Data Science at IFET College of Engineering, Chennai.',
    'I am passionate about data analysis, visualization, and reporting — transforming raw datasets into clear, actionable insights that support intelligent decision-making.',
    'My interests span across data analytics pipelines, interactive dashboards, and AI automation workflows that bring efficiency and clarity to complex information.',
  ],
  snapshot: {
    degree: 'B.Tech — Artificial Intelligence and Data Science',
    college: 'IFET College of Engineering',
    cgpa: '8.47',
    location: 'Chennai, India',
    year: '2023 – 2027',
  },
};

export const skills = [
  {
    category: 'Programming Languages',
    icon: 'code',
    items: ['C', 'Python', 'Java'],
  },
  {
    category: 'Web Technologies',
    icon: 'globe',
    items: ['HTML', 'CSS', 'PHP'],
  },
  {
    category: 'Python Packages',
    icon: 'package',
    items: ['NumPy', 'Pandas', 'Matplotlib'],
  },
  {
    category: 'Databases',
    icon: 'database',
    items: ['SQL', 'MySQL'],
  },
  {
    category: 'Data Visualization',
    icon: 'bar-chart',
    items: ['Tableau', 'Power BI'],
  },
  {
    category: 'Core Competencies',
    icon: 'layers',
    items: ['Full Stack Development', 'Data Analytics', 'AI Automation Workflows'],
  },
  {
    category: 'Soft Skills',
    icon: 'users',
    items: ['Communication', 'Teamwork', 'Quick Learning', 'Time Management'],
  },
];

export const projects = [
  {
    id: 'solar-tracking',
    title: 'Sun Tracking & Solar Monitoring System',
    category: 'IoT & Data Analytics',
    tags: ['Sensor Data', 'Data Analysis', 'Visualization', 'IoT'],
    color: 'amber',
    description:
      'Designed a system to automatically track sunlight direction using sensors, improving solar panel efficiency and monitoring energy output.',
    details:
      'Collected and analyzed sensor data to evaluate tracking accuracy, presenting findings through simple charts and reports.',
    problem: 'Solar panels lose efficiency when fixed — they miss optimal sunlight angles throughout the day.',
    keyWork: [
      'Designed sensor-based sunlight direction tracking mechanism',
      'Collected and processed sensor data for accuracy evaluation',
      'Analyzed energy output patterns across different tracking angles',
      'Presented findings through charts and summary reports',
    ],
  },
  {
    id: 'smart-retail',
    title: 'Smart Retail & Commercial Infrastructure',
    category: 'IoT & Business Intelligence',
    tags: ['IoT', 'Dashboard Design', 'Business Intelligence', 'Data Visualization'],
    color: 'cobalt',
    description:
      'Developed a smart IoT-based infrastructure concept for retail and commercial spaces to monitor occupancy and resource usage for data-driven decisions.',
    details:
      'Proposed dashboards to visualize occupancy trends and resource utilization for better business decision-making.',
    problem: 'Retail spaces lack real-time visibility into occupancy and resource utilization patterns.',
    keyWork: [
      'Conceptualized IoT-based occupancy and resource monitoring system',
      'Designed dashboard layouts for occupancy trend visualization',
      'Proposed resource utilization analytics for operational efficiency',
      'Focused on enabling data-driven business decision-making',
    ],
  },
];

export const experience = [
  {
    id: 'tata-genai',
    company: 'TATA',
    role: 'GenAI Powered Data Analytics Virtual Internship',
    type: 'Remote',
    date: 'Jul 2026',
    order: 3,
    responsibilities: [
      'Explored Generative AI applications in data analytics workflows, including automated data summarization and insight generation.',
      'Practiced prompt engineering techniques to generate accurate summaries and actionable insights from datasets.',
      'Strengthened understanding of integrating AI tools into real-world data analytics processes.',
    ],
  },
  {
    id: 'novitech',
    company: 'NOVITECH R&D Pvt. Ltd.',
    role: 'Data Analytics Intern',
    type: 'Online · Coimbatore',
    date: 'Mar 2026',
    order: 2,
    responsibilities: [
      'Learned data analysis using Excel, SQL, Python, and Power BI.',
      'Built mini projects and interactive dashboards.',
      'Improved data visualization, resume building, and interview preparation skills.',
      'Cleaned and analyzed real-world datasets to identify trends and support data-driven recommendations.',
    ],
  },
  {
    id: 'nexgen',
    company: 'NEXGEN TECHNOLOGY',
    role: 'Full Stack Development',
    type: 'Offline · Pondicherry',
    date: 'Feb 2025',
    order: 1,
    responsibilities: [
      'Gained hands-on exposure to full stack development concepts, including front-end and back-end fundamentals.',
      'Worked with a team to build and test a basic web application, applying core HTML, CSS, and PHP concepts.',
    ],
  },
];

export const education = [
  {
    id: 'btech',
    institution: 'IFET College of Engineering',
    degree: 'B.Tech, Artificial Intelligence and Data Science',
    period: '2023 – 2027',
    score: '8.47 CGPA',
    scoreType: 'cgpa',
    current: true,
  },
  {
    id: 'hsc',
    institution: 'Sacred Heart Convent Anglo Indian Higher Secondary School',
    degree: 'HSC, Computer Science',
    period: '2022 – 2023',
    score: '70%',
    scoreType: 'percentage',
    current: false,
  },
];

export const certifications = [
  {
    id: 'ccna',
    name: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: 'June 2025',
    color: 'cobalt',
  },
  {
    id: 'skillsin',
    name: 'Contribution to National Workshop',
    issuer: 'SKILLSIN CORP',
    date: 'October 2025',
    color: 'data',
  },
  {
    id: 'genai',
    name: 'Generative AI for All',
    issuer: 'GenAI',
    date: 'January 2026',
    color: 'cobalt',
  },
  {
    id: 'ibm',
    name: 'IBM SkillsBuild',
    issuer: 'IBM',
    date: 'February 2026',
    color: 'data',
  },
];
