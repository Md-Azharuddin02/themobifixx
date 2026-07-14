import { Shield, Hammer, Info, CheckCircle2 } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm space-y-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-brand-orange px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Data Protection Audit</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-gray-500 font-mono">Effective Date: June 24, 2026 | Last Updated: June 24, 2026</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="prose prose-slate max-w-none text-gray-600 space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="font-bold text-gray-900 text-xl mb-3">1. Introduction</h2>
              <p>
                Welcome to TheMobifixx ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal devices, hard drives, and system credentials are handled with the highest standards of safety and data confidentiality. This Privacy Policy describes how we collect, use, and secure your personal details and diagnostic files during your service cycle.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-xl mb-3">2. Information We Collect</h2>
              <p className="mb-3">When you request a repair pickup or submit inquiries, we collect the following:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Coordinates:</strong> Your full name, Indian phone number, email address, and home or corporate physical address for pickup/delivery mapping.</li>
                <li><strong>Device Specifications:</strong> System type (laptop, MacBook, smartphone, etc.), brand, model serials, and user-provided fault logs.</li>
                <li><strong>Diagnostic Logs:</strong> Performance files and hardware errors logged by our testing tools during initial checkups.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-xl mb-4">3. Hard Drive & Data Privacy Guarantee</h2>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-900 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Full Data Isolation</span>
                </div>
                <p className="text-sm text-gray-600">
                  Our engineers are strictly forbidden from exploring, downloading, or duplicating folders, photos, or data on client drives. Hard drive arrays are isolated during motherboard soldering jobs to prevent thermal or static discharge corruption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TermsAndConditions() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-brand-orange px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Hammer className="w-4 h-4" />
            <span>Service Contract</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Terms and Conditions</h1>
          <p className="text-sm text-gray-500 font-mono">Effective Date: June 24, 2026 | Last Updated: June 24, 2026</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="prose prose-slate max-w-none text-gray-600 space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="font-bold text-gray-900 text-xl mb-3">1. Repair Agreements</h2>
              <p>
                By booking a repair or requesting doorstep pickup with TheMobifixx, you authorize our certified engineers to execute diagnostic scans and open system panels to assess hardware faults.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-xl mb-3">2. Diagnosis & Inspection Fee Waiver</h2>
              <p>
                Diagnostic testing is entirely free of cost if you approve the recommended repair estimate. In cases where the client rejects the estimate and requests return without any repair, a nominal inspection transport fee of ₹299 will be charged to cover transit.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 text-xl mb-4">3. Warranty Limits & Terms</h2>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-900 font-bold text-base">
                  <Info className="w-5 h-5 text-brand-orange" />
                  <span>90-Day Repair Guarantee</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We offer a solid 90-day warranty on all logic-board, chip-level, and component repairs.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Warranty is immediately voided in cases of subsequent physical drops, water ingress, or third-party disassembly attempts after TheMobifixx's tamper seal is broken.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}