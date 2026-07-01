/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEOManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = 'LapyZone | Premium Laptop & MacBook Repair in Nehru Place, New Delhi';
    let description = 'Get premium, certified laptop and MacBook repairs at our Nehru Place master lab or via free 90-min doorstep pickup across Delhi, Noida & Gurugram. 90-day warranty.';

    // Matching routes dynamically to set professional and localized meta tags
    if (pathname === '/') {
      title = 'LapyZone | Professional Laptop & MacBook Repair in Nehru Place, New Delhi';
      description = 'Delhi NCR\'s leading repair hub in Nehru Place market. Certified chip-level motherboard and logic board repairs with safe 90-min doorstep pickup across Delhi, Noida, and Gurugram.';
    } else if (pathname === '/about') {
      title = 'About Us | LapyZone Nehru Place - Leading Hardware Repair Lab';
      description = 'Established in the heart of Nehru Place market, New Delhi, LapyZone is Delhi NCR\'s premier chip-level logic board repair facility housing cleanroom testing benches and certified engineers.';
    } else if (pathname === '/services') {
      title = 'Logic Board & Laptop Repair Services | LapyZone Nehru Place';
      description = 'Specialized chip-level diagnostic and hardware repair services in Nehru Place: liquid damage recovery, micro-soldering, keyboard & screen replacements, and battery installations.';
    } else if (pathname.startsWith('/services/')) {
      const slug = pathname.split('/').pop() || '';
      // Format slug into clean display name (e.g., 'macbook-repair' -> 'MacBook Repair')
      const serviceName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      title = `${serviceName} Service | LapyZone Nehru Place - Delhi NCR`;
      description = `Need premium ${serviceName} in Delhi NCR? Visit LapyZone's advanced Nehru Place lab or book a doorstep transit today. Original parts, 90-day warranty.`;
    } else if (pathname === '/technicians') {
      title = 'Certified Chip-Level Engineers | LapyZone New Delhi';
      description = 'All laptop and MacBook repairs are executed by ESD-certified chip-level micro-soldering experts inside our cleanroom laboratory at Nehru Place, Delhi.';
    } else if (pathname === '/testimonials') {
      title = 'Customer Reviews & Success Stories | LapyZone Delhi NCR';
      description = 'Read verified reviews from local device owners. See why corporate teams and individuals across Delhi, Noida, and Gurugram trust LapyZone\'s Nehru Place lab.';
    } else if (pathname === '/tracker') {
      title = 'Track Your Repair Ticket | LapyZone Live Portal';
      description = 'Track your device repair ticket status online. Follow real-time testing, diagnostics, and quality checks at our central laboratory in Nehru Place.';
    } else if (pathname === '/contact') {
      title = 'Contact & Visit Us | Nehru Place Master Lab - LapyZone';
      description = 'Visit our physical laptop repair showroom at G-12 Ground Floor, Nehru Place, New Delhi, or contact us directly to schedule a secure doorstep pickup.';
    } else if (pathname === '/privacy-policy') {
      title = 'Privacy Policy | LapyZone New Delhi';
      description = 'Review LapyZone\'s privacy policy and data security protocols regarding diagnostic reports and client files on repaired personal devices.';
    } else if (pathname === '/terms-and-conditions') {
      title = 'Terms of Service | LapyZone Nehru Place';
      description = 'Read terms and conditions for laptop hardware repairs, diagnostic services, flat-rate pricing structures, and our comprehensive 90-day warranty.';
    }

    // Set document title
    document.title = title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [pathname]);

  return null;
}
