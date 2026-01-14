// 🧠 TECH MASTERY QUIZ - 100 REAL QUESTIONS
const quizQuestions = [
  // AI/ML CATEGORY (15 questions)
  {
    category: 'AI/ML',
    difficulty: 'Easy',
    question: 'What does GPT stand for in ChatGPT?',
    options: [
      'General Purpose Technology',
      'Generative Pre-trained Transformer',
      'Global Processing Tool',
      'Graphical Programming Terminal'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Medium',
    question: 'Which company developed the BERT language model?',
    options: ['OpenAI', 'Google', 'Meta', 'Microsoft'],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Hard',
    question: 'What is the primary innovation in Transformer architecture?',
    options: [
      'Recurrent connections',
      'Self-attention mechanism',
      'Convolutional layers',
      'Pooling operations'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Easy',
    question: 'What is the main purpose of a neural network activation function?',
    options: [
      'To introduce non-linearity',
      'To reduce overfitting',
      'To normalize data',
      'To increase speed'
    ],
    correctAnswer: 0
  },
  {
    category: 'AI/ML',
    difficulty: 'Medium',
    question: 'Which technique is used to prevent overfitting in neural networks?',
    options: ['Dropout', 'Gradient descent', 'Backpropagation', 'Forward pass'],
    correctAnswer: 0
  },
  {
    category: 'AI/ML',
    difficulty: 'Hard',
    question: 'What is the vanishing gradient problem?',
    options: [
      'Gradients become too large during training',
      'Gradients become too small in deep networks',
      'Gradients disappear completely',
      'Gradients oscillate randomly'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Easy',
    question: 'What does CNN stand for in deep learning?',
    options: [
      'Computer Neural Network',
      'Convolutional Neural Network',
      'Cascading Node Network',
      'Computational Neuron Network'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Medium',
    question: 'Which loss function is commonly used for binary classification?',
    options: [
      'Mean Squared Error',
      'Binary Cross-Entropy',
      'Categorical Cross-Entropy',
      'Hinge Loss'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Hard',
    question: 'What is the purpose of batch normalization?',
    options: [
      'To reduce training time only',
      'To stabilize learning and reduce internal covariate shift',
      'To increase model size',
      'To prevent underfitting'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Easy',
    question: 'What is reinforcement learning?',
    options: [
      'Learning from labeled data',
      'Learning from rewards and penalties',
      'Learning without any data',
      'Learning from unlabeled data'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Medium',
    question: 'Which algorithm is used in ChatGPT for training?',
    options: [
      'Supervised learning only',
      'Reinforcement Learning from Human Feedback (RLHF)',
      'Unsupervised learning only',
      'Transfer learning only'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Hard',
    question: 'What is the attention mechanism in transformers measuring?',
    options: [
      'Model accuracy',
      'Relevance between different parts of input',
      'Training speed',
      'Memory usage'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Easy',
    question: 'What is the main advantage of transfer learning?',
    options: [
      'Requires more data',
      'Leverages pre-trained models to reduce training time',
      'Always gives better results',
      'Eliminates need for GPUs'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Medium',
    question: 'What is the purpose of word embeddings like Word2Vec?',
    options: [
      'To compress text files',
      'To represent words as dense vectors capturing semantic meaning',
      'To translate languages',
      'To count word frequency'
    ],
    correctAnswer: 1
  },
  {
    category: 'AI/ML',
    difficulty: 'Hard',
    question: 'What is the key difference between LSTM and GRU?',
    options: [
      'LSTM has more parameters and gates',
      'GRU is always better',
      'LSTM cannot handle sequences',
      'GRU requires more memory'
    ],
    correctAnswer: 0
  },

  // SPACE TECH CATEGORY (12 questions)
  {
    category: 'Space Tech',
    difficulty: 'Easy',
    question: 'Which ISRO mission successfully landed on the Moon\'s south pole?',
    options: ['Chandrayaan-1', 'Chandrayaan-2', 'Chandrayaan-3', 'Mangalyaan'],
    correctAnswer: 2
  },
  {
    category: 'Space Tech',
    difficulty: 'Medium',
    question: 'What is the name of India\'s first Mars orbiter mission?',
    options: ['Mangalyaan', 'Mars Express', 'Red Planet', 'Bhaumik'],
    correctAnswer: 0
  },
  {
    category: 'Space Tech',
    difficulty: 'Hard',
    question: 'What is the orbital period of India\'s NavIC satellite constellation?',
    options: ['12 hours', '24 hours', 'Geostationary', 'Mixed orbits'],
    correctAnswer: 3
  },
  {
    category: 'Space Tech',
    difficulty: 'Easy',
    question: 'What does PSLV stand for?',
    options: [
      'Polar Satellite Launch Vehicle',
      'Primary Space Launch Vehicle',
      'Powered Satellite Launch Vehicle',
      'Precision Satellite Launch Vehicle'
    ],
    correctAnswer: 0
  },
  {
    category: 'Space Tech',
    difficulty: 'Medium',
    question: 'Which is the heaviest rocket developed by ISRO?',
    options: ['PSLV', 'GSLV Mk II', 'GSLV Mk III', 'SSLV'],
    correctAnswer: 2
  },
  {
    category: 'Space Tech',
    difficulty: 'Hard',
    question: 'What is the thrust of ISRO\'s semi-cryogenic engine being developed?',
    options: ['75 tons', '100 tons', '200 tons', '2000 kN'],
    correctAnswer: 3
  },
  {
    category: 'Space Tech',
    difficulty: 'Easy',
    question: 'What is Gaganyaan?',
    options: [
      'A satellite',
      'India\'s human spaceflight program',
      'A rocket',
      'A space station'
    ],
    correctAnswer: 1
  },
  {
    category: 'Space Tech',
    difficulty: 'Medium',
    question: 'Which country was the first to land on the far side of the Moon?',
    options: ['USA', 'Russia', 'China', 'India'],
    correctAnswer: 2
  },
  {
    category: 'Space Tech',
    difficulty: 'Hard',
    question: 'What is the specific impulse of ISRO\'s cryogenic engine (CE-20)?',
    options: ['442 seconds', '350 seconds', '280 seconds', '500 seconds'],
    correctAnswer: 0
  },
  {
    category: 'Space Tech',
    difficulty: 'Easy',
    question: 'What is the primary fuel used in PSLV\'s solid boosters?',
    options: [
      'Liquid hydrogen',
      'Hydroxyl-terminated polybutadiene (HTPB)',
      'Kerosene',
      'Methane'
    ],
    correctAnswer: 1
  },
  {
    category: 'Space Tech',
    difficulty: 'Medium',
    question: 'What is the name of SpaceX\'s reusable rocket?',
    options: ['Dragon', 'Falcon 9', 'Starship', 'Crew Dragon'],
    correctAnswer: 1
  },
  {
    category: 'Space Tech',
    difficulty: 'Hard',
    question: 'What is the delta-v requirement for low Earth orbit?',
    options: ['5 km/s', '7.8 km/s', '9.4 km/s', '11.2 km/s'],
    correctAnswer: 2
  },

  // QUANTUM COMPUTING (10 questions)
  {
    category: 'Quantum Computing',
    difficulty: 'Easy',
    question: 'What is a qubit?',
    options: [
      'A quantum bit',
      'A quick bit',
      'A quality bit',
      'A quarter bit'
    ],
    correctAnswer: 0
  },
  {
    category: 'Quantum Computing',
    difficulty: 'Medium',
    question: 'What is quantum superposition?',
    options: [
      'Qubits being in multiple states simultaneously',
      'Qubits being very fast',
      'Qubits being very small',
      'Qubits being very cold'
    ],
    correctAnswer: 0
  },
  {
    category: 'Quantum Computing',
    difficulty: 'Hard',
    question: 'What is quantum entanglement?',
    options: [
      'Qubits getting stuck',
      'Correlation between qubits regardless of distance',
      'Qubits moving very fast',
      'Qubits being very cold'
    ],
    correctAnswer: 1
  },
  {
    category: 'Quantum Computing',
    difficulty: 'Easy',
    question: 'Which company built the first quantum computer to achieve quantum supremacy?',
    options: ['IBM', 'Google', 'Microsoft', 'Amazon'],
    correctAnswer: 1
  },
  {
    category: 'Quantum Computing',
    difficulty: 'Medium',
    question: 'What is Shor\'s algorithm used for?',
    options: [
      'Sorting data',
      'Factoring large numbers',
      'Searching databases',
      'Compressing files'
    ],
    correctAnswer: 1
  },
  {
    category: 'Quantum Computing',
    difficulty: 'Hard',
    question: 'What temperature do most quantum computers operate at?',
    options: [
      'Room temperature',
      'Near absolute zero (millikelvins)',
      '100 Kelvin',
      'Freezing point of water'
    ],
    correctAnswer: 1
  },
  {
    category: 'Quantum Computing',
    difficulty: 'Easy',
    question: 'What is quantum decoherence?',
    options: [
      'Loss of quantum properties due to environmental interference',
      'Quantum computers getting faster',
      'Quantum computers getting smaller',
      'Quantum computers getting cheaper'
    ],
    correctAnswer: 0
  },
  {
    category: 'Quantum Computing',
    difficulty: 'Medium',
    question: 'What is Grover\'s algorithm used for?',
    options: [
      'Factoring numbers',
      'Unstructured search with quadratic speedup',
      'Sorting data',
      'Encrypting data'
    ],
    correctAnswer: 1
  },
  {
    category: 'Quantum Computing',
    difficulty: 'Hard',
    question: 'What is the no-cloning theorem in quantum mechanics?',
    options: [
      'Quantum computers cannot be copied',
      'Quantum states cannot be perfectly copied',
      'Qubits cannot be measured',
      'Quantum algorithms cannot be shared'
    ],
    correctAnswer: 1
  },
  {
    category: 'Quantum Computing',
    difficulty: 'Medium',
    question: 'What is quantum annealing used for?',
    options: [
      'Cooling quantum computers',
      'Optimization problems',
      'Encryption',
      'Data storage'
    ],
    correctAnswer: 1
  },

  // CYBERSECURITY (13 questions)
  {
    category: 'Cybersecurity',
    difficulty: 'Easy',
    question: 'What does VPN stand for?',
    options: [
      'Virtual Private Network',
      'Very Private Network',
      'Verified Public Network',
      'Virtual Public Node'
    ],
    correctAnswer: 0
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Medium',
    question: 'What is a zero-day vulnerability?',
    options: [
      'A bug found on day zero',
      'A vulnerability unknown to the vendor',
      'A vulnerability that takes zero days to fix',
      'A vulnerability with zero impact'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Hard',
    question: 'What is the primary purpose of SIEM systems?',
    options: [
      'Antivirus protection',
      'Security Information and Event Management',
      'Firewall configuration',
      'Password management'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Easy',
    question: 'What is phishing?',
    options: [
      'A type of malware',
      'A social engineering attack to steal credentials',
      'A network protocol',
      'A firewall technique'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Medium',
    question: 'What is the difference between symmetric and asymmetric encryption?',
    options: [
      'Speed only',
      'Symmetric uses same key, asymmetric uses public/private keys',
      'Security level only',
      'No difference'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Hard',
    question: 'What is a rainbow table attack?',
    options: [
      'Colorful malware',
      'Precomputed hash attack for password cracking',
      'Network flooding',
      'SQL injection variant'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Easy',
    question: 'What does HTTPS provide over HTTP?',
    options: [
      'Faster speed',
      'Encryption and authentication',
      'Better SEO only',
      'More features'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Medium',
    question: 'What is SQL injection?',
    options: [
      'Database optimization',
      'Malicious SQL code injection to manipulate databases',
      'SQL debugging',
      'SQL performance tuning'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Hard',
    question: 'What is the OWASP Top 10?',
    options: [
      'Top 10 hackers',
      'Top 10 web application security risks',
      'Top 10 security tools',
      'Top 10 encryption algorithms'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Easy',
    question: 'What is two-factor authentication (2FA)?',
    options: [
      'Two passwords',
      'Additional verification beyond password',
      'Two firewalls',
      'Two antivirus programs'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Medium',
    question: 'What is a DDoS attack?',
    options: [
      'Data theft',
      'Distributed Denial of Service - overwhelming servers',
      'Password cracking',
      'Malware infection'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Hard',
    question: 'What is the principle of least privilege?',
    options: [
      'Give everyone admin access',
      'Grant minimum necessary permissions',
      'No permissions for anyone',
      'Maximum security always'
    ],
    correctAnswer: 1
  },
  {
    category: 'Cybersecurity',
    difficulty: 'Medium',
    question: 'What is a man-in-the-middle (MITM) attack?',
    options: [
      'Physical theft',
      'Intercepting communication between two parties',
      'Server hacking',
      'Password guessing'
    ],
    correctAnswer: 1
  },

  // INDIAN TECH (12 questions)
  {
    category: 'Indian Tech',
    difficulty: 'Easy',
    question: 'Which Indian company developed the UPI payment system?',
    options: ['Paytm', 'NPCI', 'PhonePe', 'Google Pay'],
    correctAnswer: 1
  },
  {
    category: 'Indian Tech',
    difficulty: 'Medium',
    question: 'What is the name of India\'s indigenous operating system?',
    options: ['BharatOS', 'BOSS (Bharat Operating System Solutions)', 'IndiaOS', 'SwadeshiOS'],
    correctAnswer: 1
  },
  {
    category: 'Indian Tech',
    difficulty: 'Hard',
    question: 'Which IIT developed India\'s first microprocessor Shakti?',
    options: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur'],
    correctAnswer: 2
  },
  {
    category: 'Indian Tech',
    difficulty: 'Easy',
    question: 'What does DRDO stand for?',
    options: [
      'Defence Research and Development Organisation',
      'Digital Research and Development Office',
      'Defence Resource Development Office',
      'Digital Resource Development Organisation'
    ],
    correctAnswer: 0
  },
  {
    category: 'Indian Tech',
    difficulty: 'Medium',
    question: 'Which Indian supercomputer is among the world\'s fastest?',
    options: ['Param Siddhi', 'Aadhaar', 'Shakti', 'Pratyush'],
    correctAnswer: 0
  },
  {
    category: 'Indian Tech',
    difficulty: 'Hard',
    question: 'What is the processing capacity of Param Siddhi-AI?',
    options: ['1 petaflop', '4.6 petaflops', '10 petaflops', '100 petaflops'],
    correctAnswer: 1
  },
  {
    category: 'Indian Tech',
    difficulty: 'Easy',
    question: 'Which Indian city is known as the Silicon Valley of India?',
    options: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'],
    correctAnswer: 2
  },
  {
    category: 'Indian Tech',
    difficulty: 'Medium',
    question: 'What is Aarogya Setu?',
    options: [
      'A health insurance app',
      'COVID-19 contact tracing app',
      'A telemedicine platform',
      'A fitness tracker'
    ],
    correctAnswer: 1
  },
  {
    category: 'Indian Tech',
    difficulty: 'Hard',
    question: 'Which Indian startup became a unicorn in the fastest time (6 months)?',
    options: ['Meesho', 'CRED', 'Groww', 'Glance'],
    correctAnswer: 3
  },
  {
    category: 'Indian Tech',
    difficulty: 'Easy',
    question: 'What is Aadhaar?',
    options: [
      'A payment system',
      'A 12-digit unique identity number',
      'A social media platform',
      'A government website'
    ],
    correctAnswer: 1
  },
  {
    category: 'Indian Tech',
    difficulty: 'Medium',
    question: 'Which Indian company acquired WhatsApp rival Hike?',
    options: ['Reliance', 'Airtel', 'Bharti Enterprises', 'None (shut down)'],
    correctAnswer: 3
  },
  {
    category: 'Indian Tech',
    difficulty: 'Hard',
    question: 'What is the name of India\'s indigenous navigation system?',
    options: ['GPS India', 'NavIC (Navigation with Indian Constellation)', 'IRNSS', 'Both B and C'],
    correctAnswer: 3
  },

  // CODING (15 questions)
  {
    category: 'Coding',
    difficulty: 'Easy',
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlinks and Text Markup Language'
    ],
    correctAnswer: 0
  },
  {
    category: 'Coding',
    difficulty: 'Medium',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 1
  },
  {
    category: 'Coding',
    difficulty: 'Hard',
    question: 'What is a closure in JavaScript?',
    options: [
      'A function that closes the browser',
      'A function with access to outer scope variables',
      'A way to close files',
      'A loop termination'
    ],
    correctAnswer: 1
  },
  {
    category: 'Coding',
    difficulty: 'Easy',
    question: 'Which symbol is used for comments in Python?',
    options: ['//', '/* */', '#', '<!--'],
    correctAnswer: 2
  },
  {
    category: 'Coding',
    difficulty: 'Medium',
    question: 'What is the difference between == and === in JavaScript?',
    options: [
      'No difference',
      '== checks value, === checks value and type',
      '=== is faster',
      '== is deprecated'
    ],
    correctAnswer: 1
  },
  {
    category: 'Coding',
    difficulty: 'Hard',
    question: 'What is the space complexity of merge sort?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 2
  },
  {
    category: 'Coding',
    difficulty: 'Easy',
    question: 'What does CSS stand for?',
    options: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Creative Style Sheets',
      'Colorful Style Sheets'
    ],
    correctAnswer: 1
  },
  {
    category: 'Coding',
    difficulty: 'Medium',
    question: 'What is a RESTful API?',
    options: [
      'A sleeping API',
      'Representational State Transfer architecture',
      'A fast API',
      'A secure API'
    ],
    correctAnswer: 1
  },
  {
    category: 'Coding',
    difficulty: 'Hard',
    question: 'What is the difference between stack and heap memory?',
    options: [
      'No difference',
      'Stack is for static allocation, heap for dynamic',
      'Heap is faster',
      'Stack is unlimited'
    ],
    correctAnswer: 1
  },
  {
    category: 'Coding',
    difficulty: 'Easy',
    question: 'What is Git?',
    options: [
      'A programming language',
      'A version control system',
      'A database',
      'A web framework'
    ],
    correctAnswer: 1
  },
  {
    category: 'Coding',
    difficulty: 'Medium',
    question: 'What is the purpose of async/await in JavaScript?',
    options: [
      'To make code slower',
      'To handle asynchronous operations more cleanly',
      'To create loops',
      'To define variables'
    ],
    correctAnswer: 1
  },
  {
    category: 'Coding',
    difficulty: 'Hard',
    question: 'What is the difference between process and thread?',
    options: [
      'No difference',
      'Process is independent, thread shares memory',
      'Thread is slower',
      'Process is always better'
    ],
    correctAnswer: 1
  },
  {
    category: 'Coding',
    difficulty: 'Easy',
    question: 'What does SQL stand for?',
    options: [
      'Structured Query Language',
      'Simple Query Language',
      'Standard Query Language',
      'Secure Query Language'
    ],
    correctAnswer: 0
  },
  {
    category: 'Coding',
    difficulty: 'Medium',
    question: 'What is polymorphism in OOP?',
    options: [
      'Multiple forms of same entity',
      'Single form only',
      'No forms',
      'Random forms'
    ],
    correctAnswer: 0
  },
  {
    category: 'Coding',
    difficulty: 'Hard',
    question: 'What is the CAP theorem in distributed systems?',
    options: [
      'Consistency, Availability, Partition tolerance - pick 2',
      'All three always possible',
      'None are important',
      'Only one matters'
    ],
    correctAnswer: 0
  },

  // HARDWARE (10 questions)
  {
    category: 'Hardware',
    difficulty: 'Easy',
    question: 'What does CPU stand for?',
    options: [
      'Central Processing Unit',
      'Computer Personal Unit',
      'Central Program Unit',
      'Computer Processing Unit'
    ],
    correctAnswer: 0
  },
  {
    category: 'Hardware',
    difficulty: 'Medium',
    question: 'What is the difference between RAM and ROM?',
    options: [
      'No difference',
      'RAM is volatile, ROM is non-volatile',
      'ROM is faster',
      'RAM is permanent'
    ],
    correctAnswer: 1
  },
  {
    category: 'Hardware',
    difficulty: 'Hard',
    question: 'What is the current smallest transistor size in production?',
    options: ['14nm', '7nm', '3nm', '1nm'],
    correctAnswer: 2
  },
  {
    category: 'Hardware',
    difficulty: 'Easy',
    question: 'What does GPU stand for?',
    options: [
      'Graphics Processing Unit',
      'General Processing Unit',
      'Game Processing Unit',
      'Global Processing Unit'
    ],
    correctAnswer: 0
  },
  {
    category: 'Hardware',
    difficulty: 'Medium',
    question: 'What is Moore\'s Law?',
    options: [
      'Computers get cheaper',
      'Transistor count doubles every ~2 years',
      'CPUs get faster every year',
      'Memory doubles every year'
    ],
    correctAnswer: 1
  },
  {
    category: 'Hardware',
    difficulty: 'Hard',
    question: 'What is the purpose of L1, L2, L3 cache?',
    options: [
      'Decoration',
      'Fast memory hierarchy to reduce CPU wait time',
      'Backup storage',
      'Graphics processing'
    ],
    correctAnswer: 1
  },
  {
    category: 'Hardware',
    difficulty: 'Easy',
    question: 'What is SSD?',
    options: [
      'Super Speed Drive',
      'Solid State Drive',
      'Secure Storage Device',
      'System Storage Disk'
    ],
    correctAnswer: 1
  },
  {
    category: 'Hardware',
    difficulty: 'Medium',
    question: 'What is the difference between SATA and NVMe?',
    options: [
      'No difference',
      'NVMe is faster using PCIe interface',
      'SATA is newer',
      'NVMe is cheaper'
    ],
    correctAnswer: 1
  },
  {
    category: 'Hardware',
    difficulty: 'Hard',
    question: 'What is the bandwidth of PCIe 5.0 x16?',
    options: ['32 GB/s', '64 GB/s', '128 GB/s', '256 GB/s'],
    correctAnswer: 1
  },
  {
    category: 'Hardware',
    difficulty: 'Medium',
    question: 'What is the purpose of a motherboard chipset?',
    options: [
      'Power supply',
      'Manages data flow between CPU, memory, and peripherals',
      'Graphics processing',
      'Sound processing'
    ],
    correctAnswer: 1
  },

  // BLOCKCHAIN (13 questions)
  {
    category: 'Blockchain',
    difficulty: 'Easy',
    question: 'What is Bitcoin?',
    options: [
      'A company',
      'A decentralized cryptocurrency',
      'A bank',
      'A government currency'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Medium',
    question: 'What is a blockchain?',
    options: [
      'A type of database',
      'A distributed ledger with cryptographic links',
      'A programming language',
      'A network protocol'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Hard',
    question: 'What is the Byzantine Generals Problem?',
    options: [
      'A military strategy',
      'Achieving consensus in distributed systems with faulty nodes',
      'A cryptography algorithm',
      'A mining technique'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Easy',
    question: 'What is mining in cryptocurrency?',
    options: [
      'Digging for coins',
      'Validating transactions and creating new blocks',
      'Stealing coins',
      'Buying coins'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Medium',
    question: 'What is a smart contract?',
    options: [
      'A legal document',
      'Self-executing code on blockchain',
      'A mining algorithm',
      'A wallet type'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Hard',
    question: 'What is the difference between Proof of Work and Proof of Stake?',
    options: [
      'No difference',
      'PoW uses computation, PoS uses stake/ownership',
      'PoS is always better',
      'PoW is newer'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Easy',
    question: 'What is Ethereum?',
    options: [
      'A Bitcoin clone',
      'A blockchain platform for smart contracts',
      'A mining company',
      'A wallet'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Medium',
    question: 'What is a 51% attack?',
    options: [
      'Stealing 51% of coins',
      'Controlling majority of network hash power',
      'A tax rate',
      'A mining fee'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Hard',
    question: 'What is the trilemma in blockchain?',
    options: [
      'Three cryptocurrencies',
      'Balancing decentralization, security, and scalability',
      'Three mining algorithms',
      'Three wallet types'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Easy',
    question: 'What is a cryptocurrency wallet?',
    options: [
      'A physical wallet',
      'Software to store private keys',
      'A bank account',
      'A mining tool'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Medium',
    question: 'What is DeFi?',
    options: [
      'Decentralized Finance',
      'Digital Finance',
      'Distributed Finance',
      'Defined Finance'
    ],
    correctAnswer: 0
  },
  {
    category: 'Blockchain',
    difficulty: 'Hard',
    question: 'What is sharding in blockchain?',
    options: [
      'Breaking blocks',
      'Partitioning network for parallel processing',
      'A mining technique',
      'A wallet feature'
    ],
    correctAnswer: 1
  },
  {
    category: 'Blockchain',
    difficulty: 'Medium',
    question: 'What is an NFT?',
    options: [
      'A cryptocurrency',
      'Non-Fungible Token - unique digital asset',
      'A mining algorithm',
      'A wallet type'
    ],
    correctAnswer: 1
  }
];

// Export for use in app
if (typeof window !== 'undefined') {
  window.quizQuestions = quizQuestions;
}

// Also export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = quizQuestions;
}
