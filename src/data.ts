import { Product, Leader, Strength, Partner } from "./types";

export const COMPANY_PROFILE = {
  name: "Punitdhan Pulses Limited",
  shortName: "Punitdhan",
  formerly: "Prakash Agro Mills",
  foundedDate: "1st April, 1988 (as Prakash Agro Mills)",
  incorporatedDate: "31st March, 2025 (as Punitdhan Pulses Ltd)",
  constitution: "Public Limited Company",
  natureOfBusiness: "Manufacturing & trading of Pulses, Food Grain, Oil, Rice etc.",
  placeOfBusiness: "PAN INDIA",
  gstNumber: "24AAPCP6070K1ZZ",
  panNumber: "AAPCP6070K",
  fssaiMemco: "10725026000839",
  fssaiBavla: "10724001000022",
  isoCertificate: "IN/76122035/5941 (ISO 9001:2015)",
  haccpCertificate: "IN/48722036/1658 (HACCP Certified)",
  phoneNumbers: ["+91 70698 88113", "+91 70698 88112"],
  emails: ["punitdhan_pulses@yahoo.com", "punitdhan_pulses2025@yahoo.com"],
  
  registeredOffice: {
    line1: "Dal Mill Compound, Nr. Old Octroi Naka",
    line2: "Naroda Road, Nr. Memco Cross Road",
    line3: "Memco, Ahmedabad, Gujarat – 382345."
  },
  
  corporateOffice: {
    line1: "406 Neelgagan Plaza",
    line2: "Opposite Police Commissioner Office",
    line3: "Shahibaug, Ahmedabad - 380004."
  },
  
  millingUnits: [
    {
      id: "unit-1",
      name: "Milling Unit 1",
      description: "Near Omkar Textile Mill, Behind Narnarayan Weigh Bridge, Memco Char Rasta, Naroda Road, Ahmedabad - 382345"
    },
    {
      id: "unit-2",
      name: "Milling Unit 2 & Krishna Rice Mills",
      description: "Krishna Rice Mills Compound, Behind Baba Ramdevpir Mandir, Nr. Patel Kanta, Daran Road, Ahmedabad - 382220"
    }
  ]
};

