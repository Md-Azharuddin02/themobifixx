import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEOManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = 'Best Mobile Repairing & Laptop Repairing in Delhi, Nehru Place | TheMobifixx';
    let description = 'Looking for the best mobile repairing or best laptop repairing in Delhi? TheMobifixx is Delhi\'s #1 trusted service center at Nehru Place, Delhi. Book a doorstep mobile & laptop screen, motherboard, and battery replacement today!';

    // Matching routes dynamically to set professional and localized meta tags
    if (pathname === '/') {
      title = 'Best Mobile Repairing & Laptop Repairing in Delhi, Nehru Place | TheMobifixx';
      description = 'Delhi NCR\'s best mobile repairing and laptop repairing service center in Nehru Place. Certified chip-level logic board repairs with safe 90-min doorstep pickup across Delhi, Noida, and Gurugram.';
    } else if (pathname === '/about') {
      title = 'About Us | TheMobifixx Nehru Place - Leading Hardware Repair Lab';
      description = 'Established in the heart of Nehru Place market, New Delhi, TheMobifixx is Delhi NCR\'s premier chip-level logic board repair facility housing cleanroom testing benches and certified engineers.';
    } else if (pathname === '/services') {
      title = 'Logic Board & Laptop Repair Services | TheMobifixx Nehru Place';
      description = 'Specialized chip-level diagnostic and hardware repair services in Nehru Place: liquid damage recovery, micro-soldering, keyboard & screen replacements, and battery installations.';
    } else if (pathname.startsWith('/services/')) {
      const slug = pathname.split('/').pop() || '';
      // Format slug into clean display name (e.g., 'macbook-repair' -> 'MacBook Repair')
      const serviceName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      title = `${serviceName} Service | TheMobifixx Nehru Place - Delhi NCR`;
      description = `Need premium ${serviceName} in Delhi NCR? Visit TheMobifixx's advanced Nehru Place lab or book a doorstep transit today. Original parts, 90-day warranty.`;
    } else if (pathname === '/technicians') {
      title = 'Certified Chip-Level Engineers | TheMobifixx New Delhi';
      description = 'All laptop and MacBook repairs are executed by ESD-certified chip-level micro-soldering experts inside our cleanroom laboratory at Nehru Place, Delhi.';
    } else if (pathname === '/testimonials') {
      title = 'Customer Reviews & Success Stories | TheMobifixx Delhi NCR';
      description = 'Read verified reviews from local device owners. See why corporate teams and individuals across Delhi, Noida, and Gurugram trust TheMobifixx\'s Nehru Place lab.';
    } else if (pathname === '/tracker') {
      title = 'Track Your Repair Ticket | TheMobifixx Live Portal';
      description = 'Track your device repair ticket status online. Follow real-time testing, diagnostics, and quality checks at our central laboratory in Nehru Place.';
    } else if (pathname === '/contact') {
      title = 'Contact & Visit Us | Nehru Place Master Lab - TheMobifixx';
      description = 'Visit our physical laptop repair showroom at G-12 Ground Floor, Nehru Place, New Delhi, or contact us directly to schedule a secure doorstep pickup.';
    } else if (pathname === '/privacy-policy') {
      title = 'Privacy Policy | TheMobifixx New Delhi';
      description = 'Review TheMobifixx\'s privacy policy and data security protocols regarding diagnostic reports and client files on repaired personal devices.';
    } else if (pathname === '/terms-and-conditions') {
      title = 'Terms of Service | TheMobifixx Nehru Place';
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
