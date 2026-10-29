/**
 * AI SKILL GAP DETECTOR - DATA MODULE
 * Comprehensive Role & Skill Database, Master Taxonomy, Sample Profiles, and Design Thinking Data
 */

// Master Skill Taxonomy for Searchable Chips & Aliases
const MASTER_SKILLS = [
  { id: "dsa", name: "Data Structures & Algorithms", category: "Core CS", aliases: ["dsa", "algorithms", "data structures", "leetcode", "problem solving"] },
  { id: "python", name: "Python", category: "Programming Languages", aliases: ["py", "python3", "python 3", "numpy", "pandas"] },
  { id: "javascript", name: "JavaScript", category: "Programming Languages", aliases: ["js", "es6", "vanilla js", "typescript", "ecmascript"] },
  { id: "java", name: "Java", category: "Programming Languages", aliases: ["core java", "j2ee", "spring", "jvm"] },
  { id: "cpp", name: "C++", category: "Programming Languages", aliases: ["cpp", "c plus plus", "stl", "c/c++"] },
  { id: "sql", name: "SQL & Relational Databases", category: "Databases", aliases: ["sql", "mysql", "postgresql", "postgres", "sqlite", "rdbms"] },
  { id: "mongodb", name: "MongoDB & NoSQL", category: "Databases", aliases: ["mongodb", "nosql", "dynamodb", "documentdb", "redis"] },
  { id: "git", name: "Git & Version Control", category: "DevOps & Tools", aliases: ["git", "github", "gitlab", "version control", "bitbucket"] },
  { id: "react", name: "React.js", category: "Web Technologies", aliases: ["react", "reactjs", "react.js", "next.js", "redux"] },
  { id: "nodejs", name: "Node.js & Express", category: "Web Technologies", aliases: ["node", "nodejs", "node.js", "express", "expressjs"] },
  { id: "html_css", name: "HTML5 & Modern CSS", category: "Web Technologies", aliases: ["html", "html5", "css", "css3", "sass", "tailwind", "responsive design"] },
  { id: "rest_apis", name: "RESTful APIs & Microservices", category: "System Architecture", aliases: ["rest", "restful", "api", "apis", "endpoints", "fastapi"] },
  { id: "system_design", name: "System Design & Architecture", category: "System Architecture", aliases: ["system design", "scalability", "load balancer", "microservices", "caching"] },
  { id: "oop", name: "Object-Oriented Programming (OOP)", category: "Core CS", aliases: ["oop", "oops", "object oriented", "design patterns", "polymorphism", "encapsulation"] },
  { id: "docker", name: "Docker & Containerization", category: "DevOps & Tools", aliases: ["docker", "containers", "containerization", "docker-compose"] },
  { id: "kubernetes", name: "Kubernetes (K8s)", category: "DevOps & Tools", aliases: ["kubernetes", "k8s", "container orchestration", "helm"] },
  { id: "aws_cloud", name: "Cloud Computing (AWS / Azure / GCP)", category: "Cloud & Infrastructure", aliases: ["aws", "azure", "gcp", "cloud", "s3", "ec2", "lambda"] },
  { id: "linux_shell", name: "Linux & Bash Scripting", category: "DevOps & Tools", aliases: ["linux", "bash", "shell scripting", "ubuntu", "unix", "cli"] },
  { id: "cicd", name: "CI/CD Pipelines", category: "DevOps & Tools", aliases: ["ci/cd", "github actions", "jenkins", "gitlab ci", "pipeline", "continuous integration"] },
  { id: "machine_learning", name: "Machine Learning Foundations", category: "AI & Data Science", aliases: ["machine learning", "ml", "scikit-learn", "supervised learning", "regression", "classification"] },
  { id: "deep_learning", name: "Deep Learning & Neural Networks", category: "AI & Data Science", aliases: ["deep learning", "dl", "pytorch", "tensorflow", "neural networks", "keras", "cnn"] },
  { id: "data_viz", name: "Data Visualization & BI", category: "AI & Data Science", aliases: ["data visualization", "tableau", "power bi", "matplotlib", "seaborn", "looker"] },
  { id: "data_analysis", name: "Data Wrangling & Statistical Analysis", category: "AI & Data Science", aliases: ["pandas", "data analysis", "statistics", "eda", "exploratory data analysis", "hypothesis testing"] },
  { id: "testing", name: "Software Testing & Debugging", category: "Core CS", aliases: ["unit testing", "jest", "pytest", "debugging", "tdd", "qa", "test automation"] },
  { id: "networking_os", name: "Operating Systems & Computer Networks", category: "Core CS", aliases: ["os", "operating systems", "networking", "tcp/ip", "http", "dns", "concurrency", "multithreading"] }
];

