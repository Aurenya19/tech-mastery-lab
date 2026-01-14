// 🇮🇳 REAL INDIAN TECH LABS & RESEARCH CENTERS
const INDIAN_LABS = [
  // ISRO CENTERS
  {
    name: 'ISRO Headquarters',
    location: 'Bangalore, Karnataka',
    lat: 12.9634, lng: 77.6401,
    type: 'government',
    category: 'Space Research',
    description: 'Indian Space Research Organisation - India\'s premier space agency. Manages all space missions including Chandrayaan, Mangalyaan, Gaganyaan.',
    projects: ['Chandrayaan-3', 'Gaganyaan', 'Aditya-L1', 'NISAR'],
    website: 'https://www.isro.gov.in',
    careers: 'https://www.isro.gov.in/Careers.html',
    contact: 'contactus@isro.gov.in',
    established: 1969,
    employees: '17000+',
    budget: '₹13,700 crore',
    achievements: ['Mars Orbiter Mission', 'Chandrayaan-3 Success', '104 satellites in one launch'],
    howToJoin: 'ICRB exam, ISRO Centralized Recruitment Board, BTech/MTech from recognized universities',
    color: 'orange'
  },
  {
    name: 'Satish Dhawan Space Centre',
    location: 'Sriharikota, Andhra Pradesh',
    lat: 13.7199, lng: 80.2304,
    type: 'government',
    category: 'Space Research',
    description: 'India\'s primary spaceport. Launch site for all ISRO rockets including PSLV, GSLV, and upcoming SSLV.',
    projects: ['PSLV Launches', 'GSLV Mk III', 'SSLV Development'],
    website: 'https://www.isro.gov.in/SDSC.html',
    established: 1971,
    employees: '2000+',
    achievements: ['100+ successful launches', 'Chandrayaan-3 launch', 'Commercial satellite launches'],
    color: 'orange'
  },
  {
    name: 'ISRO Satellite Centre (ISAC)',
    location: 'Bangalore, Karnataka',
    lat: 13.0210, lng: 77.5707,
    type: 'government',
    category: 'Space Research',
    description: 'Designs and develops satellites for communication, earth observation, navigation, and space science.',
    projects: ['RISAT', 'CARTOSAT', 'RESOURCESAT', 'IRNSS/NavIC'],
    website: 'https://www.isac.gov.in',
    established: 1972,
    employees: '5000+',
    achievements: ['100+ satellites built', 'NavIC navigation system', 'Remote sensing satellites'],
    color: 'orange'
  },
  
  // DRDO LABS
  {
    name: 'DRDO Headquarters',
    location: 'New Delhi',
    lat: 28.6139, lng: 77.2090,
    type: 'government',
    category: 'Defense Research',
    description: 'Defence Research and Development Organisation - India\'s premier defense R&D agency. 50+ labs across India.',
    projects: ['Agni Missiles', 'BrahMos', 'Tejas Fighter', 'Arjun Tank'],
    website: 'https://www.drdo.gov.in',
    careers: 'https://www.drdo.gov.in/drdo/careers',
    established: 1958,
    employees: '25000+',
    budget: '₹23,000 crore',
    achievements: ['Agni-V ICBM', 'BrahMos supersonic missile', 'Indigenous fighter jets'],
    howToJoin: 'DRDO CEPTAM, Scientist Entry Test, BTech/MTech/PhD',
    color: 'red'
  },
  {
    name: 'Aeronautical Development Agency (ADA)',
    location: 'Bangalore, Karnataka',
    lat: 12.9499, lng: 77.6821,
    type: 'government',
    category: 'Defense Research',
    description: 'Designs combat aircraft for Indian Air Force. Developed Tejas Light Combat Aircraft.',
    projects: ['Tejas Mk1A', 'Tejas Mk2', 'AMCA (5th gen fighter)'],
    website: 'https://ada.gov.in',
    established: 1984,
    achievements: ['Tejas FOC', 'AMCA design', 'Indigenous avionics'],
    color: 'red'
  },
  {
    name: 'Defence Research & Development Laboratory (DRDL)',
    location: 'Hyderabad, Telangana',
    lat: 17.4239, lng: 78.5562,
    type: 'government',
    category: 'Defense Research',
    description: 'Develops missiles and strategic systems. Created Agni, Prithvi, Akash missile systems.',
    projects: ['Agni-VI', 'Pralay', 'QRSAM', 'MPATGM'],
    website: 'https://www.drdo.gov.in/drdl',
    established: 1958,
    achievements: ['Agni series', 'BrahMos integration', 'Anti-tank missiles'],
    color: 'red'
  },
  
  // CSIR LABS
  {
    name: 'CSIR Headquarters',
    location: 'New Delhi',
    lat: 28.6358, lng: 77.2245,
    type: 'government',
    category: 'Scientific Research',
    description: 'Council of Scientific & Industrial Research - 38 national laboratories across India.',
    projects: ['Drug Discovery', 'Materials Science', 'Genomics', 'Clean Energy'],
    website: 'https://www.csir.res.in',
    careers: 'https://www.csir.res.in/careers',
    established: 1942,
    employees: '17000+',
    budget: '₹5,500 crore',
    achievements: ['COVID vaccine research', '12000+ patents', 'Technology transfers'],
    howToJoin: 'CSIR-UGC NET, Scientist recruitment, PhD programs',
    color: 'purple'
  },
  {
    name: 'CSIR-National Aerospace Laboratories (NAL)',
    location: 'Bangalore, Karnataka',
    lat: 13.0210, lng: 77.5707,
    type: 'government',
    category: 'Aerospace Research',
    description: 'India\'s premier aerospace R&D lab. Wind tunnels, aircraft design, composites.',
    projects: ['SARAS Aircraft', 'Hansa', 'Wind Tunnel Testing', 'UAVs'],
    website: 'https://www.nal.res.in',
    established: 1959,
    achievements: ['SARAS indigenous aircraft', 'Composite materials', 'Aerospace testing'],
    color: 'purple'
  },
  {
    name: 'CSIR-Centre for Cellular & Molecular Biology (CCMB)',
    location: 'Hyderabad, Telangana',
    lat: 17.4435, lng: 78.3772,
    type: 'government',
    category: 'Biotechnology',
    description: 'Leading biology research center. Genomics, COVID research, molecular biology.',
    projects: ['COVID Testing', 'Genome Sequencing', 'Drug Discovery'],
    website: 'https://www.ccmb.res.in',
    established: 1977,
    achievements: ['COVID-19 testing protocols', 'Genome India Project', 'Drug targets'],
    color: 'purple'
  },
  
  // IITs
  {
    name: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    lat: 19.1334, lng: 72.9133,
    type: 'academic',
    category: 'Engineering & Research',
    description: 'India\'s top engineering institute. World-class research in AI, robotics, materials.',
    projects: ['AI Research', 'Quantum Computing', 'Robotics', 'Clean Energy'],
    website: 'https://www.iitb.ac.in',
    careers: 'https://www.iitb.ac.in/en/about-iit-bombay/jobs-iit-bombay',
    established: 1958,
    students: '11000+',
    achievements: ['Top NIRF ranking', '500+ startups', 'Research publications'],
    howToJoin: 'JEE Advanced, GATE, PhD admissions, Faculty positions',
    color: 'blue'
  },
  {
    name: 'IIT Delhi',
    location: 'New Delhi',
    lat: 28.5450, lng: 77.1920,
    type: 'academic',
    category: 'Engineering & Research',
    description: 'Premier engineering institute. Strong in AI, computer science, biotechnology.',
    projects: ['Machine Learning', 'Smart Cities', 'Healthcare Tech', 'Energy'],
    website: 'https://home.iitd.ac.in',
    established: 1961,
    students: '10000+',
    achievements: ['Research excellence', 'Industry partnerships', 'Innovation hub'],
    color: 'blue'
  },
  {
    name: 'IIT Madras',
    location: 'Chennai, Tamil Nadu',
    lat: 12.9916, lng: 80.2336,
    type: 'academic',
    category: 'Engineering & Research',
    description: 'Top-ranked IIT. Excellence in AI, data science, ocean engineering.',
    projects: ['AI4Bharat', 'Ocean Tech', 'Electric Vehicles', 'Data Science'],
    website: 'https://www.iitm.ac.in',
    established: 1959,
    students: '10000+',
    achievements: ['#1 NIRF ranking', 'AI4Bharat initiative', 'Research park'],
    color: 'blue'
  },
  {
    name: 'IIT Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    lat: 26.5123, lng: 80.2329,
    type: 'academic',
    category: 'Engineering & Research',
    description: 'Pioneer in computer science and aerospace. Strong research culture.',
    projects: ['Aerospace', 'Computer Science', 'Materials', 'Robotics'],
    website: 'https://www.iitk.ac.in',
    established: 1959,
    achievements: ['CS excellence', 'Startup incubator', 'Research output'],
    color: 'blue'
  },
  {
    name: 'IIT Kharagpur',
    location: 'Kharagpur, West Bengal',
    lat: 22.3149, lng: 87.3105,
    type: 'academic',
    category: 'Engineering & Research',
    description: 'First IIT. Largest campus. Strong in mining, metallurgy, computer science.',
    projects: ['AI/ML', 'Mining Tech', 'Smart Manufacturing', 'Healthcare'],
    website: 'http://www.iitkgp.ac.in',
    established: 1951,
    students: '12000+',
    achievements: ['Oldest IIT', 'Largest campus', 'Alumni network'],
    color: 'blue'
  },
  
  // IISc
  {
    name: 'Indian Institute of Science (IISc)',
    location: 'Bangalore, Karnataka',
    lat: 13.0210, lng: 77.5707,
    type: 'academic',
    category: 'Scientific Research',
    description: 'India\'s premier research institute. World-class research in science and engineering.',
    projects: ['Quantum Computing', 'AI', 'Materials Science', 'Biotechnology'],
    website: 'https://www.iisc.ac.in',
    careers: 'https://www.iisc.ac.in/careers/',
    established: 1909,
    students: '5000+',
    achievements: ['Top research output', 'Nobel connections', 'Industry partnerships'],
    howToJoin: 'KVPY, JEE Advanced, GATE, PhD programs',
    color: 'blue'
  },
  
  // BARC
  {
    name: 'Bhabha Atomic Research Centre (BARC)',
    location: 'Mumbai, Maharashtra',
    lat: 19.0176, lng: 72.9289,
    type: 'government',
    category: 'Nuclear Research',
    description: 'India\'s premier nuclear research facility. Nuclear power, weapons, medicine.',
    projects: ['Nuclear Reactors', 'Thorium Research', 'Medical Isotopes'],
    website: 'https://www.barc.gov.in',
    careers: 'https://www.barc.gov.in/career/',
    established: 1954,
    employees: '15000+',
    achievements: ['Nuclear power program', 'Thorium technology', 'Medical applications'],
    howToJoin: 'BARC OCES exam, BTech/MSc in relevant fields',
    color: 'red'
  },
  
  // C-DAC
  {
    name: 'C-DAC Pune',
    location: 'Pune, Maharashtra',
    lat: 18.5204, lng: 73.8567,
    type: 'government',
    category: 'Supercomputing',
    description: 'Centre for Development of Advanced Computing. Built PARAM supercomputers.',
    projects: ['PARAM Siddhi-AI', 'Quantum Computing', 'AI/ML', 'Cybersecurity'],
    website: 'https://www.cdac.in',
    careers: 'https://www.cdac.in/index.aspx?id=careers',
    established: 1988,
    achievements: ['PARAM supercomputers', 'Indigenous processors', 'AI research'],
    howToJoin: 'C-DAC recruitment, BTech/MTech in CS/Electronics',
    color: 'purple'
  },
  
  // PRIVATE SECTOR
  {
    name: 'TCS Innovation Labs',
    location: 'Bangalore, Karnataka',
    lat: 12.9716, lng: 77.5946,
    type: 'private',
    category: 'IT Research',
    description: 'Tata Consultancy Services R&D. AI, blockchain, quantum computing research.',
    projects: ['AI/ML', 'Blockchain', 'Quantum', 'IoT', 'Cloud'],
    website: 'https://www.tcs.com/research-and-innovation',
    careers: 'https://www.tcs.com/careers',
    established: 1981,
    employees: '600000+',
    achievements: ['AI patents', 'Blockchain solutions', 'Digital transformation'],
    howToJoin: 'TCS NQT, Campus placements, Experienced hiring',
    color: 'green'
  },
  {
    name: 'Infosys Labs',
    location: 'Bangalore, Karnataka',
    lat: 12.9698, lng: 77.7499,
    type: 'private',
    category: 'IT Research',
    description: 'Infosys research division. AI, automation, cloud, cybersecurity.',
    projects: ['AI Platform', 'Automation', 'Cloud Services', 'Cybersecurity'],
    website: 'https://www.infosys.com/navigate-your-next/research.html',
    careers: 'https://www.infosys.com/careers/',
    established: 1981,
    employees: '350000+',
    achievements: ['AI innovations', 'Digital platforms', 'Global delivery'],
    howToJoin: 'InfyTQ, Campus hiring, Lateral hiring',
    color: 'green'
  },
  {
    name: 'Wipro R&D',
    location: 'Bangalore, Karnataka',
    lat: 12.9698, lng: 77.7499,
    type: 'private',
    category: 'IT Research',
    description: 'Wipro research and innovation. AI, IoT, 5G, quantum computing.',
    projects: ['AI/ML', '5G', 'IoT', 'Quantum', 'Sustainability'],
    website: 'https://www.wipro.com/innovation/',
    careers: 'https://careers.wipro.com/',
    established: 1945,
    employees: '250000+',
    achievements: ['Innovation patents', 'Digital solutions', 'Sustainability'],
    color: 'green'
  },
  {
    name: 'Reliance Jio AI Labs',
    location: 'Mumbai, Maharashtra',
    lat: 19.0760, lng: 72.8777,
    type: 'private',
    category: 'Telecom & AI',
    description: 'Jio\'s AI research division. 5G, AI, IoT, cloud computing.',
    projects: ['5G Technology', 'AI Services', 'IoT Platform', 'Cloud'],
    website: 'https://www.jio.com',
    careers: 'https://careers.jio.com',
    established: 2016,
    employees: '50000+',
    achievements: ['5G rollout', 'Digital India', 'AI innovations'],
    color: 'green'
  },
  {
    name: 'Flipkart Tech',
    location: 'Bangalore, Karnataka',
    lat: 12.9716, lng: 77.5946,
    type: 'private',
    category: 'E-commerce Tech',
    description: 'Flipkart engineering and innovation. AI, ML, supply chain tech.',
    projects: ['AI Recommendations', 'Supply Chain', 'Payments', 'Logistics'],
    website: 'https://tech.flipkart.com',
    careers: 'https://www.flipkartcareers.com',
    established: 2007,
    employees: '30000+',
    achievements: ['E-commerce innovation', 'AI/ML', 'Logistics tech'],
    color: 'green'
  },
  
  // STARTUP HUBS
  {
    name: 'T-Hub',
    location: 'Hyderabad, Telangana',
    lat: 17.4435, lng: 78.3772,
    type: 'startup',
    category: 'Innovation Hub',
    description: 'India\'s largest startup incubator. 1000+ startups supported.',
    projects: ['Startup Incubation', 'Mentorship', 'Funding', 'Networking'],
    website: 'https://t-hub.co',
    careers: 'https://t-hub.co/careers',
    established: 2015,
    startups: '1000+',
    achievements: ['Largest incubator', 'Unicorn support', 'Global connections'],
    howToJoin: 'Apply for incubation, Startup programs, Events',
    color: 'yellow'
  },
  {
    name: 'NASSCOM 10000 Startups',
    location: 'Bangalore, Karnataka',
    lat: 12.9716, lng: 77.5946,
    type: 'startup',
    category: 'Startup Ecosystem',
    description: 'NASSCOM\'s startup initiative. Pan-India presence, mentorship, funding.',
    projects: ['Incubation', 'Acceleration', 'Funding Connect', 'Global Expansion'],
    website: 'https://10000startups.com',
    established: 2013,
    startups: '10000+',
    achievements: ['Pan-India network', 'Funding facilitation', 'Global partnerships'],
    color: 'yellow'
  },
  {
    name: 'IIT Bombay Research Park',
    location: 'Mumbai, Maharashtra',
    lat: 19.1334, lng: 72.9133,
    type: 'startup',
    category: 'Research & Innovation',
    description: 'IIT Bombay\'s innovation hub. Startups, corporate R&D, collaboration.',
    projects: ['Startup Incubation', 'Corporate R&D', 'Technology Transfer'],
    website: 'https://www.iitbresearchpark.org',
    established: 2006,
    companies: '100+',
    achievements: ['Industry collaboration', 'Technology commercialization', 'Innovation'],
    color: 'yellow'
  }
];