export const STRENGTHS: Strength[] = [
  {
    id: "global-reach",
    title: "Global Sourcing & Reach",
    description: "We have cultivated a robust global network, ensuring seamless sourcing and premium quality distribution of agricultural pulses and grains.",
    iconName: "Globe",
    colorClass: "from-teal-950 to-teal-900 border-teal-500/20 text-teal-400"
  },
  {
    id: "state-of-art",
    title: "State of the Art Facilities",
    description: "Our modern processing plants employ cutting-edge milling and filtering technologies to maintain the highest hygiene and purity standards.",
    iconName: "Cpu",
    colorClass: "from-amber-950 to-amber-900 border-amber-500/20 text-amber-400"
  },
  {
    id: "sustainability",
    title: "Sustainable Practices",
    description: "We prioritize eco-friendly farming methodologies and ethical, transparent sourcing to safeguard the environment and enrich local bio-networks.",
    iconName: "Leaf",
    colorClass: "from-emerald-950 to-emerald-900 border-emerald-500/20 text-emerald-400"
  },
  {
    id: "empowering-farmers",
    title: "Empowering Local Farmers",
    description: "Direct collaboration with growers and farmer cooperatives ensures equitable pricing, transparency, and the propagation of sustainable agriculture.",
    iconName: "Users",
    colorClass: "from-purple-950 to-purple-900 border-purple-500/20 text-purple-400"
  },
  {
    id: "economic-growth",
    title: "Driving Economic Growth",
    description: "Our scalable operations stimulate rural economies, creating dependable direct employment opportunities and industrial infrastructure.",
    iconName: "TrendingUp",
    colorClass: "from-blue-950 to-blue-900 border-blue-500/20 text-blue-400"
  },
  {
    id: "nourishing-communities",
    title: "Nourishing Communities",
    description: "By producing high-quality, protein-rich, and affordable food staples, we play an active role in strengthening nutritional security for millions.",
    iconName: "Heart",
    colorClass: "from-red-950 to-red-900 border-red-500/20 text-red-400"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "chana-dal",
    name: "Chana Dal",
    hindiName: "चना दाल",
    type: "pulses",
    description: "Premium polish-free Split Bengal Gram, rich in protein, low in glycemic index, and sourced directly from finest crop fields.",
    nutrients: ["High Fiber", "Rich in Iron", "Folate Heavy", "Low Fat"],
    imagePlaceholder: "Bright golden yellow polished split gram pulses in organic presentation.",
    iconName: "Sparkles"
  },
  {
    id: "toor-dal",
    name: "Toor Dal (Arhar)",
    hindiName: "तूर दाल",
    type: "pulses",
    description: "Pigeon peas, a vital element of Indian kitchens. Sourced and processed with state-of-the-art dehusking technology for natural taste.",
    nutrients: ["Plant Protein", "Dietary Fiber", "Vitamin B Complex", "Calcium"],
    imagePlaceholder: "Rich matte-yellow whole split pigeon peas.",
    iconName: "Wheat"
  },
  {
    id: "urad-whole",
    name: "Urad Whole",
    hindiName: "उड़द साबुत",
    type: "pulses",
    description: "Whole black gram, robust and filled with minerals. Perfect for preparing creamy dhal makhani with authentic texture.",
    nutrients: ["Energy Booster", "Strengthens Bones", "Digestive Friendly", "High Magnesium"],
    imagePlaceholder: "Jet-black shiny whole gram with miniature ivory details.",
    iconName: "Award"
  },
  {
    id: "urad-dal",
    name: "Urad Dal (Split & Washed)",
    hindiName: "उड़द दाल (धुली)",
    type: "pulses",
    description: "Washed and split creamy-white urad dal, perfect for south Indian delicacies like Idlis and Vadas.",
    nutrients: ["High Protein", "Rich in Potassium", "Gut-Health Friendly", "Low Cholesterol"],
    imagePlaceholder: "Pearl-white split urad dal with minimal moisture.",
    iconName: "CheckCircle"
  },
  {
    id: "masoor-dal",
    name: "Masoor Dal (Red Split)",
    hindiName: "मसूर दाल",
    type: "pulses",
    description: "Split red lentils processed under optimal temperature settings to retain essential amino acids and quick-cook attributes.",
    nutrients: ["High Protein", "Heart Health", "Anti-Oxidants", "Low Calorie"],
    imagePlaceholder: "Vibrant sunset-orange/red split lentils beautifully styled.",
    iconName: "HeartHandshake"
  },
  {
    id: "chana-whole",
    name: "Chana Whole (Brown Chickpeas)",
    hindiName: "काला चना",
    type: "pulses",
    description: "Hardy brown chickpeas ideal for traditional curries and high-protein salad sprouts. Saturated with dietary iron.",
    nutrients: ["Extremely High Iron", "Muscle Growth", "Sustained Energy", "Zero trans-fat"],
    imagePlaceholder: "Earth-brown healthy crinkly whole chickpeas.",
    iconName: "Zap"
  },
  {
    id: "moong-dal",
    name: "Moong Dal (Washed Split)",
    hindiName: "मूंग दाल",
    type: "pulses",
    description: "Light and easily digestible yellow split mung beans, highly recommended for health diets and premium culinary applications.",
    nutrients: ["Easiest Digestibility", "Metabolism Boost", "Rich in Zinc", "Vitamin C & A"],
    imagePlaceholder: "Bright lemon yellow soft split mung beans.",
    iconName: "ShieldCheck"
  }
];

