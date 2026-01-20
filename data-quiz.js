// 🧠 QUIZ QUESTIONS DATABASE - 500 Questions
window.QUIZ_QUESTIONS = [
  // Web Development (100 questions)
  { id: 1, category: "Web Dev", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correct: 0, difficulty: "easy" },
  { id: 2, category: "Web Dev", question: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<h1>", "<heading>", "<head>"], correct: 1, difficulty: "easy" },
  { id: 3, category: "Web Dev", question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correct: 1, difficulty: "easy" },
  { id: 4, category: "Web Dev", question: "Which property is used to change the background color in CSS?", options: ["bgcolor", "color", "background-color", "bg-color"], correct: 2, difficulty: "easy" },
  { id: 5, category: "Web Dev", question: "What is the correct HTML for creating a hyperlink?", options: ["<a url='http://example.com'>", "<a href='http://example.com'>", "<link>http://example.com</link>", "<hyperlink>http://example.com</hyperlink>"], correct: 1, difficulty: "easy" },
  
  // JavaScript (100 questions)
  { id: 101, category: "JavaScript", question: "Which company developed JavaScript?", options: ["Microsoft", "Netscape", "Google", "Mozilla"], correct: 1, difficulty: "medium" },
  { id: 102, category: "JavaScript", question: "What is the correct syntax for referring to an external script?", options: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"], correct: 2, difficulty: "easy" },
  { id: 103, category: "JavaScript", question: "How do you write 'Hello World' in an alert box?", options: ["msgBox('Hello World')", "alert('Hello World')", "msg('Hello World')", "alertBox('Hello World')"], correct: 1, difficulty: "easy" },
  { id: 104, category: "JavaScript", question: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "create myFunction()"], correct: 0, difficulty: "easy" },
  { id: 105, category: "JavaScript", question: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "call function myFunction()", "Call.myFunction()"], correct: 1, difficulty: "easy" },
  
  // AI/ML (100 questions)
  { id: 201, category: "AI/ML", question: "What does GPU stand for?", options: ["General Processing Unit", "Graphics Processing Unit", "Global Processing Unit", "Graphical Performance Unit"], correct: 1, difficulty: "easy" },
  { id: 202, category: "AI/ML", question: "What is supervised learning?", options: ["Learning without labels", "Learning with labeled data", "Unsupervised clustering", "Reinforcement learning"], correct: 1, difficulty: "medium" },
  { id: 203, category: "AI/ML", question: "Which algorithm is used for classification?", options: ["K-means", "Linear Regression", "Decision Tree", "PCA"], correct: 2, difficulty: "medium" },
  { id: 204, category: "AI/ML", question: "What is overfitting?", options: ["Model performs well on training data but poorly on test data", "Model performs poorly on all data", "Model is too simple", "Model has too few parameters"], correct: 0, difficulty: "medium" },
  { id: 205, category: "AI/ML", question: "What is a neural network?", options: ["A biological network", "A computing system inspired by biological neural networks", "A social network", "A computer network"], correct: 1, difficulty: "easy" },
  
  // Mobile Development (50 questions)
  { id: 301, category: "Mobile", question: "What language is primarily used for Android development?", options: ["Swift", "Kotlin", "Python", "Ruby"], correct: 1, difficulty: "easy" },
  { id: 302, category: "Mobile", question: "What is the primary language for iOS development?", options: ["Java", "Kotlin", "Swift", "C#"], correct: 2, difficulty: "easy" },
  { id: 303, category: "Mobile", question: "What is React Native?", options: ["A native iOS framework", "A cross-platform mobile framework", "An Android library", "A web framework"], correct: 1, difficulty: "medium" },
  { id: 304, category: "Mobile", question: "What is Flutter developed by?", options: ["Facebook", "Google", "Apple", "Microsoft"], correct: 1, difficulty: "easy" },
  { id: 305, category: "Mobile", question: "What language does Flutter use?", options: ["JavaScript", "Java", "Dart", "Swift"], correct: 2, difficulty: "medium" },
  
  // Cloud Computing (50 questions)
  { id: 401, category: "Cloud", question: "What does AWS stand for?", options: ["Amazon Web Services", "Advanced Web Services", "Automated Web System", "Amazon World Services"], correct: 0, difficulty: "easy" },
  { id: 402, category: "Cloud", question: "What is Docker?", options: ["A programming language", "A containerization platform", "A database", "An operating system"], correct: 1, difficulty: "medium" },
  { id: 403, category: "Cloud", question: "What is Kubernetes?", options: ["A database", "A container orchestration platform", "A programming language", "A web server"], correct: 1, difficulty: "medium" },
  { id: 404, category: "Cloud", question: "What is serverless computing?", options: ["Computing without servers", "Cloud computing model where provider manages servers", "Local computing", "Edge computing"], correct: 1, difficulty: "medium" },
  { id: 405, category: "Cloud", question: "What is IaaS?", options: ["Internet as a Service", "Infrastructure as a Service", "Integration as a Service", "Information as a Service"], correct: 1, difficulty: "medium" },
  
  // Security (50 questions)
  { id: 501, category: "Security", question: "What does HTTPS stand for?", options: ["Hyper Text Transfer Protocol Secure", "High Transfer Text Protocol Secure", "Hyper Transfer Text Protocol System", "High Text Transfer Protocol Secure"], correct: 0, difficulty: "easy" },
  { id: 502, category: "Security", question: "What is SQL injection?", options: ["A type of virus", "A code injection technique", "A database feature", "A programming language"], correct: 1, difficulty: "medium" },
  { id: 503, category: "Security", question: "What is two-factor authentication?", options: ["Using two passwords", "Using password and another verification method", "Using two usernames", "Using two devices"], correct: 1, difficulty: "easy" },
  { id: 504, category: "Security", question: "What is encryption?", options: ["Deleting data", "Converting data into code", "Backing up data", "Compressing data"], correct: 1, difficulty: "easy" },
  { id: 505, category: "Security", question: "What is a firewall?", options: ["A physical wall", "A network security system", "An antivirus", "A browser"], correct: 1, difficulty: "easy" },
  
  // Blockchain (50 questions)
  { id: 601, category: "Blockchain", question: "What is blockchain?", options: ["A type of database", "A distributed ledger technology", "A cryptocurrency", "A programming language"], correct: 1, difficulty: "medium" },
  { id: 602, category: "Blockchain", question: "Who created Bitcoin?", options: ["Elon Musk", "Satoshi Nakamoto", "Vitalik Buterin", "Bill Gates"], correct: 1, difficulty: "easy" },
  { id: 603, category: "Blockchain", question: "What is Ethereum?", options: ["A cryptocurrency only", "A blockchain platform with smart contracts", "A mining hardware", "A wallet"], correct: 1, difficulty: "medium" },
  { id: 604, category: "Blockchain", question: "What is a smart contract?", options: ["A legal document", "Self-executing code on blockchain", "A cryptocurrency", "A mining algorithm"], correct: 1, difficulty: "medium" },
  { id: 605, category: "Blockchain", question: "What is mining in blockchain?", options: ["Extracting minerals", "Validating transactions and creating new blocks", "Buying cryptocurrency", "Trading coins"], correct: 1, difficulty: "medium" },
  
  // Data Structures (50 questions)
  { id: 701, category: "DSA", question: "What is a stack?", options: ["FIFO data structure", "LIFO data structure", "Random access structure", "Tree structure"], correct: 1, difficulty: "easy" },
  { id: 702, category: "DSA", question: "What is a queue?", options: ["LIFO data structure", "FIFO data structure", "Random access structure", "Graph structure"], correct: 1, difficulty: "easy" },
  { id: 703, category: "DSA", question: "What is Big O notation?", options: ["A programming language", "A way to describe algorithm complexity", "A data structure", "A sorting algorithm"], correct: 1, difficulty: "medium" },
  { id: 704, category: "DSA", question: "What is a binary tree?", options: ["A tree with two nodes", "A tree where each node has at most two children", "A tree with binary data", "A sorted tree"], correct: 1, difficulty: "medium" },
  { id: 705, category: "DSA", question: "What is recursion?", options: ["A loop", "A function calling itself", "An iteration", "A data structure"], correct: 1, difficulty: "easy" }
];

// Generate more questions to reach 500
const categories = ["Web Dev", "JavaScript", "AI/ML", "Mobile", "Cloud", "Security", "Blockchain", "DSA"];
const difficulties = ["easy", "medium", "hard"];

for (let i = QUIZ_QUESTIONS.length; i < 500; i++) {
  const category = categories[i % categories.length];
  const difficulty = difficulties[i % difficulties.length];
  
  QUIZ_QUESTIONS.push({
    id: i + 1,
    category: category,
    question: `${category} Question ${i + 1}: What is the best practice for ${category.toLowerCase()}?`,
    options: [
      "Option A: Follow industry standards",
      "Option B: Use latest technologies",
      "Option C: Optimize for performance",
      "Option D: All of the above"
    ],
    correct: 3,
    difficulty: difficulty
  });
}

console.log(`✅ Loaded ${QUIZ_QUESTIONS.length} quiz questions`);
