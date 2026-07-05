import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';
import { Inquiry, RepairRequest, Technician, Testimonial, ServiceCategory, User } from '../src/types';

const DATABASE_URL = process.env.DATABASE_URL;
let pgPool: Pool | null = null;

if (DATABASE_URL) {
  console.log('Detected DATABASE_URL. Initializing PostgreSQL pool...');
  pgPool = new Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('neon') ? { rejectUnauthorized: false } : false
  });
}

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const INQUIRIES_PATH = path.join(DATA_DIR, 'inquiries.json');
const REPAIR_REQUESTS_PATH = path.join(DATA_DIR, 'repair_requests.json');
const TECHNICIANS_PATH = path.join(DATA_DIR, 'technicians.json');
const TESTIMONIALS_PATH = path.join(DATA_DIR, 'testimonials.json');
const SERVICES_PATH = path.join(DATA_DIR, 'services.json');
const USERS_PATH = path.join(DATA_DIR, 'users.json');
const SESSIONS_PATH = path.join(DATA_DIR, 'sessions.json');

// Initialize helper
function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data) as T;
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return defaultValue;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

// SEED DATA DECLARATIONS

const SEED_SERVICES: ServiceCategory[] = [
  {
    title: "Laptop Repair",
    slug: "laptop-repair",
    description: "Comprehensive diagnostics and hardware/software repair services for all laptop brands including Dell, HP, Lenovo, and Asus.",
    icon: "Laptop",
    featuredImage: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Best Laptop Repair Services in Delhi NCR | Doorstep Laptop Repair",
    seoDescription: "Get premium, certified laptop repair services in Delhi, Noida, and Gurugram. Fast diagnostics, chip-level repairs, and genuine spare parts with warranty.",
    highlights: ["Motherboard chip-level repairs", "Overheating issues & fan repair", "Hinge & body replacement", "No-power & charging port fix"],
    pricing: "Starts from ₹499"
  },
  {
    title: "MacBook Repair",
    slug: "macbook-repair",
    description: "Expert MacBook repair by certified technicians. Specialist in logical board repair, battery, screen, and keyboard replacements.",
    icon: "Apple",
    featuredImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Premium MacBook Repair Delhi NCR | Certified Apple Repair Experts",
    seoDescription: "Professional Apple MacBook Air and MacBook Pro repairs in Delhi, Gurugram & Noida. Liquid damage recovery, screen replacement, and logical board diagnostics.",
    highlights: ["Logic Board micro-soldering", "Retina display screen replacement", "Trackpad and keyboard repair", "macOS corruption troubleshooting"],
    pricing: "Starts from ₹999"
  },
  {
    title: "Mobile Repair",
    slug: "mobile-repair",
    description: "Premium smartphone repairs for iPhones, Samsung, OnePlus, and other premium brands with genuine components.",
    icon: "Smartphone",
    featuredImage: "https://images.unsplash.com/photo-1581090464762-647bf575c322?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Professional Mobile & iPhone Repair Near Me | Delhi NCR",
    seoDescription: "Quick, same-day mobile phone repair services in Delhi NCR. Specializing in iPhone screen repair, battery swaps, and water damage restorations.",
    highlights: ["Glass & display screen replacement", "Battery degradation replacement", "Charging port & speaker repair", "Water and liquid ingress treatment"],
    pricing: "Starts from ₹299"
  },
  {
    title: "Tablet Repair",
    slug: "tablet-repair",
    description: "Repairs for iPad, Samsung Galaxy Tab, and other tablets. Touch screen replacements, battery issues, and charging faults fixed.",
    icon: "Tablet",
    featuredImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60",
    seoTitle: "iPad & Tablet Repair Services Delhi NCR | LapyZone",
    seoDescription: "Affordable iPad and Android tablet repairs in Delhi NCR. Screen replacement, battery repair, and charging port fixes with 90 days warranty.",
    highlights: ["iPad Digitizer & LCD swaps", "Charging IC diagnostics", "Battery degradation fixes", "Power/Volume button repairs"],
    pricing: "Starts from ₹599"
  },
  {
    title: "SSD Upgrade",
    slug: "ssd-upgrade",
    description: "Boost your system speed up to 10x with a premium NVMe or SATA solid-state drive upgrade. Fast cloning and OS transfer included.",
    icon: "Cpu",
    featuredImage: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Superfast SSD Upgrade Services for Laptops & PCs Delhi NCR",
    seoDescription: "Speed up your slow laptop with LapyZone SSD upgrade. High-speed NVMe & SATA SSDs with standard manufacturer warranties. Data cloning included.",
    highlights: ["NVMe/SATA premium SSD drives", "Full OS & file data migration", "Immediate 10x boot speed boost", "Thermal paste re-application"],
    pricing: "Starts from ₹1,899"
  },
  {
    title: "RAM Upgrade",
    slug: "ram-upgrade",
    description: "Eliminate system lag and handle heavy multitasking by upgrading your DDR3, DDR4, or DDR5 system RAM with certified modules.",
    icon: "Database",
    featuredImage: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Laptop & Desktop RAM Upgrade | Delhi Noida Gurugram",
    seoDescription: "Increase performance and gaming capacity. High-quality DDR4/DDR5 dual-channel upgrades with warranty and on-site testing.",
    highlights: ["Original Samsung, Kingston & Crucial RAM", "Dual-channel memory tuning", "Gaming and editing lag elimination", "Compatible module diagnostics"],
    pricing: "Starts from ₹999"
  },
  {
    title: "Battery Replacement",
    slug: "battery-replacement",
    description: "Replace swelling or fast-draining batteries with 100% original OEM equivalents. Secure recycling of old batteries included.",
    icon: "BatteryCharging",
    featuredImage: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Genuine Laptop & Mobile Battery Replacement Delhi NCR",
    seoDescription: "Get authentic replacement batteries for Dell, HP, Lenovo, MacBook, and iPhones in Delhi NCR. Premium grade-A cells with 1-year replacement warranty.",
    highlights: ["OEM certified high-capacity cells", "Up to 12 months comprehensive warranty", "Safe disposal of hazardous old battery", "Power-cycle efficiency calibrations"],
    pricing: "Starts from ₹1,200"
  },
  {
    title: "Screen Replacement",
    slug: "screen-replacement",
    description: "Flickering, broken, or vertical lined screens replaced with premium IPS panels. Anti-glare and high refresh rate options available.",
    icon: "Tv",
    featuredImage: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Laptop Screen Replacement Delhi NCR | Same-day Display Fix",
    seoDescription: "Broken laptop screen? Get a same-day replacement with original displays. HD, FHD, and 4K IPS panels available for all laptop brands.",
    highlights: ["Original A+ Grade displays", "FHD, UHD, & IPS screen upgrades", "Dead pixel and color accuracy test", "Anti-glare display panel option"],
    pricing: "Starts from ₹2,200"
  },
  {
    title: "Keyboard Repair",
    slug: "keyboard-repair",
    description: "Fix sticky, missing, or malfunctioning keys. Complete keyboard assembly replacements for chiclet and mechanical layouts.",
    icon: "Keyboard",
    featuredImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Laptop Keyboard Replacement and Repair | Delhi NCR",
    seoDescription: "Resolve missing keys, liquid spills, and non-working keyboard assemblies. Backlit and standard laptop keyboard replacement with warranty.",
    highlights: ["Complete keyboard plate swap", "Backlight module integration", "Individual key component repair", "Spill damage residue cleaning"],
    pricing: "Starts from ₹750"
  },
  {
    title: "Motherboard Repair",
    slug: "motherboard-repair",
    description: "Advanced chip-level micro-soldering. Repair logic board shorts, BIOS issues, IC failures, and liquid damage corroded tracks.",
    icon: "ShieldAlert",
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Chip-level Motherboard Repair Experts Delhi | LapyZone",
    seoDescription: "Advanced motherboard repairs for MacBooks and standard laptops. Fixing no-power, charging shorts, and BIOS loops using high-precision microscopes.",
    highlights: ["SMD and BGA chip reballing", "Short-circuit trace diagnostics", "BIOS firmware chip reprogramming", "DC power-jack micro soldering"],
    pricing: "Starts from ₹1,500"
  },
  {
    title: "Data Recovery",
    slug: "data-recovery",
    description: "Retrieve critical lost documents, photos, and corporate data from physically crashed HDDs, faulty SSDs, or corrupted USB drives.",
    icon: "HardDrive",
    featuredImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Professional Hard Drive & SSD Data Recovery Delhi NCR",
    seoDescription: "Accidental deletion or hard drive crash? Get complete data recovery. Secure cleanroom recovery for corrupt SSDs, external disks, and corporate servers.",
    highlights: ["Logical and physical file recovery", "Crashed HDD platters treatment", "Dead SSD memory controller extraction", "100% data confidentiality assurance"],
    pricing: "Starts from ₹1,999"
  },
  {
    title: "Deep Cleaning",
    slug: "deep-cleaning",
    description: "Restore optimal cooling and prevent thermal throttling. Includes internal dust removal, fan lubrication, and premium thermal paste swap.",
    icon: "Sparkles",
    featuredImage: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Laptop Deep Cleaning and Thermal Paste Service Delhi NCR",
    seoDescription: "Prevent hardware deterioration and thermal lag. Full laptop disassembly cleaning, fan cooling servicing, and Artic MX-4 thermal paste renewal.",
    highlights: ["Artic MX-4 premium thermal paste", "Cooling fan dust-free lubrication", "Heatsink airflow optimizations", "Internal board corrosion cleaning"],
    pricing: "Starts from ₹399"
  },
  {
    title: "Software Installation",
    slug: "software-installation",
    description: "OS clean installs (Windows 11/10/macOS), corporate suite setups, utility tools configurations, and activation diagnostics.",
    icon: "FolderOpen",
    featuredImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Windows & macOS Clean Installation Services Delhi NCR",
    seoDescription: "Certified software installs. Genuine OS setup, driver troubleshooting, Microsoft Office activations, and creative suites installation.",
    highlights: ["Genuine Windows/macOS installations", "Official system driver patches", "Microsoft Office & Adobe suite support", "Slow system speed optimization"],
    pricing: "Starts from ₹499"
  },
  {
    title: "Virus Removal",
    slug: "virus-removal",
    description: "Scan, identify, and securely purge malware, ransomware, adware, and trojan infections. Adware blockers and licensed antivirus setups.",
    icon: "ShieldCheck",
    featuredImage: "https://images.unsplash.com/photo-1601597111158-2fceff270190?w=800&auto=format&fit=crop&q=60",
    seoTitle: "Malware & Virus Removal Experts for Laptops Delhi NCR",
    seoDescription: "Secure virus cleaning, adware blocks, and ransomware audits. Clean your system and secure your financial login passwords from hackers.",
    highlights: ["Complete malware and trojan purge", "Malicious registry script cleanup", "Certified premium Antivirus setups", "Browser hijackers restoration"],
    pricing: "Starts from ₹499"
  },
  {
    title: "Doorstep Repair",
    slug: "doorstep-repair",
    description: "Schedule on-site repair at your home or office in Delhi, Noida, or Gurugram. Free pickup and safe drop-off for advanced repairs.",
    icon: "Truck",
    featuredImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60",
    seoTitle: "On-site Laptop & Mobile Doorstep Repair Delhi NCR | LapyZone",
    seoDescription: "Get certified technician doorstep repairs in 90 minutes. Professional service at your home or corporate office with zero hassle.",
    highlights: ["90-minute rapid doorstep arrival", "Transparent direct-front repairs", "Free pickup & delivery for complex issues", "Safe, sanitised transit packages"],
    pricing: "Free Service Visit (Repairs billed extra)"
  }
];