// Target Roles Database with 10-12 weighted skills each
const TARGET_ROLES = [
  {
    id: "software_dev",
    title: "Software Developer",
    badge: "Most Popular",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    shortDesc: "Builds core business logic, robust backend components, and high-performance algorithms.",
    skills: [
      {
        name: "Data Structures & Algorithms",
        category: "Core CS",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["dsa", "algorithms", "data structures", "leetcode", "time complexity"],
        estimatedHours: 45,
        resources: ["NeetCode 150 Core Roadmap", "MIT OCW 6.006 Intro to Algorithms"],
        whyItMatters: "The bedrock of technical interview clearing and writing scalable, memory-efficient production software."
      },
      {
        name: "Object-Oriented Programming (OOP)",
        category: "Core CS",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["oop", "oops", "design patterns", "solid principles", "inheritance"],
        estimatedHours: 25,
        resources: ["Refactoring Guru Design Patterns", "Head First Object-Oriented Analysis & Design"],
        whyItMatters: "Mandatory for writing maintainable, modular, enterprise-grade application code."
      },
      {
        name: "Core Language (Java / C++ / Python)",
        category: "Programming Languages",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["java", "cpp", "c++", "python", "py", "c#"],
        estimatedHours: 35,
        resources: ["Java / Python Official Documentation", "Effective Java / Fluent Python by O'Reilly"],
        whyItMatters: "Deep mastery of memory models, concurrency, and idiom in at least one enterprise language."
      },
      {
        name: "SQL & Relational Databases",
        category: "Databases",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["sql", "mysql", "postgresql", "postgres", "rdbms", "database"],
        estimatedHours: 20,
        resources: ["Mode Analytics SQL Tutorial", "Use The Index, Luke (Database Indexing Guide)"],
        whyItMatters: "Developers must craft optimized queries, manage transactions, and understand normalization."
      },
      {
        name: "Git & Version Control",
        category: "DevOps & Tools",
        weight: 4,
        requiredLevel: 4,
        synonyms: ["git", "github", "gitlab", "branching", "merge conflicts"],
        estimatedHours: 12,
        resources: ["Pro Git Interactive Book", "GitHub Skills Collaborative Workflow"],
        whyItMatters: "Daily prerequisite for team collaboration, code reviews, and automated release branches."
      },
      {
        name: "RESTful APIs & Networking",
        category: "System Architecture",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["rest", "api", "apis", "http", "endpoints", "json", "postman"],
        estimatedHours: 18,
        resources: ["MDN HTTP Networking Guide", "RESTful API Design Best Practices by Microsoft"],
        whyItMatters: "Interconnecting client applications and backend microservices securely and cleanly."
      },
      {
        name: "Software Testing & Debugging",
        category: "Core CS",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["unit testing", "junit", "pytest", "debugging", "test driven development"],
        estimatedHours: 15,
        resources: ["Test Driven Development by Example (Kent Beck)", "Chrome DevTools & GDB Debugging Workshops"],
        whyItMatters: "Ensures defect-free deployment and guards against regressions in agile development."
      },
      {
        name: "Operating Systems & Multithreading",
        category: "Core CS",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["operating systems", "os", "concurrency", "multithreading", "processes", "memory management"],
        estimatedHours: 22,
        resources: ["Operating Systems: Three Easy Pieces (Arpaci-Dusseau)", "CS 162 Berkeley OS Course Notes"],
        whyItMatters: "Critical for understanding process scheduling, file locks, race conditions, and threads."
      },
      {
        name: "System Design Basics",
        category: "System Architecture",
        weight: 3,
        requiredLevel: 2,
        synonyms: ["system design", "scalability", "load balancing", "caching", "architecture"],
        estimatedHours: 20,
        resources: ["System Design Primer on GitHub", "Alex Xu System Design Interview Volume 1"],
        whyItMatters: "Essential for scaling services past thousands of concurrent users and avoiding bottlenecks."
      },
      {
        name: "Linux & Command Line",
        category: "DevOps & Tools",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["linux", "bash", "cli", "terminal", "shell scripting", "ubuntu"],
        estimatedHours: 14,
        resources: ["The Linux Command Line (William Shotts)", "Linux Journey Online Tutorials"],
        whyItMatters: "Server deployment, log analysis, and automated build scripts run primarily in POSIX environments."
      }
    ]
  },
  {
    id: "web_dev",
    title: "Web Developer",
    badge: "High Demand",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    shortDesc: "Specializes in client-facing interactive web applications, UI architecture, and responsive designs.",
    skills: [
      {
        name: "HTML5 & Modern CSS",
        category: "Web Technologies",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["html", "html5", "css", "css3", "flexbox", "grid", "tailwind", "responsive design"],
        estimatedHours: 25,
        resources: ["MDN Web Docs: CSS Layout & Grid", "Josh Comeau: CSS for JavaScript Developers Guide"],
        whyItMatters: "Foundational structure and pixel-perfect responsive styling across all devices and screen sizes."
      },
      {
        name: "JavaScript (ES6+)",
        category: "Programming Languages",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["javascript", "js", "es6", "vanilla js", "ecmascript"],
        estimatedHours: 35,
        resources: ["javascript.info Modern JS Tutorial", "You Don't Know JS Yet (Kyle Simpson)"],
        whyItMatters: "Core language powering the modern web: closures, event loop, async/await, and DOM APIs."
      },
      {
        name: "React.js Ecosystem",
        category: "Web Technologies",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["react", "reactjs", "react.js", "hooks", "next.js", "state management"],
        estimatedHours: 40,
        resources: ["React Official Documentation (react.dev)", "Full Stack Open (University of Helsinki)"],
        whyItMatters: "The industry standard library for declarative component-based UI engineering and fast rendering."
      },
      {
        name: "Git & GitHub Collaboration",
        category: "DevOps & Tools",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["git", "github", "pr", "pull request", "branching"],
        estimatedHours: 12,
        resources: ["GitHub Learning Labs: Intro to PRs", "Atlassian Git Workflows Handbook"],
        whyItMatters: "Essential for team pull requests, feature branches, and deploying preview branches."
      },
      {
        name: "REST APIs & Asynchronous Data Fetching",
        category: "Web Technologies",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["fetch", "axios", "rest", "api", "json", "async await"],
        estimatedHours: 16,
        resources: ["MDN: Working with Server Data", "TanStack React Query Fundamentals"],
        whyItMatters: "Loading server state gracefully with pagination, caching, error handling, and skeleton loaders."
      },
      {
        name: "Web Performance & Optimization",
        category: "Web Technologies",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["performance", "core web vitals", "lighthouse", "lazy loading", "bundling"],
        estimatedHours: 18,
        resources: ["Google Web.dev Core Web Vitals", "Debugging Website Performance by Addy Osmani"],
        whyItMatters: "Fast initial paints and snappy responsiveness directly boost SEO rankings and conversion rates."
      },
      {
        name: "TypeScript Foundations",
        category: "Programming Languages",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["typescript", "ts", "types", "type system"],
        estimatedHours: 20,
        resources: ["TypeScript Handbook for JS Programmers", "Matt Pocock's Total TypeScript Beginner Path"],
        whyItMatters: "Catches type regressions at build time and brings rock-solid autocompletion to large team codebases."
      },
      {
        name: "Web Accessibility (WCAG & ARIA)",
        category: "Web Technologies",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["accessibility", "a11y", "wcag", "aria", "screen reader"],
        estimatedHours: 14,
        resources: ["W3C Web Accessibility Initiative Essentials", "A11ycasts by Rob Dodson (Google Chrome Developers)"],
        whyItMatters: "Ensures inclusivity for users with disabilities and guarantees legal and compliance standards."
      },
      {
        name: "Testing (Jest / React Testing Library)",
        category: "Core CS",
        weight: 3,
        requiredLevel: 2,
        synonyms: ["jest", "react testing library", "cypress", "unit testing"],
        estimatedHours: 16,
        resources: ["Kent C. Dodds Testing JavaScript Articles", "Jest Official Getting Started Guide"],
        whyItMatters: "Prevents UI regression bugs when refactoring components and upgrading third-party packages."
      },
      {
        name: "Node.js Basics for Tooling",
        category: "Web Technologies",
        weight: 2,
        requiredLevel: 2,
        synonyms: ["node", "npm", "vite", "webpack", "nodejs"],
        estimatedHours: 12,
        resources: ["NodeJS Dev Official Guides", "Vite.js Modern Bundling Deep Dive"],
        whyItMatters: "Underpins the contemporary front-end package management ecosystem, builds, and SSR pipelines."
      }
    ]
  },
  {
    id: "data_analyst",
    title: "Data Analyst",
    badge: "Analytics",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    shortDesc: "Translates raw datasets into clear strategic insights, visual dashboards, and business decisions.",
    skills: [
      {
        name: "Advanced SQL & Querying",
        category: "Databases",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["sql", "window functions", "joins", "subqueries", "cte", "aggregation"],
        estimatedHours: 35,
        resources: ["StrataScratch SQL Interview Problems", "Alex The Analyst SQL Bootcamp"],
        whyItMatters: "The primary language used to extract, join, aggregate, and slice multi-million row data warehouses."
      },
      {
        name: "Data Visualization (Tableau / Power BI)",
        category: "AI & Data Science",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["tableau", "power bi", "powerbi", "dashboards", "data viz", "looker"],
        estimatedHours: 30,
        resources: ["Storytelling with Data by Cole Nussbaumer", "Tableau Public Community Guided Labs"],
        whyItMatters: "Communicating key trends and insights to non-technical stakeholders and executive teams."
      },
      {
        name: "Python for Data Analysis (Pandas, NumPy)",
        category: "AI & Data Science",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["pandas", "numpy", "python", "data cleaning", "wrangling"],
        estimatedHours: 32,
        resources: ["Python for Data Analysis (Wes McKinney)", "Kaggle Pandas & Data Cleaning Micro-courses"],
        whyItMatters: "Automates repetitive transformations, merges messy CSVs, and structures unstructured records."
      },
      {
        name: "Business Statistics & Probability",
        category: "AI & Data Science",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["statistics", "probability", "hypothesis testing", "a/b testing", "correlation", "p-value"],
        estimatedHours: 25,
        resources: ["Khan Academy Statistics & Probability Track", "Practical Statistics for Data Scientists (Bruce & Bruce)"],
        whyItMatters: "Separates genuine statistical signals from random noise to validate business hypotheses."
      },
      {
        name: "Advanced Excel & Spreadsheets",
        category: "DevOps & Tools",
        weight: 3,
        requiredLevel: 4,
        synonyms: ["excel", "vlookup", "xlookup", "pivot tables", "sheets", "formulas"],
        estimatedHours: 15,
        resources: ["Chandoo Excel Analytics Masterclass", "Excel Jet Core Shortcuts & Formulas"],
        whyItMatters: "Ubiquitous in corporate settings for rapid ad-hoc calculations, pivots, and client sharing."
      },
      {
        name: "Exploratory Data Analysis (EDA)",
        category: "AI & Data Science",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["eda", "seaborn", "matplotlib", "outlier detection", "distribution"],
        estimatedHours: 20,
        resources: ["Kaggle Exploratory Data Analysis Guides", "Data Camp EDA Case Studies in Python"],
        whyItMatters: "Uncovering outliers, skewed distributions, and null patterns before feeding data into models."
      },
      {
        name: "Data Cleaning & Preprocessing",
        category: "AI & Data Science",
        weight: 4,
        requiredLevel: 4,
        synonyms: ["data cleaning", "imputation", "parsing", "regex", "normalization"],
        estimatedHours: 18,
        resources: ["Data Cleaning Recipes in Python (O'Reilly)", "OpenRefine Data Hygiene Playbook"],
        whyItMatters: "Real-world data is 80% dirty; reliable metrics require meticulous sanitation and deduplication."
      },
      {
        name: "Git & Version Control for Analytics",
        category: "DevOps & Tools",
        weight: 2,
        requiredLevel: 2,
        synonyms: ["git", "github", "notebooks"],
        estimatedHours: 10,
        resources: ["Git for Data Science Workflow", "Managing Jupyter Notebooks with Git (ReviewNB)"],
        whyItMatters: "Tracks revisions in SQL scripts and notebooks, ensuring reproducible analytical findings."
      },
      {
        name: "Metric Formulation & KPI Design",
        category: "Core CS",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["kpi", "metrics", "retention", "cohort analysis", "churn", "business acumen"],
        estimatedHours: 16,
        resources: ["Reforge Metric Hierarchy Framework", "Lean Analytics (Croll & Yoskovitz)"],
        whyItMatters: "Translates abstract business objectives like 'growth' into quantifiable north-star indicators."
      },
      {
        name: "Data Warehousing Basics (Snowflake / BigQuery)",
        category: "Databases",
        weight: 3,
        requiredLevel: 2,
        synonyms: ["bigquery", "snowflake", "redshift", "data warehouse", "etl"],
        estimatedHours: 14,
        resources: ["Google Cloud BigQuery Sandbox Lab", "Fundamentals of Data Engineering (Reis & Housley)"],
        whyItMatters: "Navigating modern enterprise cloud lakes where petabyte-scale analytics live."
      }
    ]
  },
  {
    id: "ml_engineer",
    title: "Machine Learning Engineer",
    badge: "Cutting-Edge",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z"></path><path d="M16 11v1a4 4 0 0 1-8 0v-1"></path><path d="M6 15h12l2 6H4l2-6z"></path></svg>`,
    shortDesc: "Designs, trains, and deploys predictive intelligence models, neural networks, and ML pipelines.",
    skills: [
      {
        name: "Python Mastery & Vectorization",
        category: "Programming Languages",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["python", "numpy", "scipy", "broadcasting", "vectorization"],
        estimatedHours: 35,
        resources: ["Fluent Python (Luciano Ramalho)", "Stanford CS231n Python/NumPy Tutorial"],
        whyItMatters: "The primary lingua franca for state-of-the-art AI frameworks and low-latency tensor ops."
      },
      {
        name: "Machine Learning Algorithms",
        category: "AI & Data Science",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["machine learning", "ml", "scikit-learn", "random forest", "xgboost", "svm", "regression"],
        estimatedHours: 45,
        resources: ["Andrew Ng Machine Learning Specialization", "Hands-On Machine Learning (Aurélien Géron)"],
        whyItMatters: "Core intuition for bias-variance tradeoff, regularization, decision trees, and ensemble boosting."
      },
      {
        name: "Deep Learning (PyTorch / TensorFlow)",
        category: "AI & Data Science",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["pytorch", "tensorflow", "deep learning", "neural networks", "keras", "backprop"],
        estimatedHours: 50,
        resources: ["fast.ai Practical Deep Learning for Coders", "PyTorch Official Deep Learning 60-Minute Blitz"],
        whyItMatters: "Powers computer vision, speech synthesis, and modern transformer architectures."
      },
      {
        name: "Linear Algebra & Calculus for ML",
        category: "Core CS",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["linear algebra", "calculus", "matrix multiplication", "eigenvalues", "gradients"],
        estimatedHours: 25,
        resources: ["3Blue1Brown Essence of Linear Algebra", "Mathematics for Machine Learning (Deisenroth)"],
        whyItMatters: "Necessary to understand gradient descent, loss landscapes, embeddings, and matrix transforms."
      },
      {
        name: "Data Structures & Algorithms",
        category: "Core CS",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["dsa", "algorithms", "data structures", "complexity"],
        estimatedHours: 30,
        resources: ["NeetCode 75 Curated Problems", "Algorithms by Sedgewick & Wayne"],
        whyItMatters: "Inference pipelines must process incoming batches within strict milliseconds budget."
      },
      {
        name: "MLOps & Model Deployment",
        category: "DevOps & Tools",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["mlops", "mlflow", "docker", "fastapi", "model serving", "wandb", "triton"],
        estimatedHours: 28,
        resources: ["Made With ML (Goku Mohandas)", "Full Stack Deep Learning Course Notes"],
        whyItMatters: "Takes models out of experimental Jupyter notebooks into continuous live production serving."
      },
      {
        name: "SQL & Feature Stores",
        category: "Databases",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["sql", "feature store", "feature engineering", "feast"],
        estimatedHours: 18,
        resources: ["Feature Engineering for Machine Learning (Alice Zheng)", "SQL for Data Science (Coursera UC Davis)"],
        whyItMatters: "Curating clean training-serving skew-free data sets from historical tables."
      },
      {
        name: "Docker & Containerization",
        category: "DevOps & Tools",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["docker", "containers", "dockerfile"],
        estimatedHours: 15,
        resources: ["Docker for Data Scientists Guide", "Dive Into Docker Hands-on Tutorial"],
        whyItMatters: "Encapsulates CUDA drivers, Python virtualenvs, and package dependencies reproducibly."
      },
      {
        name: "Natural Language Processing / LLM Basics",
        category: "AI & Data Science",
        weight: 3,
        requiredLevel: 2,
        synonyms: ["nlp", "transformers", "huggingface", "llm", "langchain", "embeddings"],
        estimatedHours: 25,
        resources: ["Hugging Face NLP Course", "Jay Alammar's Illustrated Transformer"],
        whyItMatters: "Modern enterprises demand generative AI capabilities, RAG pipelines, and embeddings search."
      },
      {
        name: "Git & Model Versioning",
        category: "DevOps & Tools",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["git", "dvc", "version control", "reproducibility"],
        estimatedHours: 12,
        resources: ["DVC (Data Version Control) Get Started", "Pro Git Workflows Guide"],
        whyItMatters: "Links exact code commits with specific dataset hashes and model weights."
      }
    ]
  },
  {
    id: "fullstack_dev",
    title: "Full Stack Developer",
    badge: "Versatile",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
    shortDesc: "End-to-end builder bridging intuitive UI frontends with scalable APIs and database persistence.",
    skills: [
      {
        name: "JavaScript & TypeScript",
        category: "Programming Languages",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["javascript", "js", "typescript", "ts", "es6"],
        estimatedHours: 35,
        resources: ["Total TypeScript by Matt Pocock", "JavaScript The Definitive Guide (David Flanagan)"],
        whyItMatters: "Shared language across client components, backend handlers, and shared data schemas."
      },
      {
        name: "Frontend Framework (React / Next.js)",
        category: "Web Technologies",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["react", "react.js", "next.js", "nextjs", "vue", "frontend"],
        estimatedHours: 35,
        resources: ["Official Next.js App Router Documentation", "FullStackOpen React & GraphQL Course"],
        whyItMatters: "Building responsive, server-rendered, or client-rendered interactive web experiences."
      },
      {
        name: "Backend Server (Node.js / Express / Python)",
        category: "Web Technologies",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["node", "nodejs", "express", "fastapi", "django", "spring boot", "backend"],
        estimatedHours: 32,
        resources: ["Node.js Design Patterns (Mario Casciaro)", "Building Microservices with Node.js"],
        whyItMatters: "Creating resilient business rules, auth pipelines, background jobs, and webhooks."
      },
      {
        name: "SQL & NoSQL Databases",
        category: "Databases",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["sql", "postgresql", "postgres", "mongodb", "prisma", "orm", "nosql"],
        estimatedHours: 25,
        resources: ["Prisma Data Guide to Relational Databases", "MongoDB University M001 Course"],
        whyItMatters: "Modeling complex relational entities, foreign key constraints, indexes, and document caching."
      },
      {
        name: "REST & GraphQL API Architecture",
        category: "System Architecture",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["rest", "api", "apis", "graphql", "crud", "postman"],
        estimatedHours: 18,
        resources: ["RESTful Web APIs (Leonard Richardson)", "Apollo GraphQL Fullstack Tutorial"],
        whyItMatters: "Contract-driven communications connecting web and mobile clients to backend services."
      },
      {
        name: "Authentication & Security (JWT, OAuth)",
        category: "System Architecture",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["auth", "jwt", "oauth", "sessions", "cors", "csrf", "security"],
        estimatedHours: 16,
        resources: ["OWASP Top 10 Web Application Security Risks", "Auth0 Architecture Guide to Modern Auth"],
        whyItMatters: "Guarding private user data, handling token refreshes, and stopping OWASP vulnerabilities."
      },
      {
        name: "Git & Team Collaboration",
        category: "DevOps & Tools",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["git", "github", "pr", "branching"],
        estimatedHours: 12,
        resources: ["Pro Git Official Handbook", "GitHub Collaborative Workflows"],
        whyItMatters: "Managing monorepos, code reviews, and resolving upstream rebase challenges."
      },
      {
        name: "Docker & Cloud Deployment",
        category: "DevOps & Tools",
        weight: 3,
        requiredLevel: 2,
        synonyms: ["docker", "cloud", "aws", "vercel", "render", "deploy"],
        estimatedHours: 15,
        resources: ["Docker for Web Developers", "Vercel / AWS Amplify Deployment Quickstarts"],
        whyItMatters: "Packaging apps into lightweight containers and provisioning cloud production instances."
      },
      {
        name: "Data Structures & Algorithms",
        category: "Core CS",
        weight: 3,
        requiredLevel: 2,
        synonyms: ["dsa", "algorithms", "problem solving"],
        estimatedHours: 24,
        resources: ["Grokking Algorithms (Aditya Bhargava)", "LeetCode Top 50 Easy & Mediums"],
        whyItMatters: "Clearing tech screens and avoiding catastrophic O(N^2) loops in server controllers."
      },
      {
        name: "Automated Testing (Unit & Integration)",
        category: "Core CS",
        weight: 3,
        requiredLevel: 2,
        synonyms: ["testing", "jest", "playwright", "supertest", "cypress"],
        estimatedHours: 15,
        resources: ["Testing JavaScript by Kent C. Dodds", "Playwright End-to-End Testing Docs"],
        whyItMatters: "Verifying that full user flows (sign up -> checkout) function end-to-end without breaks."
      }
    ]
  },
  {
    id: "cloud_devops",
    title: "Cloud & DevOps Engineer",
    badge: "Infrastructure",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
    shortDesc: "Automates CI/CD delivery pipelines, manages cloud infrastructure, and guarantees 99.9% uptime.",
    skills: [
      {
        name: "Linux Systems Administration & Bash",
        category: "DevOps & Tools",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["linux", "bash", "shell scripting", "posix", "sysadmin", "ubuntu"],
        estimatedHours: 35,
        resources: ["UNIX and Linux System Administration Handbook", "OverTheWire Bandit Wargame"],
        whyItMatters: "Every cloud node, pod, and automated pipeline agent runs atop a hardened Linux kernel."
      },
      {
        name: "Docker Containerization",
        category: "DevOps & Tools",
        weight: 5,
        requiredLevel: 4,
        synonyms: ["docker", "containers", "dockerfile", "multi-stage builds", "compose"],
        estimatedHours: 25,
        resources: ["Docker Deep Dive (Nigel Poulton)", "Play with Docker Interactive Labs"],
        whyItMatters: "Immutable packaging standard eliminating the 'works on my machine' dilemma."
      },
      {
        name: "Kubernetes (K8s) Orchestration",
        category: "DevOps & Tools",
        weight: 5,
        requiredLevel: 3,
        synonyms: ["kubernetes", "k8s", "helm", "pods", "ingress", "deployments"],
        estimatedHours: 40,
        resources: ["The Kubernetes Book by Nigel Poulton", "Mumshad Mannambeth CKA Course on KodeKloud"],
        whyItMatters: "Auto-scaling, zero-downtime rolling updates, and self-healing multi-node clusters."
      },
      {
        name: "Cloud Provider (AWS / GCP / Azure)",
        category: "Cloud & Infrastructure",
        weight: 5,
        requiredLevel: 3,
        synonyms: ["aws", "azure", "gcp", "cloud", "ec2", "s3", "iam", "vpc"],
        estimatedHours: 35,
        resources: ["AWS Certified Solutions Architect Associate Guide (Stephane Maarek)", "AWS Free Tier Hands-on Workshops"],
        whyItMatters: "Designing secure VPC subnets, IAM role policies, managed DBs, and serverless compute."
      },
      {
        name: "CI/CD Automation (GitHub Actions / Jenkins)",
        category: "DevOps & Tools",
        weight: 4,
        requiredLevel: 4,
        synonyms: ["ci/cd", "github actions", "jenkins", "gitlab ci", "pipeline", "automation"],
        estimatedHours: 24,
        resources: ["GitHub Actions Deep Dive by GitHub Docs", "Continuous Delivery by Jez Humble & David Farley"],
        whyItMatters: "Automating test suites, security scans, artifact pushing, and production releases."
      },
      {
        name: "Infrastructure as Code (Terraform)",
        category: "Cloud & Infrastructure",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["terraform", "iac", "ansible", "cloudformation", "hcl"],
        estimatedHours: 25,
        resources: ["Terraform Up & Running (Yevgeniy Brikman)", "HashiCorp Learn Terraform Tutorials"],
        whyItMatters: "Declaring immutable cloud architectures in reproducible, peer-reviewed Git repositories."
      },
      {
        name: "Networking Fundamentals & Security",
        category: "Core CS",
        weight: 4,
        requiredLevel: 3,
        synonyms: ["networking", "dns", "tcp/ip", "tls/ssl", "vpn", "firewalls", "cidr"],
        estimatedHours: 22,
        resources: ["Computer Networking: A Top-Down Approach (Kurose)", "Cloudflare Learning Center: How Does the Internet Work"],
        whyItMatters: "Troubleshooting DNS propagation, TLS certificate handshakes, ingress routes, and load balancers."
      },
      {
        name: "Monitoring & Observability (Prometheus, Grafana)",
        category: "DevOps & Tools",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["prometheus", "grafana", "observability", "logging", "elk", "datadog", "metrics"],
        estimatedHours: 18,
        resources: ["Site Reliability Engineering (Google SRE Book)", "Prometheus: Up & Running (Brian Brazil)"],
        whyItMatters: "Detecting latency spikes and system degradation before users experience outages."
      },
      {
        name: "Scripting Language (Python or Go)",
        category: "Programming Languages",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["python", "golang", "go", "automation script"],
        estimatedHours: 20,
        resources: ["Automate the Boring Stuff with Python", "Learn Go with Tests (Chris James)"],
        whyItMatters: "Writing cloud automation bots, CLI helpers, and custom metric exporters."
      },
      {
        name: "Git & Version Control",
        category: "DevOps & Tools",
        weight: 3,
        requiredLevel: 3,
        synonyms: ["git", "github", "gitops"],
        estimatedHours: 12,
        resources: ["GitOps and Kubernetes Handbook", "Pro Git Workflows"],
        whyItMatters: "GitOps models use Git repositories as the single source of truth for cloud state."
      }
    ]
  }
];