export const LEADERS: Leader[] = [
  {
    id: "prakashchand",
    name: "CA Prakashchand Bachhawat",
    title: "Visionary Founder & Managing Director",
    role: "Visionary founder of Punitdhan Pulses Ltd (formerly Prakash Agro Mills), CA Prakashchand Bachhawat is a seasoned entrepreneur with a deep passion for the food industry. With over 38 years of experience, he has been instrumental in shaping the company’s growth and institutional success.",
    description: [
      "A skilled financial expert and enthusiast, his keen insights and strategic thinking have been the driving force behind the company’s numerous achievements. His commitment to quality, innovation, and customer satisfaction has earned him a reputation as a respected leader in the industry.",
      "In 1985, he spearheaded the installation of India’s largest pulse mill project in Modasa, Gujarat—a landmark achievement that solidified the company’s position as a major player in the food processing sector.",
      "His unwavering dedication to excellence continues to inspire the entire team at Punitdhan Pulses Ltd. His legacy is etched in the company’s history as we step into an era of rapid expansion."
    ],
    avatarColor: "from-amber-700 via-emerald-805 to-emerald-950",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "punit",
    name: "CA Punit Bachhawat",
    title: "Director & CFO",
    role: "CA Punit Bachhawat son of CA Prakashchand Bachhawat, serves as a Director and the Chief Financial Officer (CFO) of Punitdhan Pulses Ltd. He is a distinguished financial leader with a proven track record of driving institutional growth and profitability. With a deep understanding of the global agribusiness sector, he brings strategic vision and a wealth of expertise to the Board.",
    description: [
      "As a Director and CFO, he is responsible for overseeing the company’s entire financial ecosystem, including strategic financial planning, corporate accounting, tax compliance, and treasury functions.",
      "He has been instrumental in developing and implementing the financial frameworks that align with the company's long-term goals as a public limited entity.",
      "He is a strong advocate for operational excellence and cost efficiency. Through data-driven insights and innovative financial strategies, he has contributed significantly to the company’s growth and profitability."
    ],
    avatarColor: "from-blue-700 via-emerald-850 to-emerald-950",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "chika",
    name: "Mrs. Chika Bachhawat",
    title: "Partner & Director",
    role: "A core partner of Punitdhan Pulses Ltd, Mrs. Chika Bachhawat jointly handles business activities running throughout the country and ensures high corporate governance standards.",
    description: [
      "She is listed as a central Partner and Director of the company, with business activities run throughout the country from the registered office in Ahmedabad.",
      "Her presence on the board helps guide corporate values, bringing ethical counsel and community focus to the business operations."
    ],
    avatarColor: "from-teal-700 via-emerald-850 to-emerald-950",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "dhanashree",
    name: "CA Dhanashree Bachhawat",
    title: "Head of Human Resources",
    role: "A dynamic and creative leader, CA Dhanashree Bachhawat has played a pivotal role in shaping Punitdhan Pulses Ltd into a people-centric organization. With a deep passion for human capital management and a keen eye for talent, she has been instrumental in building the high-performing team that drives the company’s success.",
    description: [
      "As the Head of Human Resources, CA Dhanashree oversees a wide range of HR functions, including talent acquisition, employee development, performance management, and organizational culture.",
      "She is committed to creating a positive, inclusive, and professional work environment where employees feel valued and empowered to achieve the company’s grand vision."
    ],
    avatarColor: "from-purple-700 via-teal-850 to-emerald-950",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
  }
];

export const WELFARE_PARTNERS = [
  { name: "Civil Supplies Corporation of India", category: "National Procurement" },
  { name: "NAFED (National Agricultural Cooperative Marketing Federation)", category: "National Marketing & Sourcing" },
  { name: "MP State Agro Industries Development Corporation Ltd.", category: "State Procurement" },
  { name: "NACOF (National Federation of Farmers Procurement, Processing & Retailing Co-operatives)", category: "Farmer Cooperative Network" },
  { name: "Department of Defense (India)", category: "Strategic Defence Supplies" }
];

export const WELFARE_SCHEMES = [
  {
    id: "mid-day",
    title: "Mid-Day Meal Programme",
    desc: "Feeding millions of children across public schools with premium protein-dense pulses to fight youth malnutrition."
  },
  {
    id: "pds",
    title: "Public Distribution Scheme (PDS)",
    desc: "Ensuring stable, high-quality pulse distribution to low-income segments at subsidized rates via national fair-price chains."
  },
  {
    id: "icds",
    title: "ICDS (Integrated Child Development Services)",
    desc: "Delivering essential nutrition staples to pregnant women, infants, and primary healthcare centers."
  },
  {
    id: "pmgkay",
    title: "PMGKAY (Pradhan Mantri Garib Kalyan Anna Yojana)",
    desc: "Proud participants in supplying staple grains and pulses during national supply chain disruptions."
  },
  {
    id: "bharat-dal",
    title: "Bharat Dal Yojana",
    desc: "Active processing partner of the Government of India's highly praised initiative to supply affordable, top-quality chana dal."
  }
];

export const KEY_ACHIEVEMENTS = [
  { value: "38+", label: "Years of Heritage" },
  { value: "400+ MT", label: "Daily Processing Capacity", sub: "Started from 30 MT" },
  { value: "25,000+ MT", label: "Annual Volume of Pulses" },
  { value: "2,000+", label: "Lorries Dispatched Annually" },
  { value: "100%", label: "Traceable Local Sourcing" },
  { value: "70+", label: "Highly Diligent Employees" }
];