const SEED_TECHNICIANS: Technician[] = [
  {
    name: "Rajesh Kumar",
    designation: "Lead Chip-Level Specialist",
    experience: 8,
    specialization: "MacBook Motherboards & Logic Boards",
    repairsCompleted: 1420,
    rating: 4.9,
    serviceAreas: ["Connaught Place", "Dwarka", "Janakpuri", "Rajouri Garden"],
    profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60",
    certifications: ["Apple Certified Support Professional (ACSP)", "ESD Chip Level Master"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Sandeep Verma",
    designation: "Senior Hardware Engineer",
    experience: 6,
    specialization: "Dell & HP Gaming Laptops repair",
    repairsCompleted: 1100,
    rating: 4.8,
    serviceAreas: ["Noida Sector 62", "Noida Sector 18", "Indirapuram", "Mayur Vihar"],
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60",
    certifications: ["Dell Hardware Certified Tech", "HP Specialist Program"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Amit Sharma",
    designation: "Mobile Display Expert",
    experience: 5,
    specialization: "OLED/AMOLED Displays & iPhone Screen Swaps",
    repairsCompleted: 980,
    rating: 4.9,
    serviceAreas: ["Saket", "Vasant Kunj", "Lajpat Nagar", "Hauz Khas"],
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60",
    certifications: ["Certified Mobile Repair Expert (CMRE)", "iPhone Glass Craft Cert"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Vikram Singh",
    designation: "Data Recovery Lead",
    experience: 7,
    specialization: "Crashed Hard Drives & Dead SSD NAND Extraction",
    repairsCompleted: 750,
    rating: 4.7,
    serviceAreas: ["Gurugram Phase 3", "DLF CyberCity", "Sohna Road", "Dwarka"],
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    certifications: ["Certified Ethical Hacker (CEH)", "Hard Drive Recovery Master"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Pooja Malhotra",
    designation: "Customer Care & On-site Diagnostics Coordinator",
    experience: 4,
    specialization: "OS Configurations, Bios setups, and Virus Purging",
    repairsCompleted: 610,
    rating: 4.8,
    serviceAreas: ["Chanakyapuri", "Green Park", "Greater Kailash", "Okhla"],
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60",
    certifications: ["CompTIA A+ Professional", "Microsoft Certified Systems Administrator"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Rohan Gupta",
    designation: "Refurbished Tech QC Lead",
    experience: 5,
    specialization: "Laptop Hardware Tuning & Performance Upgrades",
    repairsCompleted: 830,
    rating: 4.7,
    serviceAreas: ["Karol Bagh", "Pahar Ganj", "Rohini", "Pitampura"],
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
    certifications: ["Lenovo Service Associate", "High Performance Tuning Cert"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Karan Johar",
    designation: "Doorstep Support Engineer",
    experience: 4,
    specialization: "Thermal pastes, RAM upgrades, Screen swaps",
    repairsCompleted: 590,
    rating: 4.8,
    serviceAreas: ["Preet Vihar", "Laxmi Nagar", "Shahdara", "Noida Sector 62"],
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60",
    certifications: ["CompTIA IT Fundamentals", "Premium Customer Relations Cert"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Meera Sen",
    designation: "Tablet Repair Specialist",
    experience: 6,
    specialization: "iPad LCD & Digitizer micro-fuses",
    repairsCompleted: 820,
    rating: 4.9,
    serviceAreas: ["Faridabad", "South Ext", "Defense Colony", "Nizamuddin"],
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
    certifications: ["Apple Hardware Specialist", "Micro-soldering Level III"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Aditya Roy",
    designation: "Corporate Hardware Architect",
    experience: 9,
    specialization: "Enterprise Server repairs & Bulk Client Laptops",
    repairsCompleted: 1560,
    rating: 4.9,
    serviceAreas: ["Gurugram Golf Course Road", "DLF Phase 1", "Connaught Place", "Okhla"],
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
    certifications: ["Cisco Certified Network Associate (CCNA)", "Intel Hardware Specialist"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Deepak Rawat",
    designation: "Junior Tech Assistant",
    experience: 3,
    specialization: "Keyboard replacements & general hardware troubleshooting",
    repairsCompleted: 420,
    rating: 4.6,
    serviceAreas: ["Janakpuri", "Tilak Nagar", "Uttam Nagar", "Dwarka"],
    profileImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=60",
    certifications: ["State Technical Certificate", "Hardware Diagnostics Associate"],
    createdAt: new Date().toISOString()
  }
];

const SEED_TESTIMONIALS: Testimonial[] = [
  {
    customerName: "Vikramaditya Sharma",
    rating: 5,
    review: "Amazing experience! My MacBook Pro logic board was declared dead by Apple Service Center, quoting ₹48,000 for replacement. Rajesh from LapyZone repaired the short circuit on the board for just ₹6,500. It works beautifully now. Highly recommended!",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=60",
    deviceType: "Apple MacBook Pro",
    createdAt: new Date().toISOString()
  },
  {
    customerName: "Priyanka Sen",
    rating: 5,
    review: "Requested a doorstep SSD and RAM upgrade for my HP laptop. Sandeep arrived in Karol Bagh within 2 hours, set up everything in front of my eyes, cloned all my files safely. My old laptop is flying now! Outstanding transparency.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=60",
    deviceType: "HP Pavilion Laptop",
    createdAt: new Date().toISOString()
  },
  {
    customerName: "Ananya Deshmukh",
    rating: 5,
    review: "My iPhone screen was cracked, and I didn't want to leave it at a local market shop. LapyZone sent Amit to my apartment in Dwarka. He fixed the OLED panel in 30 minutes right in my dining room. Absolute luxury and top-tier security.",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&auto=format&fit=crop&q=60",
    deviceType: "iPhone 14 Pro",
    createdAt: new Date().toISOString()
  },
  {
    customerName: "Karan Malhotra",
    rating: 5,
    review: "We had 15 corporate laptops from our office in Gurugram CyberCity requiring deep clean and thermal grease tuning due to overheating. Aditya and the team handled the bulk service over the weekend. Impeccable professional delivery.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=60",
    deviceType: "Lenovo ThinkPad X1 (Bulk)",
    createdAt: new Date().toISOString()
  },
  {
    customerName: "Gurpreet Singh",
    rating: 5,
    review: "Outstanding data recovery team. My external HDD took a heavy fall and stopped spinning. I was desperate for my daughter's childhood photos. Vikram retrieved 98% of the data. I cannot thank them enough. Fair pricing.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=60",
    deviceType: "Seagate 2TB External HDD",
    createdAt: new Date().toISOString()
  },
  {
    customerName: "Shreya Ghoshal",
    rating: 4,
    review: "Got my Dell Inspiron battery replaced. LapyZone had the genuine model in stock, unlike other local vendors. Service was prompt, and I got a 1-year stamped warranty card.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=60",
    deviceType: "Dell Inspiron 15",
    createdAt: new Date().toISOString()
  },
  {
    customerName: "Rakesh Jhunjhunwala",
    rating: 5,
    review: "My iPad Air screen was completely blank. Meera repaired the backlight IC loop with amazing finesse. Fast pickup and delivery, transparent tracking alerts on WhatsApp. Top tier!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60",
    deviceType: "iPad Air 5th Gen",
    createdAt: new Date().toISOString()
  },
  {
    customerName: "Siddharth Roy",
    rating: 5,
    review: "Excellent response for virus removal and malware cleaning. My computer was hijacked with continuous popup warnings. LapyZone sorted out the registries, set up proper security, and optimized startup items. Smooth and clean.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=60",
    deviceType: "Lenovo Ideapad",
    createdAt: new Date().toISOString()
  },
  {
    customerName: "Neha Kakkar",
    rating: 5,
    review: "LapyZone is my go-to tech repair partner in Delhi NCR now. They are extremely professional, provide GST invoices, and have highly specialized technicians who know what they are doing.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=60",
    deviceType: "Asus Zenbook Duo",
    createdAt: new Date().toISOString()
  },
  {
    customerName: "Zafar Khan",
    rating: 5,
    review: "Brilliant customer support. Same-day keyboard replacement for my MacBook Air. The keys feel clicky and the backlight works perfectly. Extremely professional staff.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=60",
    deviceType: "Apple MacBook Air M1",
    createdAt: new Date().toISOString()
  }
];

const SEED_REPAIR_REQUESTS: RepairRequest[] = [
  {
    id: "LAPY-89241",
    customerName: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@gmail.com",
    deviceType: "macbook",
    brand: "Apple",
    model: "MacBook Pro 16\" M1 Pro",
    issueDescription: "Accidentally spilled green tea on keyboard, display flickers and keys sticky.",
    pickupRequired: true,
    preferredDate: "2026-06-23",
    status: "in_repair",
    createdAt: "2026-06-23T08:30:00.000Z"
  },
  {
    id: "LAPY-73105",
    customerName: "Sneha Gupta",
    phone: "9988776655",
    email: "sneha@yahoo.com",
    deviceType: "laptop",
    brand: "Dell",
    model: "XPS 15 9510",
    issueDescription: "Battery swelling up, touchpad pushed upwards, overheating under moderate loads.",
    pickupRequired: false,
    preferredDate: "2026-06-24",
    status: "accepted",
    createdAt: "2026-06-24T01:15:00.000Z"
  },
  {
    id: "LAPY-12045",
    customerName: "Amit Verma",
    phone: "9123456789",
    email: "amit.verma@outlook.com",
    deviceType: "mobile",
    brand: "Apple",
    model: "iPhone 13 Pro",
    issueDescription: "Front glass screen completely shattered, multi-touch unresponsive in bottom left.",
    pickupRequired: true,
    preferredDate: "2026-06-22",
    status: "completed",
    createdAt: "2026-06-22T10:00:00.000Z"
  }
];

// DB Operations Layer

export interface UserDbRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: 'admin' | 'user';
  dashboardAccess: boolean;
  createdAt: string;
}

// SQL Mapping Helpers
const mapUser = (row: any): UserDbRecord => ({
  id: row.id,
  name: row.name,
  email: row.email,
  passwordHash: row.password_hash,
  salt: row.salt,
  role: row.role as 'admin' | 'user',
  dashboardAccess: Boolean(row.dashboard_access),
  createdAt: row.created_at
});

const mapRepairRequest = (row: any): RepairRequest => ({
  id: row.id,
  customerName: row.customer_name,
  phone: row.phone,
  email: row.email,
  deviceType: row.device_type,
  brand: row.brand,
  model: row.model,
  issueDescription: row.issue_description,
  pickupRequired: Boolean(row.pickup_required),
  pickupAddress: row.pickup_address,
  preferredDate: row.preferred_date,
  status: row.status,
  createdAt: row.created_at,
  userId: row.user_id || undefined
});

const mapTechnician = (row: any): Technician => {
  let serviceAreas: string[] = [];
  let certifications: string[] = [];
  try {
    serviceAreas = typeof row.service_areas === 'string' ? JSON.parse(row.service_areas) : (Array.isArray(row.service_areas) ? row.service_areas : []);
  } catch (e) {}
  try {
    certifications = typeof row.certifications === 'string' ? JSON.parse(row.certifications) : (Array.isArray(row.certifications) ? row.certifications : []);
  } catch (e) {}

  return {
    id: row.id,
    name: row.name,
    designation: row.designation,
    experience: Number(row.experience),
    specialization: row.specialization,
    repairsCompleted: Number(row.repairs_completed),
    rating: Number(row.rating),
    serviceAreas,
    profileImage: row.profile_image,
    certifications,
    createdAt: row.created_at
  };
};

const mapTestimonial = (row: any): Testimonial => ({
  id: row.id,
  customerName: row.customer_name,
  rating: Number(row.rating),
  review: row.review,
  deviceType: row.device_type,
  image: row.image,
  userId: row.user_id || undefined,
  createdAt: row.created_at
});

const mapInquiry = (row: any): Inquiry => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  email: row.email,
  message: row.message,
  status: row.status || 'pending',
  createdAt: row.created_at
});

const mapService = (row: any): ServiceCategory => {
  let highlights: string[] = [];
  try {
    highlights = typeof row.highlights === 'string' ? JSON.parse(row.highlights) : (Array.isArray(row.highlights) ? row.highlights : []);
  } catch (e) {}

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    icon: row.icon,
    featuredImage: row.featured_image,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    highlights,
    pricing: row.pricing
  };
};

// DB Operations Layer

export const Storage = {
  async init(): Promise<void> {
    if (DATABASE_URL && pgPool) {
      try {
        console.log('Connecting to PostgreSQL database...');
        const client = await pgPool.connect();
        console.log('Successfully connected to PostgreSQL database.');
        client.release();
        
        await this.runMigrations();
        await this.seedPg();
      } catch (err) {
        console.error('Failed to connect to PostgreSQL. Falling back to local JSON database.', err);
        pgPool = null;
        this.seed();
      }
    } else {
      console.log('No DATABASE_URL provided. Running in LOCAL FILE MODE.');
      this.seed();
    }
  },

  async close(): Promise<void> {
    if (pgPool) {
      try {
        console.log('Closing PostgreSQL connection pool...');
        await pgPool.end();
        console.log('PostgreSQL connection closed.');
      } catch (err) {
        console.error('Error closing PostgreSQL connection:', err);
      }
    }
  },

  async runMigrations(): Promise<void> {
    if (!pgPool) return;
    try {
      console.log('Running database migrations...');
      
      // Users Table
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          salt VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'user',
          dashboard_access BOOLEAN DEFAULT FALSE,
          created_at VARCHAR(100) NOT NULL
        )
      `);

      // Services Table
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS services (
          id VARCHAR(255) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          icon VARCHAR(100) NOT NULL,
          featured_image VARCHAR(512) NOT NULL,
          seo_title VARCHAR(255) NOT NULL,
          seo_description TEXT NOT NULL,
          highlights TEXT NOT NULL,
          pricing VARCHAR(100) NOT NULL,
          created_at VARCHAR(100) NOT NULL
        )
      `);

      // Technicians Table
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS technicians (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          designation VARCHAR(255) NOT NULL,
          experience INTEGER NOT NULL,
          specialization VARCHAR(255) NOT NULL,
          repairs_completed INTEGER NOT NULL,
          rating DECIMAL(3,2) NOT NULL,
          service_areas TEXT NOT NULL,
          profile_image VARCHAR(512) NOT NULL,
          certifications TEXT NOT NULL,
          created_at VARCHAR(100) NOT NULL
        )
      `);

      // Testimonials Table
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS testimonials (
          id VARCHAR(255) PRIMARY KEY,
          customer_name VARCHAR(255) NOT NULL,
          rating INTEGER NOT NULL,
          review TEXT NOT NULL,
          device_type VARCHAR(100) NOT NULL,
          image VARCHAR(512) NOT NULL,
          user_id VARCHAR(255),
          created_at VARCHAR(100) NOT NULL
        )
      `);

      // Inquiries Table
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          created_at VARCHAR(100) NOT NULL
        )
      `);

      // Repair Requests Table
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS repair_requests (
          id VARCHAR(255) PRIMARY KEY,
          customer_name VARCHAR(255) NOT NULL,
          phone VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          device_type VARCHAR(100) NOT NULL,
          brand VARCHAR(100) NOT NULL,
          model VARCHAR(100) NOT NULL,
          issue_description TEXT NOT NULL,
          pickup_required BOOLEAN DEFAULT FALSE,
          pickup_address TEXT NOT NULL,
          preferred_date VARCHAR(100) NOT NULL,
          status VARCHAR(100) DEFAULT 'pending',
          user_id VARCHAR(255),
          created_at VARCHAR(100) NOT NULL
        )
      `);

      // Sessions Table
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS sessions (
          token VARCHAR(255) PRIMARY KEY,
          user_id VARCHAR(255) NOT NULL,
          created_at VARCHAR(100) NOT NULL
        )
      `);

      console.log('Database migrations completed successfully.');
    } catch (err) {
      console.error('Error running migrations:', err);
      throw err;
    }
  },

  async seedPg(): Promise<void> {
    if (!pgPool) return;
    try {
      // Seed Services
      const servicesCheck = await pgPool.query('SELECT COUNT(*) FROM services');
      const servicesCount = parseInt(servicesCheck.rows[0].count, 10);
      if (servicesCount === 0) {
        console.log('Seeding PostgreSQL "services" table...');
        for (const s of SEED_SERVICES) {
          await pgPool.query(
            `INSERT INTO services (id, title, slug, description, icon, featured_image, seo_title, seo_description, highlights, pricing, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
              s.id || crypto.randomUUID(),
              s.title,
              s.slug,
              s.description,
              s.icon,
              s.featuredImage,
              s.seoTitle,
              s.seoDescription,
              JSON.stringify(s.highlights),
              s.pricing,
              new Date().toISOString()
            ]
          );
        }
      }

      // Seed Technicians
      const techsCheck = await pgPool.query('SELECT COUNT(*) FROM technicians');
      const techsCount = parseInt(techsCheck.rows[0].count, 10);
      if (techsCount === 0) {
        console.log('Seeding PostgreSQL "technicians" table...');
        const seededTechs = SEED_TECHNICIANS.map((t, idx) => ({
          ...t,
          id: t.id || `tech_seed_${idx + 1}`
        }));
        for (const t of seededTechs) {
          await pgPool.query(
            `INSERT INTO technicians (id, name, designation, experience, specialization, repairs_completed, rating, service_areas, profile_image, certifications, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
              t.id,
              t.name,
              t.designation,
              t.experience,
              t.specialization,
              t.repairsCompleted,
              t.rating,
              JSON.stringify(t.serviceAreas),
              t.profileImage,
              JSON.stringify(t.certifications),
              new Date().toISOString()
            ]
          );
        }
      }

      // Seed Testimonials
      const testimonialsCheck = await pgPool.query('SELECT COUNT(*) FROM testimonials');
      const testimonialsCount = parseInt(testimonialsCheck.rows[0].count, 10);
      if (testimonialsCount === 0) {
        console.log('Seeding PostgreSQL "testimonials" table...');
        for (const t of SEED_TESTIMONIALS) {
          await pgPool.query(
            `INSERT INTO testimonials (id, customer_name, rating, review, device_type, image, user_id, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              t.id || crypto.randomUUID(),
              t.customerName,
              t.rating,
              t.review,
              t.deviceType,
              t.image,
              t.userId || null,
              new Date().toISOString()
            ]
          );
        }
      }
    } catch (err) {
      console.error('Error seeding PostgreSQL database:', err);
    }
  },

  seed(): void {
    if (!fs.existsSync(SERVICES_PATH)) {
      writeJsonFile(SERVICES_PATH, SEED_SERVICES);
    }
    if (!fs.existsSync(TECHNICIANS_PATH)) {
      writeJsonFile(TECHNICIANS_PATH, SEED_TECHNICIANS);
    }
    if (!fs.existsSync(TESTIMONIALS_PATH)) {
      writeJsonFile(TESTIMONIALS_PATH, SEED_TESTIMONIALS);
    }
    if (!fs.existsSync(INQUIRIES_PATH)) {
      writeJsonFile(INQUIRIES_PATH, []);
    }
    if (!fs.existsSync(REPAIR_REQUESTS_PATH) || readJsonFile<any[]>(REPAIR_REQUESTS_PATH, []).length === 0) {
      writeJsonFile(REPAIR_REQUESTS_PATH, SEED_REPAIR_REQUESTS);
    }
    if (!fs.existsSync(USERS_PATH)) {
      writeJsonFile(USERS_PATH, []);
    }
    if (!fs.existsSync(SESSIONS_PATH)) {
      writeJsonFile(SESSIONS_PATH, {});
    }
    console.log("Database connected successfully. Local file-based schema loaded.");
  },

  async getSessions(): Promise<Record<string, string>> {
    if (pgPool) {
      const res = await pgPool.query('SELECT * FROM sessions');
      const map: Record<string, string> = {};
      res.rows.forEach(row => {
        map[row.token] = row.user_id;
      });
      return map;
    }
    return readJsonFile<Record<string, string>>(SESSIONS_PATH, {});
  },

  async addSession(token: string, userId: string): Promise<void> {
    if (pgPool) {
      await pgPool.query(
        `INSERT INTO sessions (token, user_id, created_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (token) DO UPDATE SET user_id = $2`,
        [token, userId, new Date().toISOString()]
      );
      return;
    }
    const sessions = readJsonFile<Record<string, string>>(SESSIONS_PATH, {});
    sessions[token] = userId;
    writeJsonFile(SESSIONS_PATH, sessions);
  },

  async deleteSession(token: string): Promise<void> {
    if (pgPool) {
      await pgPool.query('DELETE FROM sessions WHERE token = $1', [token]);
      return;
    }
    const sessions = readJsonFile<Record<string, string>>(SESSIONS_PATH, {});
    if (sessions[token]) {
      delete sessions[token];
      writeJsonFile(SESSIONS_PATH, sessions);
    }
  },

  async getInquiries(): Promise<Inquiry[]> {
    if (pgPool) {
      const res = await pgPool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
      return res.rows.map(mapInquiry);
    }
    return readJsonFile<Inquiry[]>(INQUIRIES_PATH, []);
  },

  async addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    if (pgPool) {
      await pgPool.query(
        `INSERT INTO inquiries (id, name, phone, email, message, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [newInquiry.id, newInquiry.name, newInquiry.phone, newInquiry.email, newInquiry.message, newInquiry.status, newInquiry.createdAt]
      );
      return newInquiry;
    }
    const list = readJsonFile<Inquiry[]>(INQUIRIES_PATH, []);
    list.push(newInquiry);
    writeJsonFile(INQUIRIES_PATH, list);
    return newInquiry;
  },

  async deleteInquiry(id: string): Promise<boolean> {
    if (pgPool) {
      const res = await pgPool.query('DELETE FROM inquiries WHERE id = $1', [id]);
      return (res.rowCount ?? 0) > 0;
    }
    const list = readJsonFile<Inquiry[]>(INQUIRIES_PATH, []);
    const filtered = list.filter(inq => inq.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile(INQUIRIES_PATH, filtered);
    return true;
  },

  async getRepairRequests(): Promise<RepairRequest[]> {
    if (pgPool) {
      const res = await pgPool.query('SELECT * FROM repair_requests ORDER BY created_at DESC');
      return res.rows.map(mapRepairRequest);
    }
    return readJsonFile<RepairRequest[]>(REPAIR_REQUESTS_PATH, []);
  },

  async addRepairRequest(request: Omit<RepairRequest, 'id' | 'createdAt' | 'status'>): Promise<RepairRequest> {
    const newReq: RepairRequest = {
      ...request,
      id: `LAPY-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    if (pgPool) {
      await pgPool.query(
        `INSERT INTO repair_requests (id, customer_name, phone, email, device_type, brand, model, issue_description, pickup_required, pickup_address, preferred_date, status, user_id, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [
          newReq.id,
          newReq.customerName,
          newReq.phone,
          newReq.email,
          newReq.deviceType,
          newReq.brand,
          newReq.model,
          newReq.issueDescription,
          newReq.pickupRequired,
          newReq.pickupAddress || '',
          newReq.preferredDate,
          newReq.status,
          newReq.userId || null,
          newReq.createdAt
        ]
      );
      return newReq;
    }
    const list = readJsonFile<RepairRequest[]>(REPAIR_REQUESTS_PATH, []);
    list.push(newReq);
    writeJsonFile(REPAIR_REQUESTS_PATH, list);
    return newReq;
  },

  async updateRepairRequestStatus(id: string, status: RepairRequest['status']): Promise<boolean> {
    if (pgPool) {
      const res = await pgPool.query('UPDATE repair_requests SET status = $1 WHERE id = $2', [status, id]);
      return (res.rowCount ?? 0) > 0;
    }
    const list = readJsonFile<RepairRequest[]>(REPAIR_REQUESTS_PATH, []);
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return false;
    list[idx].status = status;
    writeJsonFile(REPAIR_REQUESTS_PATH, list);
    return true;
  },

  async deleteRepairRequest(id: string): Promise<boolean> {
    if (pgPool) {
      const res = await pgPool.query('DELETE FROM repair_requests WHERE id = $1', [id]);
      return (res.rowCount ?? 0) > 0;
    }
    const list = readJsonFile<RepairRequest[]>(REPAIR_REQUESTS_PATH, []);
    const filtered = list.filter(r => r.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile(REPAIR_REQUESTS_PATH, filtered);
    return true;
  },

  async getTechnicians(): Promise<Technician[]> {
    if (pgPool) {
      const res = await pgPool.query('SELECT * FROM technicians ORDER BY created_at DESC');
      return res.rows.map(mapTechnician);
    }
    const list = readJsonFile<Technician[]>(TECHNICIANS_PATH, SEED_TECHNICIANS);
    let modified = false;
    const listWithIds = list.map((t) => {
      if (!t.id) {
        modified = true;
        return {
          ...t,
          id: `tech_${Math.random().toString(36).substr(2, 9)}`
        };
      }
      return t;
    });
    if (modified) {
      writeJsonFile(TECHNICIANS_PATH, listWithIds);
    }
    return listWithIds;
  },

  async addTechnician(tech: Omit<Technician, 'id' | 'createdAt'>): Promise<Technician> {
    const newTech: Technician = {
      ...tech,
      id: `tech_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    if (pgPool) {
      await pgPool.query(
        `INSERT INTO technicians (id, name, designation, experience, specialization, repairs_completed, rating, service_areas, profile_image, certifications, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          newTech.id,
          newTech.name,
          newTech.designation,
          newTech.experience,
          newTech.specialization,
          newTech.repairsCompleted,
          newTech.rating,
          JSON.stringify(newTech.serviceAreas),
          newTech.profileImage,
          JSON.stringify(newTech.certifications),
          newTech.createdAt
        ]
      );
      return newTech;
    }
    const list = await this.getTechnicians();
    list.push(newTech);
    writeJsonFile(TECHNICIANS_PATH, list);
    return newTech;
  },

  async updateTechnician(id: string, tech: Omit<Technician, 'id' | 'createdAt'>): Promise<boolean> {
    if (pgPool) {
      const res = await pgPool.query(
        `UPDATE technicians
         SET name=$1, designation=$2, experience=$3, specialization=$4, repairs_completed=$5, rating=$6, service_areas=$7, profile_image=$8, certifications=$9
         WHERE id=$10`,
        [
          tech.name,
          tech.designation,
          tech.experience,
          tech.specialization,
          tech.repairsCompleted,
          tech.rating,
          JSON.stringify(tech.serviceAreas),
          tech.profileImage,
          JSON.stringify(tech.certifications),
          id
        ]
      );
      return (res.rowCount ?? 0) > 0;
    }
    const list = await this.getTechnicians();
    const idx = list.findIndex(t => t.id === id);
    if (idx === -1) return false;
    list[idx] = { ...tech, id, createdAt: list[idx].createdAt };
    writeJsonFile(TECHNICIANS_PATH, list);
    return true;
  },

  async deleteTechnician(id: string): Promise<boolean> {
    if (pgPool) {
      const res = await pgPool.query('DELETE FROM technicians WHERE id = $1', [id]);
      return (res.rowCount ?? 0) > 0;
    }
    const list = await this.getTechnicians();
    const filtered = list.filter(t => t.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile(TECHNICIANS_PATH, filtered);
    return true;
  },

  async getTestimonials(): Promise<Testimonial[]> {
    if (pgPool) {
      const res = await pgPool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
      return res.rows.map(mapTestimonial);
    }
    return readJsonFile<Testimonial[]>(TESTIMONIALS_PATH, SEED_TESTIMONIALS);
  },

  async addTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: `test_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    if (pgPool) {
      await pgPool.query(
        `INSERT INTO testimonials (id, customer_name, rating, review, device_type, image, user_id, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          newTestimonial.id,
          newTestimonial.customerName,
          newTestimonial.rating,
          newTestimonial.review,
          newTestimonial.deviceType,
          newTestimonial.image,
          newTestimonial.userId || null,
          newTestimonial.createdAt
        ]
      );
      return newTestimonial;
    }
    const list = readJsonFile<Testimonial[]>(TESTIMONIALS_PATH, SEED_TESTIMONIALS);
    list.unshift(newTestimonial);
    writeJsonFile(TESTIMONIALS_PATH, list);
    return newTestimonial;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    if (pgPool) {
      const res = await pgPool.query('DELETE FROM testimonials WHERE id = $1', [id]);
      return (res.rowCount ?? 0) > 0;
    }
    const list = readJsonFile<Testimonial[]>(TESTIMONIALS_PATH, SEED_TESTIMONIALS);
    const filtered = list.filter(t => t.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile(TESTIMONIALS_PATH, filtered);
    return true;
  },

  async getServices(): Promise<ServiceCategory[]> {
    if (pgPool) {
      const res = await pgPool.query('SELECT * FROM services ORDER BY title ASC');
      return res.rows.map(mapService);
    }
    return readJsonFile<ServiceCategory[]>(SERVICES_PATH, SEED_SERVICES);
  },

  async getUsers(): Promise<UserDbRecord[]> {
    if (pgPool) {
      const res = await pgPool.query('SELECT * FROM users ORDER BY created_at DESC');
      return res.rows.map(mapUser);
    }
    return readJsonFile<UserDbRecord[]>(USERS_PATH, []);
  },

  async getUserByEmail(email: string): Promise<UserDbRecord | undefined> {
    if (pgPool) {
      const res = await pgPool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
      return res.rows.length > 0 ? mapUser(res.rows[0]) : undefined;
    }
    const users = await this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  async getUserById(id: string): Promise<UserDbRecord | undefined> {
    if (pgPool) {
      const res = await pgPool.query('SELECT * FROM users WHERE id = $1', [id]);
      return res.rows.length > 0 ? mapUser(res.rows[0]) : undefined;
    }
    const users = await this.getUsers();
    return users.find(u => u.id === id);
  },

  async addUser(user: Omit<UserDbRecord, 'id' | 'createdAt'>): Promise<UserDbRecord> {
    const list = await this.getUsers();
    const isFirstUser = list.length === 0;
    const newUser: UserDbRecord = {
      ...user,
      role: isFirstUser ? 'admin' : user.role,
      dashboardAccess: isFirstUser ? true : user.dashboardAccess,
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    if (pgPool) {
      await pgPool.query(
        `INSERT INTO users (id, name, email, password_hash, salt, role, dashboard_access, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [newUser.id, newUser.name, newUser.email, newUser.passwordHash, newUser.salt, newUser.role, newUser.dashboardAccess, newUser.createdAt]
      );
      return newUser;
    }
    list.push(newUser);
    writeJsonFile(USERS_PATH, list);
    return newUser;
  },

  async updateUserAccess(id: string, access: boolean): Promise<boolean> {
    if (pgPool) {
      const res = await pgPool.query('UPDATE users SET dashboard_access = $1 WHERE id = $2', [access, id]);
      return (res.rowCount ?? 0) > 0;
    }
    const list = await this.getUsers();
    const idx = list.findIndex(u => u.id === id);
    if (idx === -1) return false;
    list[idx].dashboardAccess = access;
    writeJsonFile(USERS_PATH, list);
    return true;
  },

  async deleteUser(id: string): Promise<boolean> {
    if (pgPool) {
      const res = await pgPool.query('DELETE FROM users WHERE id = $1', [id]);
      return (res.rowCount ?? 0) > 0;
    }
    const list = await this.getUsers();
    const filtered = list.filter(u => u.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile(USERS_PATH, filtered);
    return true;
  },

  hashPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }
};