// Realistic Sample Student Profiles for testing and one-click demo
const SAMPLE_STUDENTS = {
  defaultStudent: {
    name: "Aarav Sharma",
    title: "3rd Year Computer Science Undergrad",
    college: "Apex Institute of Technology",
    targetRole: "software_dev",
    resumeText: `AARAV SHARMA
Third-Year B.Tech in Computer Science & Engineering | CGPA: 8.4/10
GitHub: github.com/aaravsharma | Portfolio: aaravcodes.dev

SUMMARY:
Passionate computer science student with hands-on experience in Java, Python, and frontend web development. Built multiple full-stack academic projects and actively solving Data Structures & Algorithms challenges. Looking to secure a high-impact Software Developer internship.

TECHNICAL SKILLS:
- Languages: Java (Intermediate), Python (Proficient), JavaScript (ES6+), C++
- Web Development: HTML5, CSS3, React.js (Basics), REST APIs
- Databases & Tools: MySQL, Git & GitHub, VS Code, Linux (Ubuntu Basics)
- Fundamentals: Object-Oriented Programming (OOP), Data Structures (Arrays, Linked Lists, Trees), Relational Database Design

PROJECTS:
1. Campus Event Hub - Full-Stack Web Application (React, Java Spring Boot, MySQL):
   - Developed a responsive web portal for university clubs to schedule hackathons and register 1,200+ attendees.
   - Built RESTful endpoints for user auth (JWT) and integrated MySQL for relational data persistence.
   - Used Git for version control and deployed the frontend via GitHub Pages.

2. Algorithmic Pathfinding Visualizer (Python & Pygame):
   - Implemented Dijkstra's and A* search algorithms to visualize shortest paths on grid maps with obstacles.
   - Structured modular OOP classes for grid nodes, priority queues, and real-time visualization.

3. Student Attendance Tracker CLI (C++ & File I/O):
   - Created a terminal-based attendance management program utilizing binary search and hash tables for O(1) record lookups.

CERTIFICATIONS & ACHIEVEMENTS:
- HackerRank 5-Star Silver Badge in Java and Problem Solving (150+ DSA problems solved)
- Meta Certified Front-End Developer Specialization (Coursera - 2024)
- 2nd Place in Intra-College 24-Hour Hackathon (Smart Campus Category)`,
    preselectedSkills: ["dsa", "java", "python", "javascript", "html_css", "sql", "git", "oop", "rest_apis"],
    projects: "Campus Event Hub (React, Java, Spring, MySQL), Algorithmic Pathfinding Visualizer (Python, Dijkstra, OOP), Attendance CLI (C++, Hash Tables)",
    certifications: "HackerRank 5-Star in Java & Problem Solving, Meta Front-End Developer Certificate (Coursera)"
  }
};