// 🧠 TECH QUIZ - 100 QUESTIONS
const QUIZ_QUESTIONS = [
  // AI/ML (15 questions)
  {
    category: 'AI/ML',
    difficulty: 'easy',
    question: 'What does AI stand for?',
    options: ['Artificial Intelligence', 'Automated Intelligence', 'Advanced Intelligence', 'Algorithmic Intelligence'],
    correct: 0,
    explanation: 'AI stands for Artificial Intelligence - the simulation of human intelligence by machines.'
  },
  {
    category: 'AI/ML',
    difficulty: 'easy',
    question: 'Which Indian company developed the PARAM supercomputer series?',
    options: ['ISRO', 'C-DAC', 'DRDO', 'TCS'],
    correct: 1,
    explanation: 'C-DAC (Centre for Development of Advanced Computing) developed the PARAM series of supercomputers.'
  },
  {
    category: 'AI/ML',
    difficulty: 'easy',
    question: 'What is Machine Learning?',
    options: ['Robots learning to walk', 'Computers learning from data', 'Teaching machines manually', 'Programming languages'],
    correct: 1,
    explanation: 'Machine Learning is a subset of AI where computers learn patterns from data without explicit programming.'
  },
  {
    category: 'AI/ML',
    difficulty: 'medium',
    question: 'What is the name of IIT Madras\'s initiative for Indian language AI?',
    options: ['Bharat AI', 'AI4Bharat', 'India AI', 'Desi AI'],
    correct: 1,
    explanation: 'AI4Bharat is IIT Madras\'s initiative to build AI solutions for Indian languages.'
  },
  {
    category: 'AI/ML',
    difficulty: 'medium',
    question: 'Which algorithm is commonly used for image classification?',
    options: ['Linear Regression', 'Convolutional Neural Networks', 'Decision Trees', 'K-Means'],
    correct: 1,
    explanation: 'CNNs (Convolutional Neural Networks) are specifically designed for image processing and classification.'
  },
  {
    category: 'AI/ML',
    difficulty: 'medium',
    question: 'What is supervised learning?',
    options: ['Learning with a teacher', 'Learning from labeled data', 'Learning without data', 'Learning by trial and error'],
    correct: 1,
    explanation: 'Supervised learning uses labeled training data to learn patterns and make predictions.'
  },
  {
    category: 'AI/ML',
    difficulty: 'medium',
    question: 'What does NLP stand for in AI?',
    options: ['Natural Language Processing', 'Neural Learning Process', 'Network Layer Protocol', 'New Learning Paradigm'],
    correct: 0,
    explanation: 'NLP (Natural Language Processing) enables computers to understand and process human language.'
  },
  {
    category: 'AI/ML',
    difficulty: 'hard',
    question: 'What is the Turing Test designed to evaluate?',
    options: ['Computer speed', 'Machine intelligence', 'Network security', 'Data storage'],
    correct: 1,
    explanation: 'The Turing Test evaluates a machine\'s ability to exhibit intelligent behavior indistinguishable from a human.'
  },
  {
    category: 'AI/ML',
    difficulty: 'hard',
    question: 'What is backpropagation in neural networks?',
    options: ['Forward data flow', 'Error correction algorithm', 'Data preprocessing', 'Network architecture'],
    correct: 1,
    explanation: 'Backpropagation is an algorithm for training neural networks by propagating errors backward to adjust weights.'
  },
  {
    category: 'AI/ML',
    difficulty: 'hard',
    question: 'What is the vanishing gradient problem?',
    options: ['Gradients becoming too large', 'Gradients becoming too small', 'No gradients at all', 'Random gradients'],
    correct: 1,
    explanation: 'Vanishing gradient problem occurs when gradients become too small during backpropagation, making training difficult.'
  },
  
  // Space Tech (15 questions)
  {
    category: 'Space Tech',
    difficulty: 'easy',
    question: 'What does ISRO stand for?',
    options: ['Indian Space Research Organisation', 'International Space Research Organisation', 'Indian Satellite Research Organisation', 'Indian Space Rocket Organisation'],
    correct: 0,
    explanation: 'ISRO is the Indian Space Research Organisation, India\'s national space agency.'
  },
  {
    category: 'Space Tech',
    difficulty: 'easy',
    question: 'Which ISRO mission successfully landed on the Moon\'s south pole?',
    options: ['Chandrayaan-1', 'Chandrayaan-2', 'Chandrayaan-3', 'Mangalyaan'],
    correct: 2,
    explanation: 'Chandrayaan-3 successfully landed on the Moon\'s south pole in August 2023.'
  },
  {
    category: 'Space Tech',
    difficulty: 'easy',
    question: 'What is the name of India\'s Mars mission?',
    options: ['Mars Express', 'Mangalyaan', 'Red Planet', 'Mars India'],
    correct: 1,
    explanation: 'Mangalyaan (Mars Orbiter Mission) made India the first Asian nation to reach Mars orbit.'
  },
  {
    category: 'Space Tech',
    difficulty: 'medium',
    question: 'Where is India\'s primary spaceport located?',
    options: ['Bangalore', 'Sriharikota', 'Thiruvananthapuram', 'Ahmedabad'],
    correct: 1,
    explanation: 'Satish Dhawan Space Centre in Sriharikota, Andhra Pradesh is India\'s primary spaceport.'
  },
  {
    category: 'Space Tech',
    difficulty: 'medium',
    question: 'What does PSLV stand for?',
    options: ['Polar Satellite Launch Vehicle', 'Primary Space Launch Vehicle', 'Powerful Satellite Launch Vehicle', 'Precision Space Launch Vehicle'],
    correct: 0,
    explanation: 'PSLV (Polar Satellite Launch Vehicle) is ISRO\'s workhorse rocket for launching satellites.'
  },
  {
    category: 'Space Tech',
    difficulty: 'medium',
    question: 'What is Gaganyaan?',
    options: ['A satellite', 'India\'s human spaceflight program', 'A rocket', 'A space station'],
    correct: 1,
    explanation: 'Gaganyaan is India\'s first crewed orbital spacecraft mission planned by ISRO.'
  },
  {
    category: 'Space Tech',
    difficulty: 'hard',
    question: 'What is the name of India\'s indigenous navigation system?',
    options: ['GPS India', 'NavIC', 'IRNSS', 'Both B and C'],
    correct: 3,
    explanation: 'NavIC (Navigation with Indian Constellation) is also known as IRNSS (Indian Regional Navigation Satellite System).'
  },
  {
    category: 'Space Tech',
    difficulty: 'hard',
    question: 'How many satellites did ISRO launch in a single mission in 2017?',
    options: ['50', '75', '104', '150'],
    correct: 2,
    explanation: 'ISRO launched 104 satellites in a single PSLV mission in February 2017, setting a world record.'
  },
  {
    category: 'Space Tech',
    difficulty: 'hard',
    question: 'What is Aditya-L1 mission studying?',
    options: ['Moon', 'Mars', 'Sun', 'Venus'],
    correct: 2,
    explanation: 'Aditya-L1 is India\'s first solar mission to study the Sun from the L1 Lagrange point.'
  },
  {
    category: 'Space Tech',
    difficulty: 'hard',
    question: 'Who is known as the father of Indian space program?',
    options: ['APJ Abdul Kalam', 'Vikram Sarabhai', 'Satish Dhawan', 'Homi Bhabha'],
    correct: 1,
    explanation: 'Dr. Vikram Sarabhai founded ISRO and is considered the father of Indian space program.'
  },
  
  // Quantum Computing (10 questions)
  {
    category: 'Quantum Computing',
    difficulty: 'easy',
    question: 'What is the basic unit of quantum information?',
    options: ['Bit', 'Byte', 'Qubit', 'Quantum'],
    correct: 2,
    explanation: 'A qubit (quantum bit) is the basic unit of quantum information, unlike classical bits.'
  },
  {
    category: 'Quantum Computing',
    difficulty: 'easy',
    question: 'How many states can a qubit be in simultaneously?',
    options: ['1', '2', 'Multiple', 'Infinite'],
    correct: 2,
    explanation: 'Qubits can exist in superposition, being in multiple states simultaneously.'
  },
  {
    category: 'Quantum Computing',
    difficulty: 'medium',
    question: 'Which principle allows qubits to be in multiple states simultaneously?',
    options: ['Entanglement', 'Superposition', 'Interference', 'Tunneling'],
    correct: 1,
    explanation: 'Superposition allows qubits to exist in multiple states at once, unlike classical bits.'
  },
  {
    category: 'Quantum Computing',
    difficulty: 'medium',
    question: 'Which Indian institute is leading quantum computing research?',
    options: ['IIT Bombay', 'IISc Bangalore', 'TIFR Mumbai', 'All of the above'],
    correct: 3,
    explanation: 'Multiple Indian institutes including IIT Bombay, IISc, and TIFR are conducting quantum research.'
  },
  {
    category: 'Quantum Computing',
    difficulty: 'medium',
    question: 'What temperature do quantum computers typically operate at?',
    options: ['Room temperature', 'Freezing point', 'Near absolute zero', 'Boiling point'],
    correct: 2,
    explanation: 'Quantum computers operate at temperatures near absolute zero to maintain quantum states.'
  },
  {
    category: 'Quantum Computing',
    difficulty: 'hard',
    question: 'What is quantum entanglement?',
    options: ['Qubits moving fast', 'Qubits being connected regardless of distance', 'Qubits storing data', 'Qubits processing information'],
    correct: 1,
    explanation: 'Quantum entanglement is when qubits become correlated and share states regardless of distance.'
  },
  {
    category: 'Quantum Computing',
    difficulty: 'hard',
    question: 'What is quantum supremacy?',
    options: ['Fastest quantum computer', 'Quantum computer outperforming classical', 'Largest quantum computer', 'Most accurate quantum computer'],
    correct: 1,
    explanation: 'Quantum supremacy is when a quantum computer solves a problem faster than any classical computer.'
  },
  {
    category: 'Quantum Computing',
    difficulty: 'hard',
    question: 'Which algorithm is famous for quantum computing?',
    options: ['Bubble Sort', 'Shor\'s Algorithm', 'Quick Sort', 'Binary Search'],
    correct: 1,
    explanation: 'Shor\'s Algorithm is a quantum algorithm for integer factorization, threatening current encryption.'
  },
  
  // Cybersecurity (15 questions)
  {
    category: 'Cybersecurity',
    difficulty: 'easy',
    question: 'What does VPN stand for?',
    options: ['Virtual Private Network', 'Very Private Network', 'Verified Private Network', 'Virtual Public Network'],
    correct: 0,
    explanation: 'VPN stands for Virtual Private Network, used for secure internet connections.'
  },
  {
    category: 'Cybersecurity',
    difficulty: 'easy',
    question: 'Which of these is a strong password practice?',
    options: ['Using your name', 'Using 12345678', 'Using mix of letters, numbers, symbols', 'Using your birthday'],
    correct: 2,
    explanation: 'Strong passwords use a combination of uppercase, lowercase, numbers, and special characters.'
  },
  {
    category: 'Cybersecurity',
    difficulty: 'easy',
    question: 'What is two-factor authentication?',
    options: ['Two passwords', 'Two security layers', 'Two accounts', 'Two devices'],
    correct: 1,
    explanation: 'Two-factor authentication adds an extra layer of security beyond just a password.'
  },
  {
    category: 'Cybersecurity',
    difficulty: 'medium',
    question: 'What is phishing?',
    options: ['Catching fish online', 'Fraudulent attempt to obtain sensitive information', 'A type of virus', 'A hacking tool'],
    correct: 1,
    explanation: 'Phishing is a fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity.'
  },
  {
    category: 'Cybersecurity',
    difficulty: 'medium',
    question: 'Which Indian agency handles cyber security at national level?',
    options: ['CBI', 'CERT-In', 'RAW', 'IB'],
    correct: 1,
    explanation: 'CERT-In (Indian Computer Emergency Response Team) is the national nodal agency for cyber security.'
  },
  {
    category: 'Cybersecurity',
    difficulty: 'medium',
    question: 'What is ransomware?',
    options: ['Free software', 'Malware that encrypts files for ransom', 'Antivirus software', 'Operating system'],
    correct: 1,
    explanation: 'Ransomware is malicious software that encrypts files and demands payment for decryption.'
  },
  {
    category: 'Cybersecurity',
    difficulty: 'medium',
    question: 'What does HTTPS stand for?',
    options: ['Hyper Text Transfer Protocol Secure', 'High Tech Transfer Protocol System', 'Hyper Transfer Text Protocol Secure', 'High Text Transfer Protocol Secure'],
    correct: 0,
    explanation: 'HTTPS is HTTP with encryption for secure communication over networks.'
  },
  {
    category: 'Cybersecurity',
    difficulty: 'hard',
    question: 'What is a zero-day vulnerability?',
    options: ['A bug found on day zero', 'A vulnerability unknown to vendor', 'A patched security hole', 'A type of malware'],
    correct: 1,
    explanation: 'A zero-day vulnerability is a security flaw unknown to the software vendor, giving zero days to fix it.'
  },
  {
    category: 'Cybersecurity',
    difficulty: 'hard',
    question: 'What is SQL injection?',
    options: ['Database optimization', 'Code injection attack', 'Data backup method', 'Programming language'],
    correct: 1,
    explanation: 'SQL injection is a code injection technique that exploits vulnerabilities in database queries.'
  },
  {
    category: 'Cybersecurity',
    difficulty: 'hard',
    question: 'What is a DDoS attack?',
    options: ['Data theft', 'Distributed Denial of Service', 'Database deletion', 'Device destruction'],
    correct: 1,
    explanation: 'DDoS (Distributed Denial of Service) overwhelms a system with traffic to make it unavailable.'
  },
  
  // Indian Tech (15 questions)
  {
    category: 'Indian Tech',
    difficulty: 'easy',
    question: 'Who is known as the "Missile Man of India"?',
    options: ['Vikram Sarabhai', 'APJ Abdul Kalam', 'Homi Bhabha', 'CV Raman'],
    correct: 1,
    explanation: 'Dr. APJ Abdul Kalam is known as the Missile Man of India for his work on ballistic missiles.'
  },
  {
    category: 'Indian Tech',
    difficulty: 'easy',
    question: 'Which was the first IIT established in India?',
    options: ['IIT Bombay', 'IIT Delhi', 'IIT Kharagpur', 'IIT Madras'],
    correct: 2,
    explanation: 'IIT Kharagpur was the first IIT, established in 1951.'
  },
  {
    category: 'Indian Tech',
    difficulty: 'easy',
    question: 'What does TCS stand for?',
    options: ['Tata Computer Services', 'Tata Consultancy Services', 'Tech Consultancy Services', 'Total Computer Solutions'],
    correct: 1,
    explanation: 'TCS stands for Tata Consultancy Services, India\'s largest IT services company.'
  },
  {
    category: 'Indian Tech',
    difficulty: 'medium',
    question: 'Who founded the Indian Space Research Organisation (ISRO)?',
    options: ['Homi Bhabha', 'Vikram Sarabhai', 'APJ Abdul Kalam', 'Satish Dhawan'],
    correct: 1,
    explanation: 'Dr. Vikram Sarabhai founded ISRO in 1969 and is considered the father of Indian space program.'
  },
  {
    category: 'Indian Tech',
    difficulty: 'medium',
    question: 'What was India\'s first satellite called?',
    options: ['Rohini', 'Aryabhata', 'Bhaskara', 'INSAT'],
    correct: 1,
    explanation: 'Aryabhata was India\'s first satellite, launched in 1975.'
  },
  {
    category: 'Indian Tech',
    difficulty: 'medium',
    question: 'Which Indian city is known as the "Silicon Valley of India"?',
    options: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'],
    correct: 2,
    explanation: 'Bangalore is known as the Silicon Valley of India due to its IT industry concentration.'
  },
  {
    category: 'Indian Tech',
    difficulty: 'medium',
    question: 'What is UPI?',
    options: ['Universal Payment Interface', 'Unified Payments Interface', 'United Payment India', 'Universal Payment India'],
    correct: 1,
    explanation: 'UPI (Unified Payments Interface) is India\'s instant real-time payment system.'
  },
  {
    category: 'Indian Tech',
    difficulty: 'hard',
    question: 'Which Indian developed the Pentium chip?',
    options: ['Vinod Dham', 'Sabeer Bhatia', 'Sundar Pichai', 'Satya Nadella'],
    correct: 0,
    explanation: 'Vinod Dham is known as the "Father of the Pentium Chip" for his work at Intel.'
  },
  {
    category: 'Indian Tech',
    difficulty: 'hard',
    question: 'When was the first Indian computer (TIFRAC) built?',
    options: ['1945', '1955', '1965', '1975'],
    correct: 1,
    explanation: 'TIFRAC (Tata Institute of Fundamental Research Automatic Calculator) was built in 1955.'
  },
  {
    category: 'Indian Tech',
    difficulty: 'hard',
    question: 'Which Indian company became the first to reach $100 billion market cap?',
    options: ['TCS', 'Infosys', 'Reliance', 'Wipro'],
    correct: 0,
    explanation: 'TCS became the first Indian IT company to reach $100 billion market capitalization.'
  },
  
  // Coding (15 questions)
  {
    category: 'Coding',
    difficulty: 'easy',
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
    correct: 0,
    explanation: 'HTML stands for Hyper Text Markup Language, used for creating web pages.'
  },
  {
    category: 'Coding',
    difficulty: 'easy',
    question: 'Which programming language is known as the "language of the web"?',
    options: ['Python', 'Java', 'JavaScript', 'C++'],
    correct: 2,
    explanation: 'JavaScript is known as the language of the web, running in all web browsers.'
  },
  {
    category: 'Coding',
    difficulty: 'easy',
    question: 'What does CSS stand for?',
    options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
    correct: 1,
    explanation: 'CSS stands for Cascading Style Sheets, used for styling web pages.'
  },
  {
    category: 'Coding',
    difficulty: 'medium',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correct: 1,
    explanation: 'Binary search has O(log n) time complexity as it divides the search space in half each time.'
  },
  {
    category: 'Coding',
    difficulty: 'medium',
    question: 'Which data structure uses LIFO (Last In First Out)?',
    options: ['Queue', 'Stack', 'Array', 'Tree'],
    correct: 1,
    explanation: 'Stack follows LIFO principle - the last element added is the first one removed.'
  },
  {
    category: 'Coding',
    difficulty: 'medium',
    question: 'What is Git?',
    options: ['Programming language', 'Version control system', 'Database', 'Operating system'],
    correct: 1,
    explanation: 'Git is a distributed version control system for tracking changes in source code.'
  },
  {
    category: 'Coding',
    difficulty: 'medium',
    question: 'What does API stand for?',
    options: ['Application Programming Interface', 'Advanced Programming Interface', 'Application Process Integration', 'Advanced Process Interface'],
    correct: 0,
    explanation: 'API stands for Application Programming Interface, allowing software to communicate.'
  },
  {
    category: 'Coding',
    difficulty: 'hard',
    question: 'What is the output of: print(type([]) == list) in Python?',
    options: ['True', 'False', 'Error', 'None'],
    correct: 0,
    explanation: '[] creates a list object, so type([]) == list returns True.'
  },
  {
    category: 'Coding',
    difficulty: 'hard',
    question: 'What is recursion?',
    options: ['Loop', 'Function calling itself', 'Error handling', 'Data structure'],
    correct: 1,
    explanation: 'Recursion is when a function calls itself to solve a problem by breaking it into smaller instances.'
  },
  {
    category: 'Coding',
    difficulty: 'hard',
    question: 'What is Big O notation used for?',
    options: ['Measuring code size', 'Analyzing algorithm efficiency', 'Counting variables', 'Debugging'],
    correct: 1,
    explanation: 'Big O notation describes the time or space complexity of algorithms.'
  },
  
  // Hardware (10 questions)
  {
    category: 'Hardware',
    difficulty: 'easy',
    question: 'What does CPU stand for?',
    options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Computer Program Unit'],
    correct: 0,
    explanation: 'CPU stands for Central Processing Unit, the brain of the computer.'
  },
  {
    category: 'Hardware',
    difficulty: 'easy',
    question: 'What does RAM stand for?',
    options: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Memory', 'Real Access Memory'],
    correct: 0,
    explanation: 'RAM stands for Random Access Memory, temporary storage for running programs.'
  },
  {
    category: 'Hardware',
    difficulty: 'medium',
    question: 'What is Moore\'s Law about?',
    options: ['Internet speed', 'Transistor density doubling', 'Battery life', 'Screen resolution'],
    correct: 1,
    explanation: 'Moore\'s Law states that transistor density on chips doubles approximately every two years.'
  },
  {
    category: 'Hardware',
    difficulty: 'medium',
    question: 'Which Indian company manufactures semiconductors?',
    options: ['Tata Electronics', 'Vedanta', 'Both A and B', 'None'],
    correct: 2,
    explanation: 'Both Tata Electronics and Vedanta are setting up semiconductor manufacturing in India.'
  },
  {
    category: 'Hardware',
    difficulty: 'medium',
    question: 'What is SSD?',
    options: ['Super Speed Drive', 'Solid State Drive', 'System Storage Device', 'Secure Storage Disk'],
    correct: 1,
    explanation: 'SSD (Solid State Drive) is a storage device using flash memory, faster than HDDs.'
  },
  {
    category: 'Hardware',
    difficulty: 'hard',
    question: 'What is the smallest transistor size currently in production?',
    options: ['3nm', '5nm', '7nm', '10nm'],
    correct: 0,
    explanation: 'As of 2024, 3nm transistors are in production by companies like TSMC and Samsung.'
  },
  {
    category: 'Hardware',
    difficulty: 'hard',
    question: 'What is GPU primarily used for?',
    options: ['Text processing', 'Graphics and parallel computing', 'Storage', 'Networking'],
    correct: 1,
    explanation: 'GPU (Graphics Processing Unit) excels at parallel processing for graphics and AI computations.'
  },
  
  // Blockchain (10 questions)
  {
    category: 'Blockchain',
    difficulty: 'easy',
    question: 'What is Bitcoin?',
    options: ['A company', 'A cryptocurrency', 'A bank', 'A website'],
    correct: 1,
    explanation: 'Bitcoin is the first and most well-known cryptocurrency, created in 2009.'
  },
  {
    category: 'Blockchain',
    difficulty: 'easy',
    question: 'Who created Bitcoin?',
    options: ['Elon Musk', 'Satoshi Nakamoto', 'Vitalik Buterin', 'Bill Gates'],
    correct: 1,
    explanation: 'Bitcoin was created by an anonymous person or group using the pseudonym Satoshi Nakamoto.'
  },
  {
    category: 'Blockchain',
    difficulty: 'medium',
    question: 'What is a blockchain?',
    options: ['A type of database', 'A distributed ledger', 'A chain of blocks containing data', 'All of the above'],
    correct: 3,
    explanation: 'Blockchain is a distributed ledger technology that stores data in blocks linked together.'
  },
  {
    category: 'Blockchain',
    difficulty: 'medium',
    question: 'What does "mining" mean in cryptocurrency?',
    options: ['Digging for coins', 'Validating transactions', 'Buying crypto', 'Selling crypto'],
    correct: 1,
    explanation: 'Mining is the process of validating transactions and adding them to the blockchain.'
  },
  {
    category: 'Blockchain',
    difficulty: 'medium',
    question: 'What is Ethereum?',
    options: ['A Bitcoin clone', 'A blockchain platform with smart contracts', 'A mining company', 'A wallet'],
    correct: 1,
    explanation: 'Ethereum is a blockchain platform that enables smart contracts and decentralized applications.'
  },
  {
    category: 'Blockchain',
    difficulty: 'hard',
    question: 'What is a smart contract?',
    options: ['A legal document', 'Self-executing code on blockchain', 'A type of cryptocurrency', 'A mining algorithm'],
    correct: 1,
    explanation: 'Smart contracts are self-executing programs on blockchain that automatically enforce agreements.'
  },
  {
    category: 'Blockchain',
    difficulty: 'hard',
    question: 'What is DeFi?',
    options: ['Decentralized Finance', 'Digital Finance', 'Distributed Finance', 'Defined Finance'],
    correct: 0,
    explanation: 'DeFi (Decentralized Finance) refers to financial services built on blockchain without intermediaries.'
  },
  {
    category: 'Blockchain',
    difficulty: 'hard',
    question: 'What is an NFT?',
    options: ['New Financial Token', 'Non-Fungible Token', 'Network File Transfer', 'Next Future Technology'],
    correct: 1,
    explanation: 'NFT (Non-Fungible Token) is a unique digital asset representing ownership on blockchain.'
  }
];