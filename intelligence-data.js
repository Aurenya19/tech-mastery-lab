// COMPLETE INTELLIGENCE DATABASE WITH DEEP DIVE DATA

const INTELLIGENCE_DATA = [
  {
    title: "XPENG VLA 2.0 - First Physical-AI for L4 Autonomous Driving",
    description: "Industry's first Visual-Language-Action model that directly generates driving commands from visual inputs. Enables L4 autonomous driving without traditional rule-based systems.",
    impact: "CRITICAL - Revolutionizes autonomous driving industry",
    source: "XPENG Official",
    date: "2026-01-12",
    category: "AI/Autonomous",
    url: "https://www.prnewswire.com/news-releases/xpeng-charts-new-course-in-2026-flagship-launch-sales-momentum-and-ai-breakthrough-propel-global-technology-ambitions-302658303.html",
    
    deepDive: {
      summary: "XPENG's VLA 2.0 is a 30-billion-parameter Vision-Language-Action AI model that represents a paradigm shift in autonomous driving. Unlike traditional systems that rely on rule-based programming, VLA 2.0 directly translates visual input to driving actions using a 'Vision-Implicit Token-Action' architecture. Trained on 100 million real driving video clips (equivalent to 65,000 years of human driving experience), it achieves L4 autonomy with deployment to customer vehicles planned for March 2026.",
      
      technical: [
        {
          title: "Architecture",
          detail: "30-billion-parameter model using Vision-Implicit Token-Action architecture. Bypasses traditional language translation bottleneck by directly converting visual input to actions using latent tokens, trajectory tokens, and world simulation."
        },
        {
          title: "Training Data",
          detail: "100 million real-world driving video clips from XPENG vehicles, covering diverse scenarios. Equivalent to 65,000 years of human driving experience. Includes synthetic long-tail edge cases for unusual situations."
        },
        {
          title: "Hardware",
          detail: "Runs on XPENG Turing AI chip (40-core processor). Ultra vehicle trims use three chips providing 2,250-3,000 TOPS of compute with redundancy. Mass production started Q2 2024, vehicle integration Q2 2025."
        },
        {
          title: "Performance",
          detail: "13-fold improvement on narrow roads including nighttime conditions. Proactive responses: anticipates traffic lights, recognizes hand gestures. FastDriveVLA optimization layer enables efficient on-device operation without cloud connectivity."
        }
      ],
      
      secrets: [
        {
          title: "Regulatory Approval Status UNKNOWN",
          detail: "No evidence of third-party validation or government regulatory sign-off as of late 2025. L4 capability claims based on internal demos only. No public safety testing data or crash statistics available."
        },
        {
          title: "Safety Redundancy Unclear",
          detail: "While hardware redundancy exists (triple chip setup), no explicit details on software failsafes, emergency protocols, or redundancy beyond hardware. Critical safety systems remain undisclosed."
        },
        {
          title: "Non-Ultra Configuration Limitations",
          detail: "XPENG has not clarified hardware requirements or capability limitations for non-Ultra vehicle configurations. Potential restrictions on lane changes and other features not publicly disclosed."
        },
        {
          title: "Volkswagen Partnership Details",
          detail: "VW announced as first launch customer, but specific deployment timeline, vehicle models, and integration details remain confidential. Scale of partnership undisclosed."
        }
      ],
      
      urgent: [
        {
          title: "Unverified L4 Claims",
          detail: "ACTION REQUIRED: Independent safety validation needed. No third-party certification or government approval confirmed. Real-world safety performance unproven."
        },
        {
          title: "March 2026 Customer Deployment",
          detail: "CRITICAL TIMELINE: Mass deployment to customer vehicles in 8 weeks without public regulatory approval. Potential safety risks if validation incomplete."
        },
        {
          title: "Competitive Pressure",
          detail: "MARKET IMPACT: Tesla, Waymo, Cruise facing disruption. Traditional automakers may accelerate risky deployments to compete. Industry-wide safety standards at risk."
        }
      ],
      
      proofs: [
        {
          type: "Official Press Release",
          detail: "XPENG official announcement on January 12, 2026 confirming VLA 2.0 launch and March 2026 deployment timeline.",
          url: "https://www.prnewswire.com/news-releases/xpeng-charts-new-course-in-2026-flagship-launch-sales-momentum-and-ai-breakthrough-propel-global-technology-ambitions-302658303.html"
        },
        {
          type: "Technical Analysis",
          detail: "Detailed breakdown of FastDriveVLA architecture and AI-led L4 autonomous driving system by CleanTechnica and Peking University collaboration.",
          url: "https://cleantechnica.com/2025/12/29/breakdown-of-the-fastdrivevla-ai-led-l4-autonomous-driving-from-xpeng-peking-university/"
        },
        {
          type: "Industry Coverage",
          detail: "ArenaEV comprehensive analysis confirming VW as first launch customer and Q1 2026 deployment to Ultra vehicles.",
          url: "https://www.arenaev.com/xpeng_launches_paradigmshift_vla_20_selfdriving_vw_to_adopt_it_first-news-5289.php"
        },
        {
          type: "Video Demonstration",
          detail: "Official demo showcasing narrow road performance and nighttime driving capabilities.",
          url: "https://www.youtube.com/watch?v=19xe90ut3lc"
        }
      ],
      
      timeline: [
        {
          date: "November 2025",
          event: "VLA 2.0 officially unveiled at XPENG AI Day"
        },
        {
          date: "December 2025",
          event: "Deployment to internal testers begins"
        },
        {
          date: "Q1 2026 (Current)",
          event: "Deployment to Ultra vehicle trims with full sensor/compute packages"
        },
        {
          date: "March 2026",
          event: "PLANNED: Over-the-air deployment to customer vehicles"
        },
        {
          date: "2026",
          event: "Robotaxi deployment and Land Aircraft Carrier (eVTOL) mass production"
        }
      ],
      
      implications: [
        "Eliminates traditional rule-based autonomous driving systems - paradigm shift in industry approach",
        "Enables true L4 autonomy for personal vehicles, not just controlled environments",
        "Threatens Tesla's FSD, Waymo's robotaxi dominance, and traditional automaker strategies",
        "Raises critical safety questions: unverified claims, no regulatory approval, rapid deployment timeline",
        "Chinese AI leadership in autonomous driving - geopolitical implications for US/EU tech dominance",
        "On-device processing (no cloud) solves latency and privacy concerns but raises update/monitoring questions",
        "100M video training dataset sets new standard - competitors must match or exceed data scale",
        "VW partnership validates technology but also spreads unproven system to Western markets"
      ],
      
      sources: [
        {
          name: "XPENG Official Press Release",
          url: "https://www.prnewswire.com/news-releases/xpeng-charts-new-course-in-2026-flagship-launch-sales-momentum-and-ai-breakthrough-propel-global-technology-ambitions-302658303.html"
        },
        {
          name: "CleanTechnica Technical Analysis",
          url: "https://cleantechnica.com/2025/12/29/breakdown-of-the-fastdrivevla-ai-led-l4-autonomous-driving-from-xpeng-peking-university/"
        },
        {
          name: "ArenaEV Industry Report",
          url: "https://www.arenaev.com/xpeng_launches_paradigmshift_vla_20_selfdriving_vw_to_adopt_it_first-news-5289.php"
        },
        {
          name: "Electrek Coverage",
          url: "https://electrek.co/2025/11/05/xpeng-ai-day-new-ai-model-powering-robots-robotaxis-and-flying-cars/"
        },
        {
          name: "Motor Trend Analysis",
          url: "https://www.motortrend.com/news/xpeng-ai-day-new-technology-robots-flying-cars"
        }
      ]
    }
  },
  
  {
    title: "NVIDIA Vera Rubin - H300 GPUs for Trillion-Parameter AI Models",
    description: "New AI foundry platform with H300 GPUs designed for trillion-parameter models. Announced at CES 2026. Full production later in 2026.",
    impact: "HIGH - Enables next-generation AI at unprecedented scale",
    source: "NVIDIA CES 2026",
    date: "2026-01-12",
    category: "AI Hardware",
    url: "https://www.crescendo.ai/news/latest-ai-news-and-updates",
    
    deepDive: {
      summary: "NVIDIA's Vera Rubin platform represents the next evolution in AI infrastructure, featuring H300 GPUs specifically designed to train and run trillion-parameter AI models. Named after astronomer Vera Rubin, this AI foundry platform was unveiled at CES 2026 and targets enterprises building next-generation AI systems. Full production is scheduled for later in 2026.",
      
      technical: [
        {
          title: "H300 GPU Architecture",
          detail: "Next-generation GPU designed for trillion-parameter model training and inference. Significant improvements over H100 in memory bandwidth, compute density, and power efficiency."
        },
        {
          title: "AI Foundry Platform",
          detail: "Complete infrastructure solution including hardware, software stack, and development tools for building custom AI models at unprecedented scale."
        },
        {
          title: "Target Applications",
          detail: "Designed for frontier AI models, multimodal systems, and enterprise-scale AI deployments requiring massive compute resources."
        }
      ],
      
      secrets: [
        {
          title: "Exact Specifications Undisclosed",
          detail: "NVIDIA has not released detailed technical specifications including TFLOPS, memory capacity, bandwidth, or power consumption figures."
        },
        {
          title: "Pricing Strategy Unknown",
          detail: "No pricing information available. Given H100 costs ($25,000-40,000), H300 likely significantly more expensive. Enterprise foundry platform costs could reach millions."
        }
      ],
      
      urgent: [
        {
          title: "AI Arms Race Acceleration",
          detail: "CRITICAL: Trillion-parameter models will widen gap between tech giants and smaller players. Concentration of AI power in few hands."
        },
        {
          title: "Energy Consumption Concerns",
          detail: "WARNING: Training trillion-parameter models requires massive energy. Environmental impact and sustainability questions unanswered."
        }
      ],
      
      proofs: [
        {
          type: "CES 2026 Announcement",
          detail: "Official NVIDIA announcement at Consumer Electronics Show 2026.",
          url: "https://www.crescendo.ai/news/latest-ai-news-and-updates"
        }
      ],
      
      timeline: [
        {
          date: "January 2026",
          event: "Vera Rubin platform unveiled at CES 2026"
        },
        {
          date: "Late 2026",
          event: "PLANNED: Full production and enterprise availability"
        }
      ],
      
      implications: [
        "Enables trillion-parameter models - 10x larger than current GPT-4 scale systems",
        "Widens AI capability gap between tech giants and smaller companies/researchers",
        "Accelerates AI development timeline - more powerful models arriving faster",
        "Raises concerns about AI safety, alignment, and control at unprecedented scale",
        "Energy consumption and environmental impact of training massive models",
        "Geopolitical implications - US maintaining AI hardware leadership over China"
      ],
      
      sources: [
        {
          name: "Crescendo AI News Coverage",
          url: "https://www.crescendo.ai/news/latest-ai-news-and-updates"
        }
      ]
    }
  },
  
  {
    title: "Boston Dynamics Atlas - Mass Production of Humanoid Robots",
    description: "Atlas humanoid robot enters mass production with capacity of 30,000 units/year. Deployments at Hyundai and Google DeepMind with Gemini Robotics AI integration.",
    impact: "HIGH - First mass-produced advanced humanoid robot",
    source: "Boston Dynamics",
    date: "2026-01-04",
    category: "Robotics",
    url: "https://amiko.consulting/en/the-january-2026-ai-revolution-7-key-trends-changing-the-future-of-manufacturing/",
    
    deepDive: {
      summary: "Boston Dynamics' Atlas humanoid robot has transitioned from research prototype to mass production, with manufacturing capacity of 30,000 units per year. The robot is being deployed at Hyundai manufacturing facilities and Google DeepMind for AI research, with Gemini Robotics AI integration enabling advanced autonomous capabilities. This marks the first time an advanced humanoid robot has reached commercial-scale production.",
      
      technical: [
        {
          title: "Production Capacity",
          detail: "30,000 units per year manufacturing capacity. Represents massive scale-up from prototype production."
        },
        {
          title: "AI Integration",
          detail: "Gemini Robotics AI from Google DeepMind provides advanced perception, planning, and manipulation capabilities. Enables autonomous operation in complex environments."
        },
        {
          title: "Deployment Sites",
          detail: "Hyundai manufacturing facilities for industrial applications. Google DeepMind for AI research and development."
        }
      ],
      
      secrets: [
        {
          title: "Pricing Not Disclosed",
          detail: "Per-unit cost unknown. Industrial robots typically $50,000-500,000. Atlas likely at premium end given advanced capabilities."
        },
        {
          title: "Full Capability Set Unknown",
          detail: "Specific tasks, payload capacity, battery life, and operational limitations not publicly detailed."
        }
      ],
      
      urgent: [
        {
          title: "Labor Displacement Concerns",
          detail: "CRITICAL: 30,000 humanoid robots/year could displace significant manufacturing workforce. Social and economic implications require policy response."
        },
        {
          title: "Safety Standards Needed",
          detail: "WARNING: No established safety standards for humanoid robots in industrial settings. Regulatory framework urgently needed."
        }
      ],
      
      proofs: [
        {
          type: "Industry Analysis",
          detail: "Comprehensive report on January 2026 AI revolution including Atlas production details.",
          url: "https://amiko.consulting/en/the-january-2026-ai-revolution-7-key-trends-changing-the-future-of-manufacturing/"
        }
      ],
      
      timeline: [
        {
          date: "January 4, 2026",
          event: "Mass production announcement and field test reports"
        },
        {
          date: "2026",
          event: "Ongoing deployments at Hyundai and Google DeepMind"
        }
      ],
      
      implications: [
        "First commercially viable humanoid robot at scale - industry milestone",
        "Manufacturing automation reaches new level - human-like dexterity and mobility",
        "Labor market disruption - potential displacement of manufacturing workers",
        "Safety and regulatory challenges - humanoid robots working alongside humans",
        "AI advancement - Gemini integration demonstrates practical robotics AI",
        "Competitive pressure - other robotics companies must accelerate development"
      ],
      
      sources: [
        {
          name: "Amiko Consulting Industry Report",
          url: "https://amiko.consulting/en/the-january-2026-ai-revolution-7-key-trends-changing-the-future-of-manufacturing/"
        }
      ]
    }
  }
];

// Export for use in main app
if (typeof window !== 'undefined') {
  window.INTELLIGENCE_DATA = INTELLIGENCE_DATA;
}