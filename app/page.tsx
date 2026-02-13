'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import EmailGenerator from '@/components/EmailGenerator';
import Inbox from '@/components/Inbox';
import HistoryPage from '@/components/HistoryPage';
import { useEmailStore } from '@/lib/store';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');
  const checkExpiredEmails = useEmailStore((state) => state.checkExpiredEmails);

  useEffect(() => {
    // Check for expired emails every minute
    const interval = setInterval(() => {
      checkExpiredEmails();
    }, 60000);

    return () => clearInterval(interval);
  }, [checkExpiredEmails]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-[1400px] mx-auto px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'generator' ? (
            <div className="space-y-8">
              <EmailGenerator />
              <Inbox />
            </div>
          ) : (
            <HistoryPage />
          )}
        </motion.div>
      </main>
    </div>
  );
}
