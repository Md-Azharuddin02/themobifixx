// Home page content. Copy is carried over unchanged from the previous site.

const CLD = 'https://res.cloudinary.com/dzhsxv2wq';

export const HERO_SLIDES = [
  { image: `${CLD}/image/upload/v1784027051/WhatsApp_Image_2026-07-14_at_4.33.25_PM_kljweh.jpg`, alt: 'Broken Today? Fixed Today! Quick, reliable and affordable repairs at your doorstep.' },
  { image: `${CLD}/image/upload/v1784027052/WhatsApp_Image_2026-07-14_at_4.33.25_PM_2_vtddcw.jpg`, alt: 'TheMobifixx repair promotion' },
  { image: `${CLD}/image/upload/v1784192930/WhatsApp_Image_2026-07-16_at_2.38.16_PM_wpczmy.jpg`, alt: 'Mobile Repair. We Fix. You Relax.' },
  { image: `${CLD}/image/upload/v1784027052/WhatsApp_Image_2026-07-14_at_4.33.25_PM_1_ijgjo8.jpg`, alt: 'TheMobifixx repair promotion' },
  { image: `${CLD}/image/upload/v1784027051/WhatsApp_Image_2026-07-14_at_4.33.26_PM_by4qus.jpg`, alt: 'TheMobifixx repair promotion' },
];

export const STATS = [
  { value: '69,000+', label: 'Devices Fixed' },
  { value: '4.5+', label: 'Google Rating' },
  { value: '15+ year', label: 'of experience' },
  { value: '32000+', label: 'Laptop Repairs' },
];

// Commitments kept from the previous "Why choose us" list; items that only repeated a service were dropped.
export const PROMISES = [
  'Data Security',
  'Expert Technicians',
  '15+ years of Professional Experience',
  'Doorstep Repair Service',
  'Quick Turnaround Time',
  '6 Month Warranty',
];

export const PROCESS = ['Book Repair', 'Tech Assigned', 'Tech Arrives', 'Repair Completed'];

// The old problem photos were dropped: several carried another company's watermark.
export const COMMON_PROBLEMS = [
  'Broken Display',
  'Battery Issues',
  'Back Glass Damage',
  'Camera Problems',
  'Charging Port Issues',
  'Water Damage',
  'Face ID Problems',
  'Speaker Issues',
  'Fingerprint & Power Button',
];

export const GALLERY_ITEMS = [
  { title: 'Main Workshop Tour', desc: 'A walk-through of our repair station and testing tools.', src: `${CLD}/video/upload/v1783496194/sss_umkve2.mp4` },
  { title: 'iPhone Motherboard Repair', desc: 'Detailed board repair and chip replacement under a microscope.', src: `${CLD}/video/upload/v1783496188/iphones_v68rqj.mp4` },
  { title: 'Mobile Screen Repair', desc: 'Removing broken glass and fixing mobile screens using heat.', src: `${CLD}/video/upload/v1783496187/mobilem_gmprhd.mp4` },
  { title: 'Quality Control Testing', desc: 'Checking repaired phones to ensure everything works perfectly.', src: `${CLD}/video/upload/v1783496187/iphoness_y4ezfk.mp4` },
  { title: 'Premium Battery Replacement', desc: 'Replacing old batteries with new premium cells to keep 100% battery life.', src: `${CLD}/video/upload/v1783496186/battery_yinoig.mp4` },
  { title: 'Board Diagnostics', desc: 'Finding short circuits on boards using heat cameras.', src: `${CLD}/video/upload/v1783496186/ss_eju8jp.mp4` },
  { title: 'Water Damage Repair', desc: 'Cleaning the phone board and removing water completely.', src: `${CLD}/video/upload/v1783496186/iphoneb_dpu1ot.mp4` },
  { title: 'Fixing mobile motherboard', desc: 'Fixing mobile motherboard', src: `${CLD}/video/upload/v1784669031/WhatsApp_Video_2026-07-21_at_10.12.46_PM_xwr6mt.mp4` },
];

export const TECHNICIANS = [
  { name: 'Tusar Singh', profileImage: `${CLD}/image/upload/v1783000124/WhatsApp_Image_2026-07-01_at_5.52.22_PM_1_aiynf3.jpg?w=400&auto=format&q=60`, experience: '15 Years Experience', isOwner: true },
  { name: 'Suhail Malik', profileImage: `${CLD}/image/upload/v1784318197/WhatsApp_Image_2026-07-18_at_1.26.24_AM_klquk8.jpg?w=400&auto=format&q=60`, experience: '9 Years Experience' },
  { name: 'Nikhil Chandel', profileImage: `${CLD}/image/upload/v1783000124/WhatsApp_Image_2026-07-01_at_3.27.54_PM_sgcynd.jpg?w=400&auto=format&q=60`, experience: '9 Years Experience' },
  { name: 'Arif Sheikh', profileImage: `${CLD}/image/upload/v1783976762/WhatsApp_Image_2026-07-13_at_6.57.03_PM_uwkuip.jpg?w=400&auto=format&q=60`, experience: '9 Years Experience' },
  { name: 'Rishabh Singh Rajput', profileImage: `${CLD}/image/upload/v1783976762/WhatsApp_Image_2026-07-13_at_6.57.21_PM_khakxv.jpg?w=400&auto=format&q=60`, experience: '9 Years Experience' },
  { name: 'Sunny Sharma', profileImage: `${CLD}/image/upload/v1784055120/WhatsApp_Image_2026-07-15_at_12.21.46_AM_n2jpdx.jpg?w=400&auto=format&q=60`, experience: '9 Years Experience' },
  { name: 'Asif Alam', profileImage: `${CLD}/image/upload/v1784668866/WhatsApp_Image_2026-07-21_at_9.54.21_PM_urqehu.jpg?w=400&auto=format&q=60`, experience: '10 Years Experience' },
];

// The previous FAQ list also had "How can I track my repair status?", pointing to a Track Repair page
// that does not exist on this site. It stays out until that page ships.
export const FAQS = [
  { q: 'Is the doorstep mobile repair service safe?', a: 'Yes, absolutely safe. Our technicians are background verified and trained. We perform repairs right in front of you.' },
  { q: 'How long does a screen replacement take?', a: 'Most mobile screen replacements are completed in 30-45 minutes. Laptops and MacBooks might take 2-4 hours depending on model complexity.' },
  { q: 'Do you use original parts?', a: 'We use premium OEM quality grade parts that match the specifications of your original device. All parts undergo rigorous testing.' },
];

export const COVERAGE = [
  { city: 'South Delhi', sub: 'Nehru Place' },
  { city: 'West Delhi', sub: 'Connaught Place (CP)' },
  { city: 'East Delhi', sub: 'Laxmi Nagar' },
  { city: 'North Delhi', sub: 'Model Town' },
  { city: 'Noida', sub: 'Sector 137' },
  { city: 'Ghaziabad', sub: 'Indirapuram & Raj Nagar' },
  { city: 'Greater Noida', sub: 'Knowledge Park' },
  { city: 'Faridabad', sub: 'Greenfield Colony' },
  { city: 'Gurugram', sub: 'Golf Course Road' },
];
