import { 
  Shield, 
  Hammer, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Droplet, 
  Ban, 
  Lock, 
  Maximize2,
  FileText
} from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 bg-[#050B18] min-h-screen font-sans text-slate-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Hero Card */}
        <div className="bg-[#0A1329] border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full -translate-y-1/2"></div>
          <div className="relative inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Data Protection Audit</span>
          </div>
          <h1 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
          <p className="relative text-xs text-slate-500 font-mono">Effective Date: June 24, 2026 | Last Updated: June 24, 2026</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-[#0A1329] border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
          <div className="prose prose-invert max-w-none text-slate-350 space-y-8 text-sm leading-relaxed">
            
            <div>
              <h2 className="font-bold text-white text-xl mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                1. Introduction
              </h2>
              <p>
                Welcome to <strong className="text-white">TheMobifixx</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal devices, hard drives, and system credentials are handled with the highest standards of safety and data confidentiality. This Privacy Policy describes how we collect, use, and secure your personal details and diagnostic files during your service cycle.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-white text-xl mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                2. Information We Collect
              </h2>
              <p className="mb-3">When you request a repair pickup or submit inquiries, we collect the following information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Personal Coordinates:</strong> Your full name, Indian phone number, email address, and home or corporate physical address for pickup/delivery mapping.</li>
                <li><strong className="text-white">Device Specifications:</strong> System type (laptop, MacBook, smartphone, watch, etc.), brand, model, serial codes, and user-provided fault logs.</li>
                <li><strong className="text-white">Diagnostic & Test Logs:</strong> Hardware errors, logic board diagnostic readouts, and voltage testing values logged by our technicians during initial checkups.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-white text-xl mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                3. Hard Drive & Data Privacy Guarantee
              </h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-white font-bold text-base border-b border-slate-800/80 pb-3">
                  <Lock className="w-5 h-5 text-green-400" />
                  <span>Full Data Isolation Policy</span>
                </div>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong className="text-white">Zero Access Policy:</strong> Our technicians are strictly forbidden from browsing, opening, downloading, or replicating folders, photos, browser histories, or databases stored on client drives.
                  </p>
                  <p>
                    <strong className="text-white">Hardware Extraction:</strong> Where technically possible and appropriate, drives/SSDs are physically disconnected or isolated during complex motherboard micro-soldering tasks to prevent thermal or static discharge corruption.
                  </p>
                  <p>
                    <strong className="text-white">Encrypted Passcode Storage:</strong> Any passcode requested for system boot testing is saved in an encrypted temporary technician journal and is permanently wiped once the final diagnostics pass validation.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-white text-xl mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                4. Data Sharing & Third-Party Disclosure
              </h2>
              <p>
                We do not sell, rent, or trade client personal details. Data is shared exclusively with our logistics courier agents to coordinate doorstep pickup and drop-off transits. In rare cases where chip-level motherboard elements require proprietary diagnostic tools, your device may be processed under secure isolation in our central workshop facility.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-white text-xl mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                5. Cookies and Tracking Technologies
              </h2>
              <p>
                Our site uses basic cookies to retain user preferences, manage device booking state, and analyze traffic patterns through web analytics. You can disable cookies in your browser settings, though this may restrict certain interactive booking elements.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-white text-xl mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                6. Contact Information
              </h2>
              <p>
                For questions regarding this policy or data safety protocols, please contact our support desk at <strong className="text-white">themobifixx@gmail.com</strong> or call us directly at <strong className="text-white">+91-9310112994</strong>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export function TermsAndConditions() {
  return (
    <div className="pt-32 pb-24 bg-[#050B18] min-h-screen font-sans text-slate-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Hero Card */}
        <div className="bg-[#0A1329] border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full -translate-y-1/2"></div>
          <div className="relative inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Hammer className="w-4 h-4" />
            <span>Service Contract</span>
          </div>
          <h1 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">Terms and Conditions</h1>
          <p className="relative text-xs text-slate-500 font-mono">Effective Date: June 24, 2026 | Last Updated: June 24, 2026</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-[#0A1329] border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
          <div className="prose prose-invert max-w-none text-slate-355 space-y-8 text-sm leading-relaxed">
            
            <div>
              <h2 className="font-bold text-white text-xl mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                1. Repair Agreements
              </h2>
              <p>
                By booking a repair, reserving doorstep pickup, or submitting a device diagnostic ticket with TheMobifixx, you authorize our certified engineers to execute testing procedures, dismantle panels, and replace compromised chip-level components to restore your hardware.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-white text-xl mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                2. Warranty Limits & Exclusions (Not Covered)
              </h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-white font-bold text-base border-b border-slate-800/80 pb-3">
                  <Info className="w-5 h-5 text-blue-400" />
                  <span>6-Months Repair Warranty Specifications</span>
                </div>
                <p className="text-slate-300">
                  We offer a comprehensive <strong className="text-white">6-months warranty</strong> on logic board repairs, screen replacements, and replaced components. However, this warranty is strictly conditional. The following damages are <span className="text-red-400 font-bold">NOT COVERED</span> under warranty:
                </p>

                {/* Exclusions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  
                  {/* Physical Damage */}
                  <div className="bg-[#0A1329] border border-slate-800 rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                      <Ban className="w-4 h-4 shrink-0" />
                      <span>Physical Damage</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Subsequent drops, cracks, chassis dents, cracked display glass, or internal structural damage caused by high-impact shock are strictly excluded from warranty cover.
                    </p>
                  </div>

                  {/* Water Damage */}
                  <div className="bg-[#0A1329] border border-slate-800 rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                      <Droplet className="w-4 h-4 shrink-0" />
                      <span>Water/Liquid Damage</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Any liquid contact, spills, submersion, moisture ingress, or internal component oxidation/corrosion that happens after the repair voids all warranty.
                    </p>
                  </div>

                  {/* Press Damage */}
                  <div className="bg-[#0A1329] border border-slate-800 rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                      <Maximize2 className="w-4 h-4 shrink-0" />
                      <span>Press/Pressure Damage</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Damage from excessive external pressure (such as sitting on the device, heavy weight loads, screen bending, vertical line bleeding on LCDs, or internal display black patches) is not covered.
                    </p>
                  </div>

                </div>

                <div className="mt-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Any third-party disassembly attempts or breaking of TheMobifixx tamper-evident seals will immediately nullify all warranty clauses.
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-white text-xl mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                4. Client Responsibilities & Data Backup
              </h2>
              <p>
                While we isolate drives to protect files, clients are strongly advised to perform a full system backup before handing devices over. TheMobifixx will not be held responsible for pre-existing logical drive failures, data loss, or partition corruption resulting from severe board shortages.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-white text-xl mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
                5. Device Abandonment Policy
              </h2>
              <p>
                Devices not claimed, paid for, or collected within <strong className="text-white">30 days</strong> after notice of completion will be considered abandoned. TheMobifixx reserves the right to dispose of, sell, or recycle such hardware to recover accrued diagnostics, replacement parts, and storage expenses.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}