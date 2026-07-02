import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Clock, Phone, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import DeviceComparison from '../components/DeviceComparison';

const dotgridStyle = {
  backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
  backgroundSize: '22px 22px',
  backgroundColor: '#F8FAFC',
};

const qualityStandards = [
  {
    icon: ShieldCheck,
    title: 'Genuine OEM Spares',
    desc: 'We strictly use 100% genuine original components. Every replacement screen, keyboard, battery, or IC is sourced directly and carries a stamped warranty card.',
    color: '#0F4CFF',
  },
  {
    icon: CheckCircle2,
    title: '24-Point Quality Test',
    desc: 'Before any device is sealed for doorstep return, it undergoes a meticulous 24-point stress and hardware test covering battery cycles, TrueTone, pixels, and thermals.',
    color: '#00C48C',
  },
  {
    icon: Clock,
    title: 'ESD-Safe Lab Cleanrooms',
    desc: 'Motherboard micro-soldering is conducted in certified Electrostatic Discharge (ESD) safe lab chambers, preventing secondary electrostatic circuit damage.',
    color: '#FFB800',
  },
];

export default function ComparisonPage() {
  return (
    <div className="pt-20 md:pt-32 pb-0 bg-[#F8FAFC] min-h-screen">

      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-20 border-b-2 border-slate-900 overflow-hidden"
        style={dotgridStyle}
        id="comparison-header"
      >
        <div className="absolute inset-0 bg-[#F8FAFC]/70 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[3px_3px_0px_#0A1020]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Witness Diagnostic & Repair Quality</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Device Before & After<br />Repair Comparison
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Drag the slider handles to see the difference between broken devices and their fully restored conditions after undergoing precision repair in our cleanroom laboratories.
          </p>
        </div>
      </section>

      {/* ─── INTERACTIVE COMPARISON TOOL ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <DeviceComparison />
      </section>

      {/* ─── QUALITY STANDARDS ───────────────────────────────────── */}
      <section className="border-y-2 border-slate-900 py-16 bg-white" id="quality-standards">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#0F4CFF] text-white px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[3px_3px_0px_#0A1020]">
              <span>Lab Standards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Our Precise Lab Repair Standards</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Every device repaired at TheMobifixx undergoes rigorous testing and precision hardware restoration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qualityStandards.map((q, i) => {
              const Icon = q.icon;
              return (
                <div key={i} className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[7px_7px_0px_#0A1020] transition-all duration-150 space-y-4">
                  <div
                    className="w-10 h-10 border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#0A1020]"
                    style={{ backgroundColor: q.color }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-black text-slate-900 text-base">{q.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{q.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="comparison-cta">
        <div
          className="relative border-2 border-slate-900 rounded-2xl p-8 md:p-12 text-center space-y-6 overflow-hidden shadow-[8px_8px_0px_#FFB800]"
          style={dotgridStyle}
        >
          <div className="absolute inset-0 bg-[#F8FAFC]/80 pointer-events-none" />
          <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 border-2 border-slate-900 bg-[#FFB800] text-slate-950 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[2px_2px_0px_#0A1020]">
              <span>Ready to Restore?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Ready to restore your device to original performance?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Book a secure doorstep pickup across Delhi, Noida, or Gurugram. Our representative will transport your device safely in a padded transit box.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/contact?tab=booking"
                className="w-full sm:w-auto text-center bg-slate-900 text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_#FFB800] hover:shadow-[5px_5px_0px_#FFB800] hover:-translate-y-[2px] hover:-translate-x-[2px] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[0.5px_0.5px_0px_#FFB800] transition-all flex items-center justify-center gap-2"
              >
                <span>Book Doorstep Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919999999999"
                className="w-full sm:w-auto text-center bg-white text-slate-900 font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_#0A1020] hover:shadow-[5px_5px_0px_#0A1020] hover:-translate-y-[2px] hover:-translate-x-[2px] active:translate-y-[1.5px] active:translate-x-[1.5px] active:shadow-[0.5px_0.5px_0px_#0A1020] transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#0F4CFF]" />
                <span>Call +91 99999 99999</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
