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
    <div className="pb-20 text-fg-muted">
      <div className="container-page max-w-3xl space-y-10 pt-10 md:pt-16">

        {/* Hero Card */}
        <div className="space-y-4 border-b border-line pb-8">
          <div className="eyebrow inline-flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Data Protection Audit</span>
          </div>
          <h1 className="text-[1.75rem] font-bold text-fg md:text-5xl">Privacy Policy</h1>
          <p className="font-mono text-xs text-fg-subtle">Effective Date: June 24, 2026 | Last Updated: June 24, 2026</p>
        </div>

        {/* Main Content Card */}
        <div className="space-y-8">
          <div className="space-y-10 text-[0.9375rem] leading-relaxed">
            
            <div>
              <h2 className="font-semibold text-fg text-xl mb-3 flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-sm bg-accent" aria-hidden="true"></span>
                1. Introduction
              </h2>
              <p>
                Welcome to <strong className="text-fg">TheMobifixx</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal devices, hard drives, and system credentials are handled with the highest standards of safety and data confidentiality. This Privacy Policy describes how we collect, use, and secure your personal details and diagnostic files during your service cycle.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-fg text-xl mb-3 flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-sm bg-accent" aria-hidden="true"></span>
                2. Information We Collect
              </h2>
              <p className="mb-3">When you request a repair pickup or submit inquiries, we collect the following information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-fg">Personal Coordinates:</strong> Your full name, Indian phone number, email address, and home or corporate physical address for pickup/delivery mapping.</li>
                <li><strong className="text-fg">Device Specifications:</strong> System type (laptop, MacBook, smartphone, watch, etc.), brand, model, serial codes, and user-provided fault logs.</li>
                <li><strong className="text-fg">Diagnostic & Test Logs:</strong> Hardware errors, logic board diagnostic readouts, and voltage testing values logged by our technicians during initial checkups.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-fg text-xl mb-4 flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-sm bg-accent" aria-hidden="true"></span>
                3. Hard Drive & Data Privacy Guarantee
              </h2>
              <div className="rounded-lg border border-line bg-card p-5 md:p-6 space-y-4">
                <div className="flex items-center gap-3 text-fg font-bold text-base border-b border-line pb-3">
                  <Lock className="w-5 h-5 text-success" />
                  <span>Full Data Isolation Policy</span>
                </div>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong className="text-fg">Zero Access Policy:</strong> Our technicians are strictly forbidden from browsing, opening, downloading, or replicating folders, photos, browser histories, or databases stored on client drives.
                  </p>
                  <p>
                    <strong className="text-fg">Hardware Extraction:</strong> Where technically possible and appropriate, drives/SSDs are physically disconnected or isolated during complex motherboard micro-soldering tasks to prevent thermal or static discharge corruption.
                  </p>
                  <p>
                    <strong className="text-fg">Encrypted Passcode Storage:</strong> Any passcode requested for system boot testing is saved in an encrypted temporary technician journal and is permanently wiped once the final diagnostics pass validation.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-fg text-xl mb-3 flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-sm bg-accent" aria-hidden="true"></span>
                4. Data Sharing & Third-Party Disclosure
              </h2>
              <p>
                We do not sell, rent, or trade client personal details. Data is shared exclusively with our logistics courier agents to coordinate doorstep pickup and drop-off transits. In rare cases where chip-level motherboard elements require proprietary diagnostic tools, your device may be processed under secure isolation in our central workshop facility.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-fg text-xl mb-3 flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-sm bg-accent" aria-hidden="true"></span>
                5. Cookies and Tracking Technologies
              </h2>
              <p>
                Our site uses basic cookies to retain user preferences, manage device booking state, and analyze traffic patterns through web analytics. You can disable cookies in your browser settings, though this may restrict certain interactive booking elements.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-fg text-xl mb-3 flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-sm bg-accent" aria-hidden="true"></span>
                6. Contact Information
              </h2>
              <p>
                For questions regarding this policy or data safety protocols, please contact our support desk at <strong className="text-fg">themobifixx@gmail.com</strong> or call us directly at <strong className="text-fg">+91-9310112994</strong>.
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
    <div className="pb-20 text-fg-muted">
      <div className="container-page max-w-3xl space-y-10 pt-10 md:pt-16">

        {/* Hero Card */}
        <div className="space-y-4 border-b border-line pb-8">
          <div className="eyebrow inline-flex items-center gap-2">
            <Hammer className="w-4 h-4" />
            <span>Service Contract</span>
          </div>
          <h1 className="text-[1.75rem] font-bold text-fg md:text-5xl">Terms and Conditions</h1>
          <p className="font-mono text-xs text-fg-subtle">Effective Date: June 24, 2026 | Last Updated: June 24, 2026</p>
        </div>

        {/* Main Content Card */}
        <div className="space-y-8">
          <div className="space-y-10 text-[0.9375rem] leading-relaxed">
            
            <div>
              <h2 className="font-semibold text-fg text-xl mb-3 flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-sm bg-accent" aria-hidden="true"></span>
                1. Repair Agreements
              </h2>
              <p>
                By booking a repair, reserving doorstep pickup, or submitting a device diagnostic ticket with TheMobifixx, you authorize our certified engineers to execute testing procedures, dismantle panels, and replace compromised chip-level components to restore your hardware.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-fg text-xl mb-4 flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-sm bg-accent" aria-hidden="true"></span>
                2. Warranty Limits & Exclusions (Not Covered)
              </h2>
              <div className="rounded-lg border border-line bg-card p-5 md:p-6 space-y-4">
                <div className="flex items-center gap-3 text-fg font-bold text-base border-b border-line pb-3">
                  <Info className="w-5 h-5 text-accent" />
                  <span>6-Months Repair Warranty Specifications</span>
                </div>
                <p className="text-fg-muted">
                  We offer a comprehensive <strong className="text-fg">6-months warranty</strong> on logic board repairs, screen replacements, and replaced components. However, this warranty is strictly conditional. The following damages are <span className="text-danger font-bold">NOT COVERED</span> under warranty:
                </p>

                {/* Exclusions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  
                  {/* Physical Damage */}
                  <div className="rounded-md border border-line bg-paper p-4 space-y-2">
                    <div className="flex items-center gap-2 text-danger font-bold text-sm">
                      <Ban className="w-4 h-4 shrink-0" />
                      <span>Physical Damage</span>
                    </div>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      Subsequent drops, cracks, chassis dents, cracked display glass, or internal structural damage caused by high-impact shock are strictly excluded from warranty cover.
                    </p>
                  </div>

                  {/* Water Damage */}
                  <div className="rounded-md border border-line bg-paper p-4 space-y-2">
                    <div className="flex items-center gap-2 text-danger font-bold text-sm">
                      <Droplet className="w-4 h-4 shrink-0" />
                      <span>Water/Liquid Damage</span>
                    </div>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      Any liquid contact, spills, submersion, moisture ingress, or internal component oxidation/corrosion that happens after the repair voids all warranty.
                    </p>
                  </div>

                  {/* Press Damage */}
                  <div className="rounded-md border border-line bg-paper p-4 space-y-2">
                    <div className="flex items-center gap-2 text-danger font-bold text-sm">
                      <Maximize2 className="w-4 h-4 shrink-0" />
                      <span>Press/Pressure Damage</span>
                    </div>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      Damage from excessive external pressure (such as sitting on the device, heavy weight loads, screen bending, vertical line bleeding on LCDs, or internal display black patches) is not covered.
                    </p>
                  </div>

                </div>

                <div className="mt-2 text-xs text-fg-muted border-t border-line pt-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-star shrink-0 mt-0.5" />
                  <span>
                    Any third-party disassembly attempts or breaking of TheMobifixx tamper-evident seals will immediately nullify all warranty clauses.
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-fg text-xl mb-3 flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-sm bg-accent" aria-hidden="true"></span>
                4. Client Responsibilities & Data Backup
              </h2>
              <p>
                While we isolate drives to protect files, clients are strongly advised to perform a full system backup before handing devices over. TheMobifixx will not be held responsible for pre-existing logical drive failures, data loss, or partition corruption resulting from severe board shortages.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-fg text-xl mb-3 flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-sm bg-accent" aria-hidden="true"></span>
                5. Device Abandonment Policy
              </h2>
              <p>
                Devices not claimed, paid for, or collected within <strong className="text-fg">30 days</strong> after notice of completion will be considered abandoned. TheMobifixx reserves the right to dispose of, sell, or recycle such hardware to recover accrued diagnostics, replacement parts, and storage expenses.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}