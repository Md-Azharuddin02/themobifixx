import { ShieldCheck, Cpu, Award, Users, Sparkles, MapPin, Hammer, Zap, Clock, Building2 } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Ironclad Honesty',
      desc: 'No hidden diagnostic costs or inflated spare-parts pricing. We share micro-soldering quotes before any hardware action.',
      color: '#0F4CFF',
    },
    {
      icon: Cpu,
      title: 'Chip-Level Mastery',
      desc: 'Where other retail outlets claim motherboard failure requires complete replacement, we solder resistors and ICs to save you up to 80% on costs.',
      color: '#00C48C',
    },
    {
      icon: Award,
      title: 'OEM Grade Materials',
      desc: 'We utilize original manufacturer battery cells and IPS displays with stamped warranty certificates.',
      color: '#FFB800',
    },
    {
      icon: Users,
      title: 'Sovereign Data Trust',
      desc: 'Our strict security guidelines prevent data leaks. Client hard drives and files remain completely private and locked.',
      color: '#0F4CFF',
    },
  ];

  const timeline = [
    {
      year: '2021',
      title: 'Founded in Nehru Place',
      desc: 'Started in a humble 150 sq. ft. workshop with 2 certified micro-soldering experts, serving walk-in laptop owners with chip-level repairs.',
      icon: Hammer,
    },
    {
      year: '2022',
      title: 'Doorstep Pickup System Launch',
      desc: 'Introduced on-site doorstep diagnostics across Central and South Delhi, enabling customers to skip stressful retail market visits.',
      icon: Zap,
    },
    {
      year: '2023',
      title: 'DLF CyberCity Hub Integration',
      desc: 'Opened a dedicated branch in Gurugram, managing corporate laptop AMCs for leading Indian startups and SMEs.',
      icon: Building2,
    },
    {
      year: '2025',
      title: 'Full Delhi NCR Coverage',
      desc: 'Expanded pickup coverage to Noida, Ghaziabad, and Faridabad. Scaled to 10+ certified master engineers with 5,000+ repaired devices.',
      icon: Clock,
    },
  ];

  return (
    <div className="pt-24 md:pt-36 pb-0 bg-[#F8FAFC]">

      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-20 border-b-2 border-slate-900 overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
          backgroundSize: '22px 22px',
          backgroundColor: '#F8FAFC',
        }}
        id="about-header"
      >
        {/* Tinted overlay so grid isn't too loud */}
        <div className="absolute inset-0 bg-[#F8FAFC]/70 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[3px_3px_0px_#0A1020]">
            <Hammer className="w-3.5 h-3.5" />
            <span>The TheMobifixx Story</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Setting the Gold Standard<br />
            <span className="relative inline-block">
              <span className="relative z-10">for Device Repair</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFB800] -z-0 -skew-x-1" />
            </span>{' '}
            <span className="text-[#0F4CFF]">Excellence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Delhi NCR's trusted chip-level logic board experts, serving Nehru Place, Gurugram CyberCity, and Noida corporate hubs.
          </p>

          {/* Stat Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[
              { label: '5,000+ Devices Repaired', bg: 'bg-slate-900 text-white' },
              { label: '10+ Certified Engineers', bg: 'bg-[#0F4CFF] text-white' },
              { label: '5+ Years of Mastery', bg: 'bg-[#FFB800] text-slate-950' },
            ].map((s) => (
              <span
                key={s.label}
                className={`${s.bg} border-2 border-slate-900 px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#0A1020]`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STORY COLUMN ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b-2 border-slate-900 bg-white" id="about-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left – Lab Image in retro 3D frame */}
            <div className="relative">
              <div className="border-2 border-slate-900 rounded-2xl shadow-[8px_8px_0px_#0A1020] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581090464762-647bf575c322?w=800&auto=format&fit=crop&q=60"
                  alt="TheMobifixx master laboratory"
                  referrerPolicy="no-referrer"
                  className="object-cover aspect-video w-full"
                />
              </div>
              {/* Floating stat chip */}
              <div className="absolute -bottom-5 -right-4 md:-bottom-6 md:-right-6 bg-[#FFB800] text-slate-950 border-2 border-slate-900 rounded-2xl px-5 py-4 shadow-[4px_4px_0px_#0A1020] hidden md:block">
                <span className="text-3xl font-black leading-none">5+</span>
                <span className="block text-[10px] font-black uppercase tracking-widest text-slate-800 mt-1">Years Repair Mastery</span>
              </div>
            </div>

            {/* Right – Story text in framed card */}
            <div className="border-2 border-slate-900 rounded-2xl bg-white shadow-[6px_6px_0px_#0A1020] p-7 space-y-5">
              {/* Section label */}
              <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#0F4CFF] text-white px-3 py-1 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[2px_2px_0px_#0A1020]">
                <Zap className="w-3 h-3" />
                <span>Why We Exist</span>
              </div>

              <h2 className="text-2xl font-black text-slate-900">Why TheMobifixx Exists</h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                For years, finding device repairs in Delhi meant visiting chaotic markets, leaving your expensive device with untrusted technicians, or facing massive bills from official service centers claiming "motherboard failure" to force complete hardware replacements.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We founded <strong>TheMobifixx</strong> to bring corporate-level precision, absolute data confidentiality, and transparent flat pricing directly to your doorstep. We operate a highly synchronized lab with industrial microscopes, logic analyzer oscilloscopes, and cleanroom ESD-safe zones.
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-3 pt-3 border-t-2 border-slate-900">
                <div className="flex items-center gap-2 border-2 border-slate-900 bg-white px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#0A1020] text-xs font-black text-slate-800">
                  <MapPin className="w-4 h-4 text-[#0F4CFF]" />
                  <span>Nehru Place Main Service Centre</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b-2 border-slate-900 bg-[#F8FAFC]" id="about-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[3px_3px_0px_#0A1020]">
              <span>Our DNA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Our Core Operating Standards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_#0A1020] space-y-4 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[7px_7px_0px_#0A1020] transition-all duration-150 cursor-default"
                >
                  {/* Icon box */}
                  <div
                    className="w-10 h-10 border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#0A1020]"
                    style={{ backgroundColor: v.color }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-black text-slate-900 text-base">{v.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── GROWTH TIMELINE ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white" id="about-timeline">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#0F4CFF] text-white px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[3px_3px_0px_#0A1020]">
              <span>Our Progress</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">The Growth Timeline</h2>
          </div>

          {/* Timeline track */}
          <div className="relative border-l-2 border-slate-900 ml-4 md:ml-36 space-y-10">
            {timeline.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative pl-8 md:pl-12">
                  {/* Year chip */}
                  <div className="absolute -left-[61px] md:-left-[160px] top-0 bg-[#FFB800] text-slate-950 border-2 border-slate-900 font-black text-xs px-3 py-1.5 rounded-xl w-[52px] md:w-[148px] text-center shadow-[2px_2px_0px_#0A1020] whitespace-nowrap">
                    {item.year}
                  </div>

                  {/* Square dot bullet */}
                  <div className="absolute -left-[9px] top-[7px] w-3.5 h-3.5 bg-[#FFB800] border-2 border-slate-900 rounded-sm shadow-[1px_1px_0px_#0A1020]" />

                  {/* Content card */}
                  <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_#0A1020] space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 border-2 border-slate-900 rounded-lg bg-[#0F4CFF] flex items-center justify-center shadow-[1px_1px_0px_#0A1020] shrink-0">
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h4 className="font-black text-slate-900 text-base leading-tight">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
