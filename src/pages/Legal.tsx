/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Hammer, Info, CheckCircle2 } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-[#0F4CFF]" />
            <span>Data Protection Audit</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-400 font-mono">Effective Date: June 24, 2026 | Last Updated: June 24, 2026</p>
        </div>

        <div className="prose prose-slate prose-sm text-slate-600 space-y-6 text-sm leading-relaxed border-t border-slate-100 pt-8">
          <h2 className="font-bold text-slate-900 text-lg">1. Introduction</h2>
          <p>
            Welcome to LapyZone ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal devices, hard drives, and system credentials are handled with the highest standards of safety and data confidentiality. This Privacy Policy describes how we collect, use, and secure your personal details and diagnostic files during your service cycle.
          </p>

          <h2 className="font-bold text-slate-900 text-lg">2. Information We Collect</h2>
          <p>
            When you request a repair pickup or submit inquiries, we collect the following:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Coordinates:</strong> Your full name, Indian phone number, email address, and home or corporate physical address for pickup/delivery mapping.</li>
            <li><strong>Device Specifications:</strong> System type (laptop, MacBook, smartphone, etc.), brand, model serials, and user-provided fault logs.</li>
            <li><strong>Diagnostic Logs:</strong> Performance files and hardware errors logged by our laboratory machines during initial testing.</li>
          </ul>

          <h2 className="font-bold text-slate-900 text-lg">3. Hard Drive & Data Privacy Guarantee</h2>
          <p>
            LapyZone adheres to an ironclad data privacy policy:
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#00C48C]" />
              <span>Full Data Isolation</span>
            </div>
            <p className="text-xs text-slate-500">
              Our engineers are strictly forbidden from exploring, downloading, or duplicating folders, photos, or data on client drives. Hard drive arrays are isolated during motherboard soldering jobs to prevent thermal or static discharge corruption.
            </p>
          </div>

          <h2 className="font-bold text-slate-900 text-lg">4. Sharing Your Data</h2>
          <p>
            We do not sell, rent, or trade your personal or business coordinates to third parties. Your delivery address and phone are shared only with our in-house transit specialists to complete pick-ups and returns.
          </p>

          <h2 className="font-bold text-slate-900 text-lg">5. Security Standards</h2>
          <p>
            Our master repair labs in Nehru Place are protected by continuous physical security monitoring, ESD anti-static mats, and local encrypted servers. Digital logs of repairs are kept on an isolated secure intranet database.
          </p>

          <h2 className="font-bold text-slate-900 text-lg">6. Contacting Our Data Officer</h2>
          <p>
            If you have any questions about our privacy methods, please email our security officer at: <a href="mailto:privacy@lapyzone.in" className="text-[#0F4CFF] hover:underline font-bold">privacy@lapyzone.in</a> or call +91 99999 99999.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TermsAndConditions() {
  return (
    <div className="pt-32 pb-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Hammer className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Service Contract</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Terms and Conditions</h1>
          <p className="text-xs text-slate-400 font-mono">Effective Date: June 24, 2026 | Last Updated: June 24, 2026</p>
        </div>

        <div className="prose prose-slate prose-sm text-slate-600 space-y-6 text-sm leading-relaxed border-t border-slate-100 pt-8">
          <h2 className="font-bold text-slate-900 text-lg">1. Repair Agreements</h2>
          <p>
            By booking a repair or requesting doorstep pickup with LapyZone, you authorize our certified engineers to execute diagnostic scans and open system panels to assess hardware faults.
          </p>

          <h2 className="font-bold text-slate-900 text-lg">2. Diagnosis & Inspection Fee Waiver</h2>
          <p>
            Diagnostic testing is entirely free of cost if you approve the recommended repair estimate. In cases where the client rejects the estimate and requests return without any repair, a nominal inspection transport fee of ₹299 will be charged to cover transit.
          </p>

          <h2 className="font-bold text-slate-900 text-lg">3. Warranty Limits & Terms</h2>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Info className="w-4 h-4 text-[#FF7A00]" />
              <span>90-Day Repair Guarantee</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              We offer a solid 90-day warranty on all logic-board, chip-level, and component repairs.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Warranty is immediately voided in cases of subsequent physical drops, water ingress, or third-party disassembly attempts after LapyZone's tamper seal is broken.
            </p>
          </div>

          <h2 className="font-bold text-slate-900 text-lg">4. Data Loss & Storage Liabilities</h2>
          <p>
            While LapyZone uses state-of-the-art procedures to protect physical disks, hardware failures can be highly unpredictable. The client is strongly advised to perform a full system backup before handing over any device. LapyZone is not liable for data loss occurring due to pre-existing motherboard failures.
          </p>

          <h2 className="font-bold text-slate-900 text-lg">5. Storage of Repaired Devices</h2>
          <p>
            Devices remaining in our laboratory for more than 45 days after repair completion notice without payment will carry a storage holding fee. After 90 days, LapyZone reserves the rights to recycle or auction the device components to recover outstanding spare parts bills.
          </p>

          <h2 className="font-bold text-slate-900 text-lg">6. Jurisdictions</h2>
          <p>
            Any legal disputes or complaints originating from LapyZone contracts shall fall strictly under the exclusive jurisdiction of the state courts of Delhi NCR, India.
          </p>
        </div>
      </div>
    </div>
  );
}
