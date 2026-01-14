// 🌐 TECH COMMUNITIES - CONNECT WITH FELLOW LEARNERS & PROFESSIONALS

const communities = {
  // DISCORD SERVERS
  discord: [
    {
      name: 'Tech Mastery Lab Official',
      description: 'Our official Discord server! Join for live discussions, study groups, project collaborations.',
      members: 'New Server',
      link: 'https://discord.gg/techmastery',
      topics: ['All Tech Topics', 'Study Groups', 'Career Guidance', 'Project Help'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'Indian Developers Community',
      description: 'Largest Indian dev community. Daily coding challenges, job postings, tech discussions.',
      members: '50,000+',
      link: 'https://discord.gg/indian-devs',
      topics: ['Web Dev', 'Mobile Dev', 'DSA', 'System Design'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'ISRO & Space Enthusiasts India',
      description: 'Space tech discussions, ISRO updates, satellite tracking, astronomy.',
      members: '15,000+',
      link: 'https://discord.gg/isro-space',
      topics: ['Space Tech', 'ISRO Missions', 'Astronomy', 'Astrophysics'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'AI/ML India',
      description: 'Machine learning, deep learning, AI research discussions.',
      members: '30,000+',
      link: 'https://discord.gg/aiml-india',
      topics: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
      language: 'English',
      active: true
    },
    {
      name: 'Cybersecurity India',
      description: 'Ethical hacking, CTF challenges, security research.',
      members: '20,000+',
      link: 'https://discord.gg/cybersec-india',
      topics: ['Ethical Hacking', 'CTF', 'Bug Bounty', 'Security Research'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'Blockchain India',
      description: 'Crypto, Web3, smart contracts, DeFi discussions.',
      members: '25,000+',
      link: 'https://discord.gg/blockchain-india',
      topics: ['Blockchain', 'Cryptocurrency', 'Web3', 'Smart Contracts'],
      language: 'English',
      active: true
    }
  ],

  // TELEGRAM GROUPS
  telegram: [
    {
      name: 'Tech Mastery Lab Chat',
      description: 'Official Telegram group for quick discussions and updates.',
      members: 'New Group',
      link: 'https://t.me/techmasterylab',
      topics: ['All Tech Topics', 'Quick Help', 'Resource Sharing'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'Indian Coders',
      description: 'Daily coding problems, interview prep, job alerts.',
      members: '100,000+',
      link: 'https://t.me/indiancoders',
      topics: ['Coding', 'DSA', 'Interview Prep', 'Job Alerts'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'ISRO Updates Official',
      description: 'Official ISRO mission updates and space news.',
      members: '200,000+',
      link: 'https://t.me/isro_official',
      topics: ['ISRO Missions', 'Space News', 'Launch Updates'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'AI/ML Researchers India',
      description: 'Research papers, ML projects, AI news.',
      members: '50,000+',
      link: 'https://t.me/aiml_india',
      topics: ['AI Research', 'ML Projects', 'Research Papers'],
      language: 'English',
      active: true
    },
    {
      name: 'Ethical Hackers India',
      description: 'Bug bounty tips, security tools, CTF announcements.',
      members: '75,000+',
      link: 'https://t.me/ethicalhackers_india',
      topics: ['Bug Bounty', 'Security Tools', 'CTF'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'Web3 India',
      description: 'Blockchain jobs, crypto news, Web3 projects.',
      members: '60,000+',
      link: 'https://t.me/web3_india',
      topics: ['Web3', 'Crypto', 'Blockchain Jobs'],
      language: 'English',
      active: true
    },
    {
      name: 'IIT JEE Advanced Prep',
      description: 'JEE preparation, study materials, doubt solving.',
      members: '150,000+',
      link: 'https://t.me/iitjee_prep',
      topics: ['JEE Preparation', 'Study Materials', 'Mock Tests'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'GATE CS/IT Preparation',
      description: 'GATE exam prep, previous papers, study groups.',
      members: '120,000+',
      link: 'https://t.me/gate_csit',
      topics: ['GATE Prep', 'Previous Papers', 'Study Groups'],
      language: 'English + Hindi',
      active: true
    }
  ],

  // WHATSAPP GROUPS
  whatsapp: [
    {
      name: 'Tech Mastery Lab WhatsApp',
      description: 'Official WhatsApp community for daily updates and quick help.',
      members: 'New Community',
      link: 'https://chat.whatsapp.com/techmastery',
      topics: ['Daily Updates', 'Quick Help', 'Resource Sharing'],
      language: 'English + Hindi',
      active: true,
      note: 'Limited to 1024 members per group'
    },
    {
      name: 'Indian Developers Hub',
      description: 'Web dev, mobile dev, coding discussions.',
      members: '500+',
      link: 'https://chat.whatsapp.com/indian-devs',
      topics: ['Web Development', 'Mobile Apps', 'Coding'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'AI/ML Study Group',
      description: 'Machine learning projects, study materials.',
      members: '400+',
      link: 'https://chat.whatsapp.com/aiml-study',
      topics: ['Machine Learning', 'Projects', 'Study Materials'],
      language: 'English',
      active: true
    },
    {
      name: 'Cybersecurity Enthusiasts',
      description: 'Security news, tools, ethical hacking tips.',
      members: '600+',
      link: 'https://chat.whatsapp.com/cybersec',
      topics: ['Security News', 'Tools', 'Ethical Hacking'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'Space Tech India',
      description: 'ISRO updates, space news, astronomy.',
      members: '800+',
      link: 'https://chat.whatsapp.com/space-india',
      topics: ['ISRO', 'Space News', 'Astronomy'],
      language: 'English + Hindi',
      active: true
    }
  ],

  // LINKEDIN GROUPS
  linkedin: [
    {
      name: 'Indian Tech Professionals',
      description: 'Professional networking, job opportunities, industry insights.',
      members: '500,000+',
      link: 'https://www.linkedin.com/groups/indian-tech-professionals',
      topics: ['Networking', 'Jobs', 'Industry News'],
      language: 'English',
      active: true
    },
    {
      name: 'ISRO & Space Technology India',
      description: 'Space industry professionals, ISRO careers, aerospace engineering.',
      members: '100,000+',
      link: 'https://www.linkedin.com/groups/isro-space-india',
      topics: ['Space Industry', 'ISRO Careers', 'Aerospace'],
      language: 'English',
      active: true
    },
    {
      name: 'AI & Machine Learning India',
      description: 'AI professionals, ML engineers, data scientists.',
      members: '300,000+',
      link: 'https://www.linkedin.com/groups/ai-ml-india',
      topics: ['AI Jobs', 'ML Engineering', 'Data Science'],
      language: 'English',
      active: true
    },
    {
      name: 'Cybersecurity Professionals India',
      description: 'Security experts, ethical hackers, security analysts.',
      members: '200,000+',
      link: 'https://www.linkedin.com/groups/cybersec-india',
      topics: ['Security Jobs', 'Certifications', 'Industry Trends'],
      language: 'English',
      active: true
    },
    {
      name: 'IIT Alumni Network',
      description: 'IIT graduates, networking, mentorship.',
      members: '400,000+',
      link: 'https://www.linkedin.com/groups/iit-alumni',
      topics: ['Alumni Network', 'Mentorship', 'Career Growth'],
      language: 'English',
      active: true
    },
    {
      name: 'Blockchain & Web3 India',
      description: 'Blockchain developers, crypto professionals, Web3 builders.',
      members: '150,000+',
      link: 'https://www.linkedin.com/groups/blockchain-india',
      topics: ['Blockchain Jobs', 'Web3', 'Crypto Industry'],
      language: 'English',
      active: true
    }
  ],

  // REDDIT COMMUNITIES
  reddit: [
    {
      name: 'r/IndianTech',
      description: 'Indian tech industry discussions, news, careers.',
      members: '50,000+',
      link: 'https://www.reddit.com/r/IndianTech',
      topics: ['Tech Industry', 'Careers', 'News'],
      language: 'English',
      active: true
    },
    {
      name: 'r/ISRO',
      description: 'ISRO missions, space technology, Indian space program.',
      members: '100,000+',
      link: 'https://www.reddit.com/r/ISRO',
      topics: ['ISRO Missions', 'Space Tech', 'Launch Updates'],
      language: 'English',
      active: true
    },
    {
      name: 'r/developersIndia',
      description: 'Indian developers community, coding, career advice.',
      members: '200,000+',
      link: 'https://www.reddit.com/r/developersIndia',
      topics: ['Coding', 'Career Advice', 'Tech Discussions'],
      language: 'English',
      active: true
    },
    {
      name: 'r/IndianGaming',
      description: 'Gaming tech, hardware, game development.',
      members: '300,000+',
      link: 'https://www.reddit.com/r/IndianGaming',
      topics: ['Gaming', 'Hardware', 'Game Dev'],
      language: 'English',
      active: true
    },
    {
      name: 'r/Indian_Academia',
      description: 'Academic discussions, research, higher education.',
      members: '150,000+',
      link: 'https://www.reddit.com/r/Indian_Academia',
      topics: ['Research', 'Higher Education', 'Academic Careers'],
      language: 'English',
      active: true
    },
    {
      name: 'r/CyberSecurityIndia',
      description: 'Cybersecurity news, ethical hacking, security research.',
      members: '25,000+',
      link: 'https://www.reddit.com/r/CyberSecurityIndia',
      topics: ['Security News', 'Ethical Hacking', 'Research'],
      language: 'English',
      active: true
    },
    {
      name: 'r/IndiaInvestments',
      description: 'Tech stocks, crypto, blockchain investments.',
      members: '400,000+',
      link: 'https://www.reddit.com/r/IndiaInvestments',
      topics: ['Tech Stocks', 'Crypto', 'Investments'],
      language: 'English',
      active: true
    }
  ],

  // YOUTUBE CHANNELS (Educational Communities)
  youtube: [
    {
      name: 'Tech Mastery Lab',
      description: 'Our official YouTube channel - tutorials, project walkthroughs, tech news.',
      subscribers: 'New Channel',
      link: 'https://youtube.com/@techmastery',
      topics: ['Tutorials', 'Projects', 'Tech News'],
      language: 'English + Hindi',
      active: true
    },
    {
      name: 'CodeWithHarry',
      description: 'Programming tutorials in Hindi, web development, Python.',
      subscribers: '5M+',
      link: 'https://youtube.com/@CodeWithHarry',
      topics: ['Programming', 'Web Dev', 'Python'],
      language: 'Hindi',
      active: true
    },
    {
      name: 'Apna College',
      description: 'DSA, placement preparation, coding tutorials.',
      subscribers: '4M+',
      link: 'https://youtube.com/@ApnaCollegeOfficial',
      topics: ['DSA', 'Placements', 'Coding'],
      language: 'Hindi',
      active: true
    },
    {
      name: 'Tanay Pratap',
      description: 'Web development, career guidance, tech industry insights.',
      subscribers: '500K+',
      link: 'https://youtube.com/@tanaypratap',
      topics: ['Web Dev', 'Career', 'Industry Insights'],
      language: 'English + Hindi',
      active: true
    }
  ],

  // GITHUB ORGANIZATIONS
  github: [
    {
      name: 'Tech Mastery Lab',
      description: 'Our official GitHub org - open source projects, learning resources.',
      members: 'New Org',
      link: 'https://github.com/tech-mastery-lab',
      topics: ['Open Source', 'Learning Resources', 'Projects'],
      language: 'All Languages',
      active: true
    },
    {
      name: 'Indian Open Source',
      description: 'Indian open source projects and contributors.',
      members: '10,000+',
      link: 'https://github.com/indian-opensource',
      topics: ['Open Source', 'Indian Projects', 'Contributions'],
      language: 'All Languages',
      active: true
    }
  ],

  // FORUMS & WEBSITES
  forums: [
    {
      name: 'GeeksforGeeks Discuss',
      description: 'Coding problems, interview prep, tech discussions.',
      members: '1M+',
      link: 'https://www.geeksforgeeks.org/discuss',
      topics: ['Coding', 'Interview Prep', 'DSA'],
      language: 'English',
      active: true
    },
    {
      name: 'HackerRank Discussions',
      description: 'Competitive programming, coding challenges.',
      members: '500K+',
      link: 'https://www.hackerrank.com/discussions',
      topics: ['Competitive Programming', 'Challenges'],
      language: 'English',
      active: true
    },
    {
      name: 'Stack Overflow',
      description: 'Programming Q&A, debugging help.',
      members: '20M+',
      link: 'https://stackoverflow.com',
      topics: ['Programming', 'Debugging', 'Q&A'],
      language: 'English',
      active: true
    }
  ]
};

// Export for use in app
if (typeof window !== 'undefined') {
  window.communities = communities;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = communities;
}
