import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail, FileText, MessageSquare } from 'lucide-react';

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FooterSection({ title, children }: FooterSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b md:border-none border-gray-700 py-4 md:py-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:hidden mb-2"
      >
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <FooterSection title="Company">
            <div className="space-y-3">
              <p className="text-gray-400 mb-4">
                Your trusted platform for cryptocurrency trading in INR
              </p>
              <div className="flex items-center space-x-2 text-blue-400">
                <MessageSquare className="h-5 w-5" />
                <span>50K+ Members</span>
              </div>
            </div>
          </FooterSection>

          <FooterSection title="Trading Resources">
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/guide" className="hover:text-white transition">Trading Guide</a>
              </li>
              <li>
                <a href="/fees" className="hover:text-white transition">Fee Structure</a>
              </li>
              <li>
                <a href="/market-analysis" className="hover:text-white transition">Market Analysis</a>
              </li>
              <li>
                <a href="/security" className="hover:text-white transition">Security Tips</a>
              </li>
            </ul>
          </FooterSection>

          <FooterSection title="Support">
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>24/7 Support</span>
              </li>
              <li>
                <a
                  href="https://t.me/cryptoinr_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Telegram Support</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+917305607997"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="h-5 w-5"
                  />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <a
                  href="mailto:safi22052004@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
                >
                  <Mail className="h-4 w-4" />
                  <span>support@cryptoinr.com</span>
                </a>
              </li>
            </ul>
          </FooterSection>

          <FooterSection title="Legal">
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/privacy" className="flex items-center space-x-2 hover:text-white transition">
                  <FileText className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="/terms" className="flex items-center space-x-2 hover:text-white transition">
                  <FileText className="h-4 w-4" />
                  <span>Terms of Service</span>
                </a>
              </li>
              <li>
                <a href="/kyc" className="flex items-center space-x-2 hover:text-white transition">
                  <FileText className="h-4 w-4" />
                  <span>KYC Policy</span>
                </a>
              </li>
            </ul>
          </FooterSection>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CryptoINR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}