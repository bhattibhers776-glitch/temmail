'use client';

import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEmailStore } from '@/lib/store';

interface NavigationProps {
  activeTab: 'generator' | 'history';
  onTabChange: (tab: 'generator' | 'history') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const messages = useEmailStore((state) => state.messages);
  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <nav className="sticky top-0 py-4 z-50   border-b bg-transparent bg-bg-secondary">
      <div className="max-w-[1400px] mx-auto px-8 py-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="  rounded-lg flex items-center justify-center font-bold text-black">
          <img src="/logo.png" alt="TempMail Logo" className="w-28 h-20" />
            
          </div>
          <span className="font-semibold text-lg">TempMail</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-bg-secondary p-1 rounded-xl border border-border-primary">
          <button
            onClick={() => onTabChange('generator')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'generator'
                ? 'bg-bg-primary text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
            }`}
          >
            Generator
          </button>
          <button
            onClick={() => onTabChange('history')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'history'
                ? 'bg-bg-primary text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
            }`}
          >
            History & Usage
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-9 h-9 rounded-lg bg-bg-secondary border border-border-primary flex items-center justify-center hover:bg-bg-tertiary transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-2 h-2 bg-accent-green rounded-full border-2 border-bg-primary animate-pulse"
              />
            )}
          </motion.button>
          
        
        </div>
      </div>
    </nav>
  );
}
