// 🇮🇳 REAL INDIAN TECH LABS & RESEARCH CENTERS - 50+ LOCATIONS
const indianLabs = [
  // ISRO CENTERS (10)
  {
    name: 'ISRO Headquarters',
    location: 'Bangalore, Karnataka',
    lat: 12.9634, lon: 77.6401,
    type: 'government',
    description: 'Indian Space Research Organisation HQ. Manages Chandrayaan, Mangalyaan, Gaganyaan missions.',
    website: 'https://www.isro.gov.in',
    howToJoin: 'ICRB exam, BTech/MTech from recognized universities'
  },
  {
    name: 'Satish Dhawan Space Centre',
    location: 'Sriharikota, Andhra Pradesh',
    lat: 13.7199, lon: 80.2304,
    type: 'government',
    description: 'India\'s primary spaceport. Launch site for PSLV, GSLV rockets.',
    website: 'https://www.isro.gov.in/SDSC.html'
  },
  {
    name: 'ISRO Satellite Centre (ISAC)',
    location: 'Bangalore, Karnataka',
    lat: 13.0210, lon: 77.5707,
    type: 'government',
    description: 'Designs satellites for communication, earth observation, navigation.',
    website: 'https://www.isac.gov.in'
  },
  {
    name: 'Vikram Sarabhai Space Centre',
    location: 'Thiruvananthapuram, Kerala',
    lat: 8.5241, lon: 76.9366,
    type: 'government',
    description: 'Develops launch vehicles and rocket propulsion systems.',
    website: 'https://www.vssc.gov.in'
  },
  {
    name: 'Space Applications Centre',
    location: 'Ahmedabad, Gujarat',
    lat: 23.0225, lon: 72.5714,
    type: 'government',
    description: 'Develops satellite payloads and ground systems.',
    website: 'https://www.sac.gov.in'
  },
  {
    name: 'National Remote Sensing Centre',
    location: 'Hyderabad, Telangana',
    lat: 17.4239, lon: 78.5562,
    type: 'government',
    description: 'Manages remote sensing satellite data and applications.',
    website: 'https://www.nrsc.gov.in'
  },
  {
    name: 'ISRO Propulsion Complex',
    location: 'Mahendragiri, Tamil Nadu',
    lat: 8.3833, lon: 77.5167,
    type: 'government',
    description: 'Tests rocket engines and propulsion systems.',
    website: 'https://www.isro.gov.in'
  },
  {
    name: 'ISRO Telemetry Tracking Command Network',
    location: 'Bangalore, Karnataka',
    lat: 12.9716, lon: 77.5946,
    type: 'government',
    description: 'Tracks and commands satellites and launch vehicles.',
    website: 'https://www.istrac.gov.in'
  },
  {
    name: 'Laboratory for Electro-Optics Systems',
    location: 'Bangalore, Karnataka',
    lat: 13.0827, lon: 77.5877,
    type: 'government',
    description: 'Develops electro-optical sensors for satellites.',
    website: 'https://www.leos.gov.in'
  },
  {
    name: 'ISRO Inertial Systems Unit',
    location: 'Thiruvananthapuram, Kerala',
    lat: 8.5074, lon: 76.9490,
    type: 'government',
    description: 'Develops navigation and guidance systems.',
    website: 'https://www.iisu.gov.in'
  },

  // DRDO LABS (8)
  {
    name: 'DRDO Headquarters',
    location: 'New Delhi',
    lat: 28.6139, lon: 77.2090,
    type: 'government',
    description: 'Defence R&D Organisation. Develops Agni missiles, BrahMos, Tejas fighter.',
    website: 'https://www.drdo.gov.in',
    howToJoin: 'DRDO CEPTAM, Scientist Entry Test, BTech/MTech/PhD'
  },
  {
    name: 'Aeronautical Development Agency',
    location: 'Bangalore, Karnataka',
    lat: 12.9499, lon: 77.6821,
    type: 'government',
    description: 'Designs combat aircraft. Developed Tejas Light Combat Aircraft.',
    website: 'https://ada.gov.in'
  },
  {
    name: 'Defence Research & Development Laboratory',
    location: 'Hyderabad, Telangana',
    lat: 17.4239, lon: 78.5562,
    type: 'government',
    description: 'Develops missiles - Agni, Prithvi, Akash systems.',
    website: 'https://www.drdo.gov.in/drdl'
  },
  {
    name: 'Terminal Ballistics Research Laboratory',
    location: 'Chandigarh',
    lat: 30.7333, lon: 76.7794,
    type: 'government',
    description: 'Develops ammunition, warheads, and explosives.',
    website: 'https://www.drdo.gov.in/tbrl'
  },
  {
    name: 'Centre for Airborne Systems',
    location: 'Bangalore, Karnataka',
    lat: 13.0827, lon: 77.5877,
    type: 'government',
    description: 'Develops airborne early warning and control systems.',
    website: 'https://www.drdo.gov.in/cabs'
  },
  {
    name: 'Electronics and Radar Development Establishment',
    location: 'Bangalore, Karnataka',
    lat: 13.0210, lon: 77.6401,
    type: 'government',
    description: 'Develops radar systems for defense applications.',
    website: 'https://www.drdo.gov.in/lrde'
  },
  {
    name: 'Defence Metallurgical Research Laboratory',
    location: 'Hyderabad, Telangana',
    lat: 17.4435, lon: 78.3772,
    type: 'government',
    description: 'Develops advanced materials for defense.',
    website: 'https://www.drdo.gov.in/dmrl'
  },
  {
    name: 'Naval Science & Technological Laboratory',
    location: 'Visakhapatnam, Andhra Pradesh',
    lat: 17.6868, lon: 83.2185,
    type: 'government',
    description: 'Develops naval systems and underwater technologies.',
    website: 'https://www.drdo.gov.in/nstl'
  },

  // IIT LABS (7)
  {
    name: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    lat: 19.1334, lon: 72.9133,
    type: 'academic',
    description: 'Premier engineering institute. Research in AI, robotics, nanotech.',
    website: 'https://www.iitb.ac.in',
    howToJoin: 'JEE Advanced for BTech, GATE for MTech/PhD'
  },
  {
    name: 'IIT Delhi',
    location: 'New Delhi',
    lat: 28.5449, lon: 77.1926,
    type: 'academic',
    description: 'Leading research in AI, quantum computing, renewable energy.',
    website: 'https://www.iitd.ac.in',
    howToJoin: 'JEE Advanced for BTech, GATE for MTech/PhD'
  },
  {
    name: 'IIT Madras',
    location: 'Chennai, Tamil Nadu',
    lat: 12.9916, lon: 80.2336,
    type: 'academic',
    description: 'Developed Shakti microprocessor. Research in AI, IoT, space tech.',
    website: 'https://www.iitm.ac.in',
    howToJoin: 'JEE Advanced for BTech, GATE for MTech/PhD'
  },
  {
    name: 'IIT Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    lat: 26.5123, lon: 80.2329,
    type: 'academic',
    description: 'Research in aerospace, AI, materials science.',
    website: 'https://www.iitk.ac.in',
    howToJoin: 'JEE Advanced for BTech, GATE for MTech/PhD'
  },
  {
    name: 'IIT Kharagpur',
    location: 'Kharagpur, West Bengal',
    lat: 22.3149, lon: 87.3105,
    type: 'academic',
    description: 'Oldest IIT. Research in robotics, AI, advanced manufacturing.',
    website: 'https://www.iitkgp.ac.in',
    howToJoin: 'JEE Advanced for BTech, GATE for MTech/PhD'
  },
  {
    name: 'IIT Roorkee',
    location: 'Roorkee, Uttarakhand',
    lat: 29.8543, lon: 77.8880,
    type: 'academic',
    description: 'Research in earthquake engineering, water resources, AI.',
    website: 'https://www.iitr.ac.in',
    howToJoin: 'JEE Advanced for BTech, GATE for MTech/PhD'
  },
  {
    name: 'IIT Guwahati',
    location: 'Guwahati, Assam',
    lat: 26.1445, lon: 91.7362,
    type: 'academic',
    description: 'Research in biotechnology, nanotechnology, AI.',
    website: 'https://www.iitg.ac.in',
    howToJoin: 'JEE Advanced for BTech, GATE for MTech/PhD'
  },

  // CSIR LABS (5)
  {
    name: 'CSIR Headquarters',
    location: 'New Delhi',
    lat: 28.6358, lon: 77.2245,
    type: 'government',
    description: 'Council of Scientific & Industrial Research. 37 labs across India.',
    website: 'https://www.csir.res.in',
    howToJoin: 'CSIR NET exam, BTech/MTech/PhD'
  },
  {
    name: 'National Chemical Laboratory',
    location: 'Pune, Maharashtra',
    lat: 18.5204, lon: 73.8567,
    type: 'government',
    description: 'Research in chemistry, materials science, catalysis.',
    website: 'https://www.ncl-india.org'
  },
  {
    name: 'Central Electronics Engineering Research Institute',
    location: 'Pilani, Rajasthan',
    lat: 28.3670, lon: 75.6032,
    type: 'government',
    description: 'Develops electronics and instrumentation systems.',
    website: 'https://www.ceeri.res.in'
  },
  {
    name: 'National Aerospace Laboratories',
    location: 'Bangalore, Karnataka',
    lat: 12.9941, lon: 77.6097,
    type: 'government',
    description: 'Aerospace research and development.',
    website: 'https://www.nal.res.in'
  },
  {
    name: 'Centre for Cellular and Molecular Biology',
    location: 'Hyderabad, Telangana',
    lat: 17.4435, lon: 78.3772,
    type: 'government',
    description: 'Research in genomics, cell biology, biotechnology.',
    website: 'https://www.ccmb.res.in'
  },

  // PRIVATE SECTOR (10)
  {
    name: 'Tata Consultancy Services Innovation Labs',
    location: 'Pune, Maharashtra',
    lat: 18.5204, lon: 73.8567,
    type: 'private',
    description: 'AI, blockchain, quantum computing research.',
    website: 'https://www.tcs.com',
    howToJoin: 'Campus placements, TCS NQT exam, experienced hiring'
  },
  {
    name: 'Infosys Innovation Hub',
    location: 'Bangalore, Karnataka',
    lat: 12.9716, lon: 77.5946,
    type: 'private',
    description: 'AI, automation, cloud computing research.',
    website: 'https://www.infosys.com',
    howToJoin: 'Campus placements, InfyTQ, experienced hiring'
  },
  {
    name: 'Wipro HOLMES AI Lab',
    location: 'Bangalore, Karnataka',
    lat: 12.9634, lon: 77.6401,
    type: 'private',
    description: 'AI and automation platform development.',
    website: 'https://www.wipro.com',
    howToJoin: 'Campus placements, WILP program, experienced hiring'
  },
  {
    name: 'Reliance Jio AI Center',
    location: 'Navi Mumbai, Maharashtra',
    lat: 19.0330, lon: 73.0297,
    type: 'private',
    description: 'AI, 5G, IoT research and development.',
    website: 'https://www.jio.com',
    howToJoin: 'Campus placements, direct applications'
  },
  {
    name: 'Mahindra Research Valley',
    location: 'Chennai, Tamil Nadu',
    lat: 12.8406, lon: 80.0534,
    type: 'private',
    description: 'Automotive, aerospace, robotics research.',
    website: 'https://www.mahindra.com',
    howToJoin: 'Campus placements, experienced hiring'
  },
  {
    name: 'Tata Motors Engineering Research Centre',
    location: 'Pune, Maharashtra',
    lat: 18.5793, lon: 73.7389,
    type: 'private',
    description: 'Electric vehicles, autonomous driving research.',
    website: 'https://www.tatamotors.com',
    howToJoin: 'Campus placements, experienced hiring'
  },
  {
    name: 'Larsen & Toubro Technology Centre',
    location: 'Mumbai, Maharashtra',
    lat: 19.0760, lon: 72.8777,
    type: 'private',
    description: 'Engineering, construction, defense technology.',
    website: 'https://www.larsentoubro.com',
    howToJoin: 'Campus placements, GATE score, experienced hiring'
  },
  {
    name: 'Bharat Electronics Limited R&D',
    location: 'Bangalore, Karnataka',
    lat: 13.0210, lon: 77.6401,
    type: 'private',
    description: 'Defense electronics, radar systems, avionics.',
    website: 'https://www.bel-india.in',
    howToJoin: 'GATE score, campus placements'
  },
  {
    name: 'Hindustan Aeronautics Limited',
    location: 'Bangalore, Karnataka',
    lat: 12.9499, lon: 77.6821,
    type: 'private',
    description: 'Aircraft manufacturing, aerospace research.',
    website: 'https://www.hal-india.co.in',
    howToJoin: 'GATE score, campus placements'
  },
  {
    name: 'Godrej Aerospace',
    location: 'Mumbai, Maharashtra',
    lat: 19.0760, lon: 72.8777,
    type: 'private',
    description: 'Rocket motors, satellite components.',
    website: 'https://www.godrejaerospace.com',
    howToJoin: 'Campus placements, experienced hiring'
  },

  // STARTUPS (10)
  {
    name: 'Agnikul Cosmos',
    location: 'Chennai, Tamil Nadu',
    lat: 13.0067, lon: 80.2206,
    type: 'startup',
    description: 'Private space launch company. 3D-printed rocket engines.',
    website: 'https://www.agnikul.in',
    howToJoin: 'Direct applications, internships'
  },
  {
    name: 'Skyroot Aerospace',
    location: 'Hyderabad, Telangana',
    lat: 17.3850, lon: 78.4867,
    type: 'startup',
    description: 'Private space launch vehicles. Vikram series rockets.',
    website: 'https://www.skyroot.in',
    howToJoin: 'Direct applications, internships'
  },
  {
    name: 'Pixxel',
    location: 'Bangalore, Karnataka',
    lat: 12.9716, lon: 77.5946,
    type: 'startup',
    description: 'Hyperspectral satellite imaging startup.',
    website: 'https://www.pixxel.space',
    howToJoin: 'Direct applications, internships'
  },
  {
    name: 'Bellatrix Aerospace',
    location: 'Bangalore, Karnataka',
    lat: 12.9634, lon: 77.6401,
    type: 'startup',
    description: 'Satellite propulsion systems and orbital transfer vehicles.',
    website: 'https://www.bellatrixaerospace.com',
    howToJoin: 'Direct applications, internships'
  },
  {
    name: 'Dhruva Space',
    location: 'Hyderabad, Telangana',
    lat: 17.4435, lon: 78.3772,
    type: 'startup',
    description: 'Satellite deployers and space infrastructure.',
    website: 'https://www.dhruvaspace.com',
    howToJoin: 'Direct applications, internships'
  },
  {
    name: 'Satsure',
    location: 'Bangalore, Karnataka',
    lat: 12.9716, lon: 77.5946,
    type: 'startup',
    description: 'Satellite data analytics for agriculture and infrastructure.',
    website: 'https://www.satsure.co',
    howToJoin: 'Direct applications, internships'
  },
  {
    name: 'Kawa Space',
    location: 'Bangalore, Karnataka',
    lat: 12.9634, lon: 77.6401,
    type: 'startup',
    description: 'Satellite communication and IoT solutions.',
    website: 'https://www.kawaspace.com',
    howToJoin: 'Direct applications, internships'
  },
  {
    name: 'Astrome Technologies',
    location: 'Bangalore, Karnataka',
    lat: 12.9716, lon: 77.5946,
    type: 'startup',
    description: 'Satellite broadband and millimeter-wave technology.',
    website: 'https://www.astrome.com',
    howToJoin: 'Direct applications, internships'
  },
  {
    name: 'Manastu Space',
    location: 'Hyderabad, Telangana',
    lat: 17.4435, lon: 78.3772,
    type: 'startup',
    description: 'Inflatable space habitats and structures.',
    website: 'https://www.manastuspace.com',
    howToJoin: 'Direct applications, internships'
  },
  {
    name: 'Digantara',
    location: 'Bangalore, Karnataka',
    lat: 12.9634, lon: 77.6401,
    type: 'startup',
    description: 'Space situational awareness and debris tracking.',
    website: 'https://www.digantara.com',
    howToJoin: 'Direct applications, internships'
  }
];

// Export for use in app
if (typeof window !== 'undefined') {
  window.indianLabs = indianLabs;
}

// Also export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = indianLabs;
}
