import type { ReactNode } from 'react';
import { Battery, Cpu, Droplet, Laptop, ShieldCheck, Smartphone, Truck, Wrench, Zap } from 'lucide-react';

// Service landing-page content (moved unchanged from pages/ServiceDetail.tsx).
export interface ServiceDetailsData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  options: Array<{ id: number; name: string; icon: ReactNode; price: string }>;
}

export const SERVICE_CATALOG_DATA: Record<string, ServiceDetailsData> = {
  'mobile-repair': {
    title: 'Mobile Phone Repair Service',
    subtitle: 'Smartphone Repair in Delhi NCR, Nehru Place',
    description:
      'Professional smartphone repair for Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Oppo, Xiaomi, Pixel and Realme. Display glass replacement, battery swap, charging jack, and IC repair with 90-day warranty.',
    features: ['Original OEM Displays', '30-Minute Fast Turnaround', '90-Day Warranty', 'Free Doorstep Pickup'],
    options: [
      { id: 1, name: 'Screen & Touch Glass Replacement', icon: <Smartphone className="h-5 w-5" />, price: '₹999 Onwards' },
      { id: 2, name: 'Battery Replacement', icon: <Battery className="h-5 w-5" />, price: '₹799 Onwards' },
      { id: 3, name: 'Charging Port / Jack Repair', icon: <Zap className="h-5 w-5" />, price: '₹499 Onwards' },
      { id: 4, name: 'Motherboard IC Repair', icon: <Cpu className="h-5 w-5" />, price: '₹1,499 Onwards' },
      { id: 5, name: 'Camera & Glass Repair', icon: <ShieldCheck className="h-5 w-5" />, price: '₹699 Onwards' },
    ],
  },
  'laptop-repair': {
    title: 'Laptop Repair & Motherboard Service',
    subtitle: 'Chip-Level Laptop Repair Center at Nehru Place, Delhi',
    description:
      'Expert chip-level motherboard repairing, display panel replacement, power IC fixing, hinge repair, and RAM/SSD performance upgrades for Dell, HP, Lenovo, Asus, Acer, and MSI laptops.',
    features: ['BGA Micro-Soldering Lab', 'Short Circuit Diagnosis', '90-Day Warranty', 'Free Pickup & Delivery'],
    options: [
      { id: 1, name: 'Motherboard Chip-Level Repair', icon: <Cpu className="h-5 w-5" />, price: '₹1,499 Onwards' },
      { id: 2, name: 'FHD/OLED Screen Replacement', icon: <Laptop className="h-5 w-5" />, price: '₹2,499 Onwards' },
      { id: 3, name: 'Laptop Battery Swap', icon: <Battery className="h-5 w-5" />, price: '₹1,299 Onwards' },
      { id: 4, name: 'Keyboard & Trackpad Repair', icon: <Wrench className="h-5 w-5" />, price: '₹899 Onwards' },
      { id: 5, name: 'RAM & NVMe SSD Speed Boost', icon: <Zap className="h-5 w-5" />, price: '₹1,199 Onwards' },
    ],
  },
  'macbook-repair': {
    title: 'MacBook & iMac Specialist Repair',
    subtitle: 'Apple Mac Logic Board Micro-Soldering in Nehru Place',
    description:
      'Certified Apple Mac repair engineers. Specialized logic board chip repair, Retina display replacement, Type-C charging IC fix, Flexgate repair, and liquid damage recovery for MacBook Air, Pro, M1/M2/M3/M4 & iMac.',
    features: ['Apple Micro-Soldering Specialists', 'Original Grade Retina Panels', 'Transparent Diagnostic Report', '90-Day Warranty'],
    options: [
      { id: 1, name: 'MacBook Logic Board Repair', icon: <Cpu className="h-5 w-5" />, price: '₹2,999 Onwards' },
      { id: 2, name: 'Retina Display Assembly', icon: <Laptop className="h-5 w-5" />, price: '₹6,499 Onwards' },
      { id: 3, name: 'MacBook Battery Replacement', icon: <Battery className="h-5 w-5" />, price: '₹3,499 Onwards' },
      { id: 4, name: 'Trackpad & Keyboard Fix', icon: <Wrench className="h-5 w-5" />, price: '₹1,999 Onwards' },
      { id: 5, name: 'Type-C Charging IC Fix', icon: <Zap className="h-5 w-5" />, price: '₹2,499 Onwards' },
    ],
  },
  'tablet-repair': {
    title: 'Tablet & iPad Repair Service',
    subtitle: 'iPad & Android Tablet Screen & Charging Port Fix',
    description:
      'Fast screen glass replacement, digitizer fix, battery replacement, and charging port repair for Apple iPad (Air, Pro, Mini), Samsung Galaxy Tab, and Lenovo Tab across Delhi NCR.',
    features: ['OEM Digitizers', 'Touch Glass Replacement', '90-Day Warranty', 'Doorstep Pickup'],
    options: [
      { id: 1, name: 'iPad Screen & Glass Replacement', icon: <Smartphone className="h-5 w-5" />, price: '₹1,999 Onwards' },
      { id: 2, name: 'Tablet Battery Replacement', icon: <Battery className="h-5 w-5" />, price: '₹1,299 Onwards' },
      { id: 3, name: 'Charging Port & Jack Fix', icon: <Zap className="h-5 w-5" />, price: '₹799 Onwards' },
    ],
  },
  'battery-replacement': {
    title: 'Mobile & Laptop Battery Replacement',
    subtitle: 'High Capacity Original Grade Batteries in Delhi',
    description:
      'Solve fast battery drain, sudden shutdown, swollen battery, and heating issues with certified high-grade battery replacements for smartphones, MacBooks, and Windows laptops.',
    features: ['Grade-A Battery Cells', 'Overcharge Protection IC', '90-Day Warranty', 'Free Health Checkup'],
    options: [
      { id: 1, name: 'iPhone Battery Replacement', icon: <Battery className="h-5 w-5" />, price: '₹1,199 Onwards' },
      { id: 2, name: 'Android Phone Battery Swap', icon: <Battery className="h-5 w-5" />, price: '₹799 Onwards' },
      { id: 3, name: 'MacBook & Laptop Battery', icon: <Battery className="h-5 w-5" />, price: '₹2,499 Onwards' },
    ],
  },
  'motherboard-repair': {
    title: 'Motherboard & Logic Board Micro-Soldering',
    subtitle: 'Chip-Level IC & Short Circuit Repair in Nehru Place',
    description:
      'Advanced BGA reballing, power management IC replacement, display IC fixing, dead phone recovery, and motherboard short-circuit resolution by master technicians.',
    features: ['Microscope Soldering Station', 'Component-Level Repair', 'Data Protection Safety', 'No Repair No Fee'],
    options: [
      { id: 1, name: 'Laptop Motherboard Short Fix', icon: <Cpu className="h-5 w-5" />, price: '₹1,499 Onwards' },
      { id: 2, name: 'Mobile Power IC & Charging IC', icon: <Cpu className="h-5 w-5" />, price: '₹1,299 Onwards' },
      { id: 3, name: 'MacBook Logic Board BGA Repair', icon: <Cpu className="h-5 w-5" />, price: '₹2,999 Onwards' },
    ],
  },
  'water-damage-repair': {
    title: 'Water & Liquid Damage Recovery',
    subtitle: 'Emergency Liquid Damage Treatment for Phones & Laptops',
    description:
      'Accidentally dropped device in water or coffee? Our ultrasonic deep bath cleaning, corrosion treatment, and power rail restoration save dead liquid-damaged devices.',
    features: ['Ultrasonic Cleaning Lab', 'Corrosion De-oxidation', 'Data Recovery Priority', 'High Success Rate'],
    options: [
      { id: 1, name: 'Mobile Liquid Damage Clean & Fix', icon: <Droplet className="h-5 w-5" />, price: '₹999 Onwards' },
      { id: 2, name: 'Laptop Water Damage Restoration', icon: <Droplet className="h-5 w-5" />, price: '₹1,999 Onwards' },
      { id: 3, name: 'MacBook Water Damage Logic Board', icon: <Droplet className="h-5 w-5" />, price: '₹2,999 Onwards' },
    ],
  },
  'doorstep-repair': {
    title: 'Free Doorstep Device Repair & Pickup',
    subtitle: 'Convenient Home & Office Repair Across Delhi NCR',
    description:
      'Why waste time visiting repair markets? Book free doorstep service — certified technician visits your home or office in Delhi, Noida, Gurugram, Ghaziabad & Faridabad.',
    features: ['Zero Travel Expense', 'On-Site Diagnostic', 'Transparent Live Repair', '90-Day Warranty'],
    options: [
      { id: 1, name: 'Doorstep Mobile Screen Repair', icon: <Truck className="h-5 w-5" />, price: 'Free Pickup' },
      { id: 2, name: 'Doorstep Laptop Pickup', icon: <Truck className="h-5 w-5" />, price: 'Free Pickup' },
      { id: 3, name: 'Doorstep MacBook Pickup', icon: <Truck className="h-5 w-5" />, price: 'Free Pickup' },
    ],
  },
};
