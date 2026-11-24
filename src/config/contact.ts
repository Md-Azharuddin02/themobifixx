// Single source of truth for business contact details used across the site.
export const CONTACT = {
  phoneDisplay: '+91 9310112994',
  phoneHref: 'tel:+919310112994',
  whatsappNumber: '919310112994',
  email: 'themobifixx@gmail.com',
  instagram: 'https://www.instagram.com/The_mobifixx',
  youtube: 'https://youtube.com/@themobifixx?si=dO7H-G9hVmKg2i7E',
  addressLine: 'Near Blue Dart, Nehru Place Market, New Delhi',
  coordinates: '28°32\'55.5"N 77°15\'03.6"E',
  landmark: 'Near Blue Dart',
  hours: 'Mon - Sun: 9:00 AM - 11:59 PM',
  hoursNote: 'Emergency helpline is active 24/7.',
  mapEmbed: 'https://maps.google.com/maps?q=28.54875,77.25100&z=17&output=embed',
  logo: 'https://res.cloudinary.com/dzhsxv2wq/image/upload/v1784028396/WhatsApp_Image_2026-07-14_at_4.48.50_PM_1_rfu6xy.jpg',
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string): void {
  window.open(waLink(message), '_blank', 'noopener,noreferrer');
}

export const WA_GENERAL_MESSAGE = 'Hi, I would like to know more about your repair services. Please assist me.';

// Indian mobile number, 10 digits starting 6–9; tolerates a +91/0 prefix and spaces.
export const INDIAN_MOBILE = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;