// Design Thinking Stage Content
const DESIGN_THINKING_DATA = {
  empathize: {
    persona: {
      name: "Rhea Deshmukh",
      avatarBg: "linear-gradient(135deg, #00D4FF, #2563EB)",
      role: "3rd Year B.Tech CSE Undergrad",
      tagline: "Aspiring Software Engineer facing placement anxiety",
      goals: [
        "Secure an on-campus tier-1 software developer or web engineering role",
        "Know exactly what skills campus recruiters test versus what college syllabus teaches",
        "Have a structured, week-by-week learning roadmap instead of tutorial rabbit holes"
      ],
      frustrations: [
        "Overwhelmed by conflicting advice on YouTube, LinkedIn, and Reddit",
        "Doesn't know if her current skills (basic Java, HTML, MySQL) are interview-ready",
        "Wasting weeks learning obsolete tools instead of high-weight industry competencies"
      ]
    },
    interviewInsights: [
      {
        quote: "I know how to write a basic loop in Java, but when I see technical job listings demanding System Design and CI/CD pipelines, I have no idea how far away I actually am.",
        student: "Siddharth, 6th Semester CSE",
        takeaway: "Students lack a quantified, objective metric of their current proficiency vs job requirements."
      },
      {
        quote: "College teaches us DBMS theory with normalization formulas, but tech interviews ask live SQL window functions and database indexing that we never practiced.",
        student: "Ananya, Final Year IT",
        takeaway: "Academic curricula lag behind modern industry benchmarks by 2-3 years."
      },
      {
        quote: "Whenever I want to prepare, I start 5 different video courses, get overwhelmed by 80-hour playlists, and quit after two weeks because there's no milestone tracking.",
        student: "Karan, 5th Semester ECE",
        takeaway: "Actionable, bite-sized phased roadmaps with free high-signal resources are essential."
      }
    ]
  },
  define: {
    problemStatement: "Undergraduate engineering students lack an objective, automated mechanism to diagnose their concrete skill deficiencies against specific industry job roles, causing aimless preparation, high placement anxiety, and preventable interview rejections.",
    targetAudience: "Computer Science and Engineering undergraduates preparing for campus placements, internships, and entry-level tech careers.",
    keyDeficienciesIdentified: [
      { title: "Skill Blindspots", desc: "Students mistakenly assume familiarity with syntax equals job readiness." },
      { title: "Curriculum Gap", desc: "College labs focus on rote theory rather than practical tooling (Git, CI/CD, Testing)." },
      { title: "Decision Paralysis", desc: "Thousands of courses without prioritization leads to burnout and abandonment." }
    ]
  },
  ideate: {
    hmwQuestions: [
      {
        question: "How Might We dynamically extract and benchmark a student's real proficiency from unstructured text like resumes, projects, and coursework?",
        solution: "NLP keyword entity extraction paired with semantic proficiency weighting (evaluating frequency, project integration, and certification validation)."
      },
      {
        question: "How Might We make skill gaps instantly understandable without demoralizing the student?",
        solution: "Dual-chart visual analytics: A high-level Skill Gap Score donut chart plus a multi-axis Radar Chart contrasting student levels vs benchmark requirements."
      },
      {
        question: "How Might We bridge the identified gap into an actionable, stress-free daily routine?",
        solution: "Automated synthesis of a phased weekly roadmap ordered by gap severity, complete with estimated hours, verified free curated resources, and persistent progress checkboxes."
      }
    ],
    chosenSolutionSummary: "An intelligent, client-side AI Skill Gap Detector that combines automated resume parsing, weighted competency matrices across 6 tech disciplines, gap analytics, and an interactive phased roadmap with localStorage progress tracking."
  },
  prototype: {
    architectureHighlights: [
      { title: "Client-Side AI Engine", desc: "Deterministic heuristic extraction engine with semantic signal boosters and an extensible LLM API hook." },
      { title: "Dynamic Radar & Donut Visuals", desc: "High-contrast Chart.js visualizations highlighting domain imbalances across Core CS, Web, Databases, and DevOps." },
      { title: "Weighted Gap Calculation", desc: "Gap % = 100 - (sum of matched competencies weighted by industry criticality 1-5)." },
      { title: "Phased Roadmap Generation", desc: "Algorithmic generation of 2-week sprint milestones prioritized by highest gap-to-weight impact." },
      { title: "Persistent Progress Tracker", desc: "State-synced local storage with dynamic feedback rings and encouraging milestone nudges." }
    ]
  }
};
