'use client';

import { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmailStore } from '@/lib/store';

interface NavigationProps {
  activeTab: 'generator' | 'history';
  onTabChange: (tab: 'generator' | 'history') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const messages = useEmailStore((state) => state.messages);
  const unreadCount = messages.filter((m) => !m.isRead).length;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: 'generator' | 'history') => {
    onTabChange(tab);
    setIsMobileMenuOpen(false); // close menu after selection on mobile
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-bg-secondary/80 backdrop-blur-md">
      {/* Main nav bar */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - left */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center font-bold text-black">
              <img
                src="/logo.png"
                alt="TempMail Logo"
                className="h-10 w-auto sm:h-12 md:h-14 lg:h-16"
              />
            </div>
            <span className="hidden font-semibold text-lg sm:inline">TempMail</span>
          </div>

          {/* Desktop Tabs - center */}
          <div className="hidden items-center gap-2 rounded-xl border border-border-primary bg-bg-secondary p-1 md:flex">
            <button
              onClick={() => handleTabClick('generator')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'generator'
                  ? 'bg-bg-primary text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              Generator
            </button>
            <button
              onClick={() => handleTabClick('history')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'history'
                  ? 'bg-bg-primary text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              History & Usage
            </button>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border-primary bg-bg-secondary hover:bg-bg-tertiary"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-bg-primary bg-accent-green"
                />
              )}
            </motion.button>

            {/* Mobile menu button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border-primary bg-bg-secondary md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-5">
              <button
                onClick={() => handleTabClick('generator')}
                className={`flex w-full justify-start rounded-lg px-5 py-3 text-left text-base font-medium transition-colors ${
                  activeTab === 'generator'
                    ? 'bg-bg-primary text-text-primary'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                }`}
              >
                Generator
              </button>

              <button
                onClick={() => handleTabClick('history')}
                className={`flex w-full justify-start rounded-lg px-5 py-3 text-left text-base font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'bg-bg-primary text-text-primary'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                }`}
              >
                History & Usage
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}