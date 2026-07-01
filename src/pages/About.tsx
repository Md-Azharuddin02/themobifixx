/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Cpu, Award, Users, AwardIcon, Sparkles, MapPin, Hammer } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Ironclad Honesty',
      desc: 'No hidden diagnostic costs or inflated spare-parts pricing. We share micro-soldering quotes before any hardware action.',
    },
    {
      icon: Cpu,
      title: 'Chip-Level Mastery',
      desc: 'Where other retail outlets claim motherboard failure requires complete replacement, we solder resistors and ICs to save you up to 80% on costs.',
    },
    {
      icon: Award,
      title: 'OEM Grade Materials',
      desc: 'We utilize original manufacturer battery cells and IPS displays with stamped warranty certificates.',
    },
    {
      icon: Users,
      title: 'Sovereign Data Trust',
      desc: 'Our strict security guidelines prevent data leaks. Client hard drives and files remain completely private and locked.',
    },
  ];

  const timeline = [
    {
      year: '2021',
      title: 'Founded in Nehru Place',
      desc: 'Started in a humble 150 sq. ft. workshop with 2 certified micro-soldering experts, serving walk-in laptop owners with chip-level repairs.',
    },
    {
      year: '2022',
      title: 'Doorstep Pickup System Launch',
      desc: 'Introduced on-site doorstep diagnostics across Central and South Delhi, enabling customers to skip stressful retail market visits.',
    },
    {
      year: '2023',
      title: 'DLF CyberCity Hub Integration',
      desc: 'Opened a dedicated branch in Gurugram, managing corporate laptop AMCs for leading Indian startups and SMEs.',
    },
    {
      year: '2025',
      title: 'Full Delhi NCR Coverage',
      desc: 'Expanded pickup coverage to Noida, Ghaziabad, and Faridabad. Scaled to 10+ certified master engineers with 5,000+ repaired devices.',
    },
  ];

  return (
    <div className="pt-24 pb-12 bg-white">
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white py-16" id="about-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#0F4CFF]/5 border border-[#0F4CFF]/10 text-[#0F4CFF] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Hammer className="w-3.5 h-3.5" />
            <span>The LapyZone Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Setting the Gold Standard for <br />
            <span className="bg-gradient-to-r from-[#0F4CFF] to-[#00C48C] text-transparent bg-clip-text">
              Device Repair Excellence
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Delhi NCR's trusted chip-level logic board experts, serving Nehru Place, Gurugram CyberCity, and Noida corporate hubs.
          </p>
        </div>
      </section>

      {/* Story Column */}
      <section className="py-16 border-t border-slate-100" id="about-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F4CFF]/5 to-[#00C48C]/5 rounded-3xl -z-10 transform scale-105"></div>
              <img
                src="https://images.unsplash.com/photo-1581090464762-647bf575c322?w=800&auto=format&fit=crop&q=60"
                alt="LapyZone master laboratory"
                referrerPolicy="no-referrer"
                className="rounded-2xl border border-slate-100 shadow-xl object-cover aspect-video w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white rounded-2xl p-6 shadow-xl hidden md:block">
                <span className="text-3xl font-black text-[#0F4CFF]">5+</span>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Years Repair Mastery</span>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900">Why LapyZone Exists</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                For years, finding device repairs in Delhi meant visiting chaotic markets, leaving your expensive device with untrusted technicians, or facing massive bills from official service centers claiming "motherboard failure" to force complete hardware replacements.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We founded **LapyZone** to bring corporate-level precision, absolute data confidentiality, and transparent flat pricing directly to your doorstep. We operate a highly synchronized lab with industrial microscopes, logic analyzer oscilloscopes, and cleanroom ESD-safe zones.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0F4CFF]" />
                  <span>Nehru Place Master Lab</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00C48C]" />
                  <span>GST-Compliant Invoicing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100" id="about-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-black text-[#0F4CFF] uppercase tracking-widest">Our DNA</h2>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Our Core Operating Standards</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="w-10 h-10 bg-[#0F4CFF]/10 text-[#0F4CFF] rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{v.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Growth Timeline Section */}
      <section className="py-20 bg-white" id="about-timeline">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-black text-[#0F4CFF] uppercase tracking-widest">Our Progress</h2>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">The Growth Timeline</h3>
          </div>

          <div className="relative border-l border-slate-200 ml-4 md:ml-32 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                {/* Year Label */}
                <div className="absolute -left-[53px] md:-left-[148px] top-0 bg-slate-950 text-white font-black text-xs px-3 py-1.5 rounded-lg w-20 text-center shadow">
                  {item.year}
                </div>

                {/* Bullets */}
                <div className="absolute -left-1.5 top-1.5 w-3.5 h-3.5 bg-[#0F4CFF] rounded-full border-2 border-white shadow"></div>

                {/* Content */}
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
