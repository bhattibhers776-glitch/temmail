'use client';

import { useState } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { useEmailStore } from '@/lib/store';
import { useCountdown } from '@/hooks/useCountdown';

export default function EmailGenerator() {
  const [label, setLabel] = useState('');
  const [copied, setCopied] = useState(false);
  
  const activeEmail = useEmailStore((state) => state.activeEmail);
  const generateEmail = useEmailStore((state) => state.generateEmail);
  
  const countdown = useCountdown(activeEmail?.expiresAt || new Date());

  const handleGenerate = () => {
    generateEmail(label);
    setLabel('');
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-bg-secondary border border-border-primary rounded-xl p-8 shadow-lg"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Generate Temporary Email</h2>
        <p className="text-sm text-text-secondary">
          Create a disposable email address for secure sign-ups
        </p>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Email Label (Optional)
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g., netflix-trial, amazon-signup"
          className="w-full px-4 py-3 bg-bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green-light transition-all"
        />
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent-green text-black font-medium rounded-lg hover:bg-accent-green-hover hover:shadow-lg hover:shadow-accent-green/30 transition-all"
        >
          <RefreshCw size={16} />
          Generate Email
        </motion.button>
        
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-bg-tertiary border border-border-primary text-text-primary rounded-lg hover:bg-bg-primary transition-all"
        >
          <RefreshCw size={16} />
          Refresh
        </motion.button>
      </div>

      <AnimatePresence>
        {activeEmail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-bg-primary border border-border-primary rounded-xl p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-lg font-medium text-accent-green break-all">
                {activeEmail.address}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopy(activeEmail.address)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copied
                    ? 'bg-accent-green text-black'
                    : 'bg-accent-green-light text-accent-green border border-accent-green/20 hover:bg-accent-green/20 hover:border-accent-green'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={14} className="inline mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} className="inline mr-1" />
                    Copy
                  </>
                )}
              </motion.button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
