// Centralized portfolio data extracted from Overleaf Resumes & GitHub profiles.

export const portfolioData = {
  profile: {
    brand: "UMA SHANKAR",
    brandTag: "<US />",
    name: "Uma Shankar",
    fullName: "Kesireddi Sai Uma Shankar",
    availabilityBadge: "B.Tech CSE '26 · Springer LNEE Author · Ex-Cognizant Intern",
    roles: [
      "AI & RAG Systems Engineer",
      "Full-Stack (.NET Core & React) Developer",
      "Machine Learning Researcher",
      "AWS Certified Cloud Practitioner",
    ],
    headlineSubtitle:
      "Computer Science graduate building grounded LLM/RAG systems, ASP.NET Core & React enterprise apps, and real-time MERN/mobile solutions — with published Springer LNEE research.",
    bio: "AI-focused Computer Science engineer (B.Tech CSE, CGPA 8.42) with hands-on industry experience at Cognizant building enterprise ASP.NET Core + React systems, ML engineering internships at Prodigy InfoTech and PreTaxO, and accepted Deep Learning / NLP research at Confluence 2026 (Springer LNEE). Passionate about taking full-stack and AI products from architecture to production.",
    location: "Visakhapatnam / Vizianagaram, Andhra Pradesh, India",
    email: "ksaiumashankar@gmail.com",
    phone: "+91 94939 42499",
    phoneHref: "tel:+919493942499",
    github: "https://github.com/umashankar1735",
    githubSecondary: "https://github.com/Saiumashankar11",
    linkedin: "https://www.linkedin.com/in/sai-uma-shankar-kesireddi-3b10a3259",
    hackerrank: "https://www.hackerrank.com/profile/ksaiumashankar",
    resumeUrl: "/assets/Resume.pdf",
    avatar: "/assets/profile.jpg",
    highlights: [
      { label: "CGPA", value: "8.42 / 10" },
      { label: "Research", value: "Springer '26" },
      { label: "Cloud", value: "AWS CCP" },
    ],
  },

  skills: [
    { name: "Python & AI / ML / RAG", level: 92, category: "AI & Research" },
    { name: "ASP.NET Core, C# & SQL Server", level: 84, category: "Enterprise Backend" },
    { name: "React.js, React Native & MERN", level: 85, category: "Full-Stack" },
    { name: "AWS, Docker & Data Structures", level: 78, category: "Cloud & Core CS" },
  ],

  skillDomains: [
    {
      title: "AI, LLM & Retrieval",
      items: [
        "Python",
        "RAG & Hybrid Search",
        "Legal-BERT / T5",
        "FAISS Vector Search",
        "LangChain",
        "PyTorch & CNNs",
        "Scikit-learn",
        "Prompt Engineering",
      ],
    },
    {
      title: "Backend & Enterprise",
      items: [
        "C# / .NET 8",
        "ASP.NET Core Web API",
        "Entity Framework Core",
        "Node.js & Express",
        "Python FastAPI",
        "REST APIs & JWT",
        "Socket.IO",
      ],
    },
    {
      title: "Frontend & Mobile",
      items: [
        "React.js",
        "React Native (Expo)",
        "TypeScript",
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "Streamlit",
      ],
    },
    {
      title: "Databases, Cloud & Core",
      items: [
        "SQL Server / T-SQL",
        "MongoDB",
        "SQLite",
        "AWS (Cloud Practitioner)",
        "Docker",
        "Git & GitHub",
        "C / C++ / Java",
      ],
    },
  ],

  experience: [
    {
      role: "Software Development Intern (ASP.NET Full Stack + React)",
      company: "Cognizant",
      mode: "Onsite",
      period: "Feb 2026 - Jun 2026",
      summary:
        "Developed a full-stack Inventory Replenishment System using React.js and ASP.NET Core Web API. Built responsive UI components, integrated RESTful APIs, implemented Entity Framework Core with SQL Server, and engineered layered backend services for inventory, orders, suppliers, and stock workflows in an Agile team.",
      tech: ["ASP.NET Core", "C#", "React.js", "EF Core", "SQL Server", "Agile"],
    },
    {
      role: "Junior Machine Learning Engineer Intern",
      company: "Prodigy InfoTech",
      mode: "Remote",
      period: "Aug 2024 - Sep 2024",
      summary:
        "Delivered 4 end-to-end machine learning & computer vision projects spanning supervised/unsupervised modeling, feature engineering, evaluation pipelines, and data visualization.",
      tech: ["Python", "Scikit-learn", "Deep Learning", "Computer Vision"],
    },
    {
      role: "AI & Automation Intern",
      company: "PreTaxO – US Taxation and AI Solutions",
      mode: "Remote",
      period: "May 2023 - Jul 2023",
      summary:
        "Contributed to an AI-driven chatbot and OCR-based document extraction modules for a US taxation platform, integrating ML tax-refund prediction APIs with web workflows.",
      tech: ["Python", "OCR", "AI Chatbot", "ML APIs", "Real-Time Data"],
    },
  ],

  education: [
    {
      title: "B.Tech in Computer Science & Engineering",
      institution: "Amrita Vishwa Vidyapeetham, Amaravati",
      score: "CGPA: 8.42 / 10",
      period: "Oct 2022 - Aug 2026",
      detail: "Published Researcher (Confluence 2026 · Springer LNEE) and Inaugural Student Council President.",
    },
    {
      title: "AISSCE Senior Secondary (11th - 12th)",
      institution: "Sri Chaitanya Jr College, Visakhapatnam",
      score: "386 / 500 (77.2%)",
      period: "Jun 2020 - Jun 2022",
      detail: "Mathematics, Physics & Chemistry.",
    },
    {
      title: "AISSE Secondary (10th Std)",
      institution: "Dr. KKR's Gowtham School, Visakhapatnam",
      score: "459 / 500 (91.8%)",
      period: "Jun 2019 - Apr 2020",
      detail: "Distinction in Science & Mathematics.",
    },
  ],

  honors: [
    {
      badge: "Publication · Springer LNEE",
      title: "Confluence 2026 Accepted Paper",
      detail:
        '"Unified Digital Companion: A Scalable AI Framework for Legal Awareness and Contextual Public Support" — accepted for Springer Lecture Notes in Electrical Engineering.',
    },
    {
      badge: "Leadership · 2023 - 2026",
      title: "President, Student Council",
      detail:
        "Led Amrita Vishwa Vidyapeetham's inaugural Student Council, directing institutional-level student initiatives and campus governance.",
    },
    {
      badge: "Founder · 2023 - 2026",
      title: "Founder & President, Raksha Club",
      detail:
        "Established Raksha – Student Support & Mentorship Club, organizing technical workshops and peer mentorship programs.",
    },
    {
      badge: "Competitive Coding",
      title: "75+ LeetCode & HackerRank SQL (Advanced)",
      detail:
        "Consistent problem solving in DSA alongside verified advanced relational SQL credentials.",
    },
  ],

  projects: [
    {
      id: "unified-digital-companion",
      number: "01",
      filterGroup: "AI & Research",
      category: "Final-Year Research · Springer LNEE",
      title: "Unified Digital Companion",
      subtitle: "Grounded Legal & Institutional RAG Framework",
      image: "/assets/project-rag.jpg",
      visualType: "rag-pipeline",
      metric: "94.1% Intent Routing · 82.3% Grounding",
      description:
        "Built a scalable AI guidance system combining Legal-BERT, T5 retrieval-augmented generation, hybrid BM25 + dense retrieval, cross-encoder reranking, ensemble BERT+CNN, and FAISS vector search to deliver verifiable legal and institutional answers.",
      caseStudy: {
        problem:
          "Generic chatbots hallucinate statutory sections and fail to distinguish legal statutes from campus or institutional policy queries when grounded citations are required.",
        solution:
          "Engineered a multi-stage intent router (ensemble BERT + CNN) feeding a hybrid BM25 lexical + dense FAISS retriever, cross-encoder reranking, and grounded T5 generation.",
        impact: [
          "Achieved 94.1% intent routing accuracy and 82.3% answer grounding score across evaluation sets.",
          "Accepted for publication at Confluence 2026 (Springer Lecture Notes in Electrical Engineering - LNEE).",
          "Shipped an interactive Streamlit interface surfacing cited statutory & policy passages with 0.0% measured hallucination.",
        ],
      },
      tags: ["Python", "Legal-BERT", "T5 RAG", "FAISS", "BM25", "Cross-Encoder"],
      github: "https://github.com/umashankar1735/unified-digital-companion",
      hasPublication: true,
    },
    {
      id: "elyro",
      number: "02",
      filterGroup: "Full-Stack & .NET",
      category: "Fintech Telemetry · Express 5 + React 19",
      title: "ELYRO",
      subtitle: "Automated Expense Telemetry & Email Stream Ingestion",
      image: "/assets/project-elyro.jpg",
      visualType: "elyro-stream",
      metric: "Zero-Touch IMAP Ingestion · libSQL",
      description:
        "Zero-touch financial telemetry engine that automatically ingests bank & UPI transactions via persistent IMAP email streaming (imapflow + mailparser), normalizes financial attributes, and stores indexed telemetry in libSQL/SQLite with a React 19 + Tailwind v4 UI.",
      caseStudy: {
        problem:
          "Manual expense tracking suffers from 90%+ user dropoff within weeks, while mobile SMS scrapers are blocked by modern OS security sandboxes.",
        solution:
          "Engineered an event-driven background pipeline establishing long-lived IMAP IDLE sockets to parse incoming bank transaction MIME alerts in <40ms, extract merchant/amount AST tokens, and update embedded libSQL tables.",
        impact: [
          "Eliminated manual transaction entry with 100% automated parsing of bank and UPI alert envelopes.",
          "Guaranteed strict local privacy and sub-4ms query aggregation via embedded libSQL/SQLite.",
          "Modern reactive dashboard built on React 19 and Tailwind v4 with optimistic transaction updates.",
        ],
      },
      tags: ["React 19", "Express 5", "libSQL", "IMAPFlow", "Tailwind v4", "Node.js"],
      github: "https://github.com/umashankar1735",
    },
    {
      id: "instore-optima",
      number: "03",
      filterGroup: "Full-Stack & .NET",
      category: "Enterprise .NET 8 · Clean Architecture",
      title: "InStore Optima",
      subtitle: "Retail Inventory, Orders & Automated Replenishment",
      image: "/assets/project-instore.jpg",
      visualType: "dotnet-layers",
      metric: "4-Layer .NET 8 Clean Architecture",
      description:
        "Comprehensive retail Inventory & Order Management System architected across Api, Application, Domain, and Infrastructure layers. Automates stock threshold replenishment, supplier workflows, invoicing, payments, operational tasks, and audit logging.",
      caseStudy: {
        problem:
          "Store managers lose revenue to silent stockouts, manual purchase-order spreadsheets, and un-audited inventory adjustments across suppliers and billing.",
        solution:
          "Structured an enterprise ASP.NET Core (.NET 8) solution strictly separated into Api, Application, Domain, and Infrastructure layers backed by Entity Framework Core and SQL Server.",
        impact: [
          "Automated low-stock threshold alerts, supplier restock workflows, and customer invoicing.",
          "Enforced audit logging across payments, operational task queues, and inventory mutations.",
          "Clean separation of business entities from persistence for testability and Agile iteration.",
        ],
      },
      tags: ["C#", ".NET 8", "ASP.NET Core", "EF Core", "SQL Server", "Layered Arch"],
      github: "https://github.com/Saiumashankar11/instore_optima",
    },
    {
      id: "spatio-temporal-video-summarizer",
      number: "04",
      filterGroup: "AI & Research",
      category: "Deep Learning · 29M+ Parameter Fusion",
      title: "Spatio-Temporal Video Summarizer",
      subtitle: "ResNet-50 + BiLSTM Multi-Head Attention Pipeline",
      image: "/assets/project-videosummarizer.jpg",
      visualType: "video-summarizer",
      metric: "29M+ Parameter Fusion Model",
      description:
        "State-of-the-art video summarization system combining spatial appearance extraction (ResNet-50, 24M params) with temporal sequence modeling (Bidirectional LSTM, 4M params) and multi-head self-attention to generate concise, representative summary reels from multi-format video footage.",
      caseStudy: {
        problem:
          "Reviewing long-form video archives and surveillance is humanly intractable, while uniform keyframe subsampling misses brief critical actions or retains redundant static frames.",
        solution:
          "Designed a 29M-parameter cross-modal architecture fusing ResNet-50 frame embeddings with a Bidirectional LSTM and multi-head temporal attention, solving keyframe selection via knapsack budget optimization.",
        impact: [
          "Compresses long videos down to 15-20% duration while preserving core semantic narrative flow.",
          "Asynchronous chunked processing in Flask with real-time React upload and progress telemetry.",
          "Broad video codec support across MP4, AVI, MOV, MKV, and WebM containers.",
        ],
      },
      tags: ["PyTorch", "ResNet-50", "BiLSTM", "Attention", "Flask", "React UI"],
      github: "https://github.com/umashankar1735/spatio-temporal-video-summarization",
    },
    {
      id: "ai-guardian",
      number: "05",
      filterGroup: "Full-Stack & .NET",
      category: "Hackathon Team Lead · Mobile + AI",
      title: "AI Guardian for Women Safety",
      subtitle: "Real-Time SOS, Red-Zone Alerts & Sensor AI",
      image: "/assets/project-guardian.jpg",
      visualType: "safety-sos",
      metric: "Real-Time Socket.IO + ML Filter",
      description:
        "Led development of a cross-platform women's safety mobile app with red-zone alerts, SOS triggers, fake-call simulation, Google Maps tracking, gamified awareness challenges, and a FastAPI + Scikit-learn sensor pipeline reducing false positives.",
      caseStudy: {
        problem:
          "Emergency safety apps suffer from accidental SOS false alarms triggered by normal motion and lack real-time geo-contextual hazard awareness.",
        solution:
          "Built a React Native (TypeScript) mobile client paired with Node.js + Socket.IO live location rooms, MongoDB storage, and a FastAPI + Scikit-learn accelerometer anomaly classifier.",
        impact: [
          "Combined instant SOS dispatch, Google Maps live tracking, red-zone warnings, and fake-call triggers.",
          "Filtered out benign motion spikes via the FastAPI + Scikit-learn sensor verification microservice.",
          "Added gamified safety awareness challenges while leading full-stack delivery as team lead.",
        ],
      },
      tags: ["React Native", "TypeScript", "Node.js", "MongoDB", "Socket.IO", "FastAPI"],
      github: "https://github.com/umashankar1735/ai-for-women-safety",
    },
    {
      id: "deepfake-detect",
      number: "06",
      filterGroup: "AI & Research",
      category: "Computer Vision · PyTorch ResNet-18",
      title: "DeepFakeDetect++",
      subtitle: "Video & Frame Facial Authenticity Pipeline",
      image: "/assets/project-deepfake.jpg",
      visualType: "deepfake-scanner",
      metric: "ResNet-18 + FastAPI /predict/",
      description:
        "End-to-end deepfake detection workflow featuring OpenCV frame extraction from DFDC-style metadata, PyTorch ResNet-18 transfer learning, video-level prediction aggregation, and a FastAPI inference endpoint.",
      caseStudy: {
        problem:
          "Single-frame facial classifiers often miss temporal synthesis artifacts across video clips or lack a deployable API boundary for real-world media verification.",
        solution:
          "Created an OpenCV frame-sampling pipeline with DFDC-style dataset indexing, fine-tuned PyTorch ResNet-18 weights, and aggregated frame scores behind a FastAPI `/predict/` service.",
        impact: [
          "Delivered end-to-end training, frame extraction, and video-level authenticity scoring.",
          "Exposed a clean JSON inference endpoint (`POST /predict/`) ready for web client integration.",
        ],
      },
      tags: ["Python", "PyTorch", "ResNet-18", "OpenCV", "FastAPI"],
      github: "https://github.com/umashankar1735/DeepFake-11",
    },
    {
      id: "nlp-keyword-extractor",
      number: "07",
      filterGroup: "AI & Research",
      category: "NLP & Information Retrieval · KeyBERT / TextRank",
      title: "Automated Keyword Extraction",
      subtitle: "Unsupervised Scientific Keyphrase Mining Pipeline",
      image: "/assets/project-nlp.jpg",
      visualType: "nlp-extract",
      metric: "Multi-Model Salience Scoring",
      description:
        "Automated NLP keyphrase extraction system developed under Dr. Riyanka Manna at Amrita Vishwa Vidyapeetham, synthesizing statistical TF-IDF/RAKE, graph-based TextRank, and dense KeyBERT embeddings with maximal marginal relevance (MMR) and POS noun-phrase chunking.",
      caseStudy: {
        problem:
          "Manual keyword tagging for unstructured scientific literature is labor-intensive and subjective, while simple frequency algorithms fail to capture semantic centrality or diverse multi-word phrases.",
        solution:
          "Engineered an automated Python NLP pipeline combining linguistic candidate filters (POS noun chunking), graph co-occurrence networks (TextRank), and KeyBERT embedding cosine similarity with MMR diversity control.",
        impact: [
          "Eliminated duplicate index terms using Maximal Marginal Relevance (MMR) diversity optimization.",
          "Benchmarked statistical vs. graph-based vs. transformer-based extraction on academic research papers.",
          "Complete exploratory research notebook and evaluation report archived in public GitHub repository.",
        ],
      },
      tags: ["Python", "KeyBERT", "TextRank", "TF-IDF", "spaCy / NLTK", "MMR"],
      github: "https://github.com/umashankar1735/automated-keyword-extraction-nlp",
    },
    {
      id: "green-harvest",
      number: "08",
      filterGroup: "AI & Research",
      category: "Generative AI · Multi-Agent Advisory",
      title: "GreenHarvest AI (AgriGPT)",
      subtitle: "Eco-Friendly Multi-Agent Farming Advisor",
      image: "/assets/project-greenharvest.jpg",
      visualType: "agri-brain",
      metric: "Live Streamlit App Deployed",
      description:
        "Multi-agent GenAI platform orchestrating weather outlook, agro-expert fertilizer/irrigation insights, and market intelligence agents using LangChain, OpenAI/Grok/Ollama LLMs, SQLite logging, and Streamlit.",
      caseStudy: {
        problem:
          "Farmers rarely have a single assistant combining localized weather outlooks, sustainable soil/fertilizer advice, and crop market context together.",
        solution:
          "Orchestrated specialized LangChain agents supporting cloud (OpenAI/Grok) and local (Ollama) models with SQLite session logging inside a responsive Streamlit UI.",
        impact: [
          "Deployed live on Streamlit Cloud for zero-setup farmer and agronomist testing.",
          "Unified weather, sustainable irrigation/fertilizer recommendations, and market guidance in one flow.",
        ],
      },
      tags: ["Python", "LangChain", "Grok / OpenAI", "Ollama", "SQLite", "Streamlit"],
      github: "https://github.com/umashankar1735/Green-Harvest-AI",
      liveUrl: "https://greenharvest-ai-dert6gb5xv7ajc2eoolxcc.streamlit.app/",
    },
    {
      id: "fitness-app",
      number: "09",
      filterGroup: "Full-Stack & .NET",
      category: "Full-Stack MERN · University Project",
      title: "Fitness Monitoring Web App",
      subtitle: "Workout, Diet, BMI & Calorie Tracking Suite",
      image: "/assets/project-fitness.jpg",
      visualType: "fitness-pulse",
      metric: "JWT-Secured MERN Stack",
      description:
        "Full-stack fitness tracking application featuring workout logging, diet management, BMI calculation, calorie scanning, progress analytics, and automated reminders built with React.js, Node.js, Express, and MongoDB.",
      caseStudy: {
        problem:
          "Fitness beginners juggle disconnected spreadsheets or single-purpose tools for workouts, calories, BMI targets, and daily habit reminders.",
        solution:
          "Built a JWT-authenticated React.js + Node.js/Express + MongoDB web suite consolidating daily logs, calorie estimation, BMI tracking, and automated reminder scheduling.",
        impact: [
          "Secured user health telemetry with stateless JWT authentication and protected REST routes.",
          "Delivered unified progress charts alongside diet, workout, and reminder modules.",
        ],
      },
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "REST APIs"],
      github: "https://github.com/umashankar1735/fitlogi-fitness-app",
    },
    {
      id: "carbonwise",
      number: "10",
      filterGroup: "AI & Research",
      category: "Sustainability · Streamlit + Firebase",
      title: "CarbonWise",
      subtitle: "Gamified Personal Carbon Footprint Tracker",
      image: "/assets/project-carbonwise.jpg",
      visualType: "carbon-gauge",
      metric: "Real-Time Firestore Sync",
      description:
        "Interactive sustainability app estimating daily CO2 emissions across travel, food, and electricity usage while offering actionable eco-alternatives, progress visualizations, and gamified eco-badges stored in Firebase Firestore.",
      caseStudy: {
        problem:
          "Personal carbon calculators feel tedious and static, giving one-off estimates with zero ongoing feedback or behavioral motivation.",
        solution:
          "Built an interactive Streamlit tracker synced with Firebase Firestore to log travel, food, and power consumption alongside eco-alternative tips and badge milestones.",
        impact: [
          "Real-time Firestore persistence for historical emission trends and unlocked eco-badges.",
          "Translates abstract kg-CO2 figures into concrete daily reduction recommendations.",
        ],
      },
      tags: ["Python", "Streamlit", "Firebase Firestore", "Analytics"],
      github: "https://github.com/umashankar1735/carbonwise-final",
    },
    {
      id: "parametric-curve-fitting",
      number: "11",
      filterGroup: "Systems & ML",
      category: "R&D Mathematical Optimization",
      title: "Parametric Curve Fitting",
      subtitle: "Nonlinear Optimization & Modeling Pipeline",
      image: "/assets/project-parametric-curves.jpg",
      visualType: "curve-plot",
      metric: "Bounds-Constrained Parameter Est.",
      description:
        "Research engineering pipeline estimating unknown parameters (theta, M, X) of coupled oscillatory parametric curves from noisy 2D sampled trajectories with residuals visualization.",
      caseStudy: {
        problem:
          "Recovering coupled oscillatory parameters (theta, M, X) from noisy 2D trajectory observations fails with naive linear regression due to non-convex local minima.",
        solution:
          "Implemented bounds-constrained nonlinear least-squares optimization in Python (SciPy / NumPy) with multi-start initialization and automated residual diagnostics.",
        impact: [
          "Accurately recovered coupled curve parameters across noisy 2D trajectory samples.",
          "Generated quantitative residual plots verifying fit stability across parameter bounds.",
        ],
      },
      tags: ["Python", "SciPy / NumPy", "Mathematical Modeling", "Visualization"],
      github: "https://github.com/umashankar1735/Parametric_Curve_Fitting-RnD_Assignment",
    },
    {
      id: "led-blinker-isr",
      number: "12",
      filterGroup: "Systems & ML",
      category: "Embedded C · Low-Level Simulation",
      title: "ISR Microcontroller LED Blinker",
      subtitle: "Interrupt-Driven GPIO & Ambient Lux Control",
      image: "/assets/project-isr-mcu.jpg",
      visualType: "isr-waveform",
      metric: "Hardware-Free ISR Event Logger",
      description:
        "Embedded C simulation of a microcontroller LED system featuring ISR-based button debouncing/handling, GPIO state toggling, startup sequences, ambient lux sensor modulation, and real-time event logging.",
      caseStudy: {
        problem:
          "Testing interrupt-driven GPIO firmware timing, button debouncing, and ambient sensor thresholds typically requires physical bench hardware.",
        solution:
          "Engineered an Embedded C hardware-free simulator modeling ISR callbacks, software debounce windows, startup LED states, lux sensor inputs, and deterministic event logs.",
        impact: [
          "Enables verifiable testing of ISR state transitions and GPIO timing without physical boards.",
          "Captures real-time structured logs of interrupt triggers and ambient lux modulation.",
        ],
      },
      tags: ["Embedded C", "ISR", "GPIO", "Lux Sensors", "System Simulation"],
      github: "https://github.com/umashankar1735/Microcontroller-Based-LED-Blinker-",
    },
  ],

  certifications: [
    {
      id: "aws-ccp",
      title: "AWS Certified Cloud Practitioner",
      org: "AWS Academy",
      year: "Nov 2025",
      image: "",
      credentialUrl:
        "https://drive.google.com/file/d/1Ysxm6LkMAHIeR1qBWxijfNt37l26GpBs/view?usp=sharing",
    },
    {
      id: "hackerrank-sql",
      title: "SQL (Advanced)",
      org: "HackerRank",
      year: "2025",
      image: "/assets/cert3.png",
      credentialUrl: "https://www.hackerrank.com/profile/ksaiumashankar",
    },
    {
      id: "iirs-gis",
      title: "Basics of RS, GIS & GNSS",
      org: "IIRS, ISRO Dehradun",
      year: "Dec 2024",
      image: "/assets/cert2.png",
      credentialUrl:
        "https://www.linkedin.com/posts/sai-uma-shankar-kesireddi-3b10a3259_isro-iirs-remotesensing-activity-7308153354306666496-1sWT",
    },
    {
      id: "nptel-python",
      title: "The Joy of Computing Using Python",
      org: "NPTEL · IIT Madras",
      year: "May 2024",
      image: "/assets/cert1.png",
      credentialUrl:
        "https://www.linkedin.com/posts/sai-uma-shankar-kesireddi-3b10a3259_python-nptel-iitmadras-activity-7307765089900642305-tXAv",
    },
    {
      id: "infosys-prompt",
      title: "Prompt Engineering for Generative AI",
      org: "Infosys Springboard",
      year: "2023",
      image: "/assets/cert4.png",
    },
  ],

  footer: {
    tagline: "Engineered with React, Framer Motion & Interactive 3D Canvas.",
    copyright: "Designed & Built by Kesireddi Sai Uma Shankar",
  },
};
