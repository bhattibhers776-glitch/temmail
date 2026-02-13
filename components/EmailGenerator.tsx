'use client';

import { useState } from 'react';
import { RefreshCw, Copy, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-bg-secondary border border-border-primary rounded-xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-6 border-b border-border-primary/60">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-1.5">
          Generate Temporary Email
        </h2>
        <p className="text-sm sm:text-base text-text-secondary">
          Disposable email addresses for quick & secure sign-ups
        </p>
      </div>

      {/* Form area */}
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-6">
          <label
            htmlFor="email-label"
            className="block text-sm font-medium text-text-secondary mb-2.5"
          >
            Label (optional)
          </label>
          <input
            id="email-label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. netflix-trial, github-signup"
            className="w-full px-4 py-3.5 bg-bg-tertiary border border-border-primary rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green-light/40 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerate}
            className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-accent-green text-black font-semibold rounded-xl hover:bg-accent-green-hover hover:shadow-xl hover:shadow-accent-green/25 transition-all duration-200"
          >
            <RefreshCw size={18} />
            Generate Email
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-bg-tertiary border border-border-primary text-text-primary font-medium rounded-xl hover:bg-bg-primary hover:border-border-primary/80 transition-all duration-200"
          >
            <RefreshCw size={18} />
            Refresh
          </motion.button>
        </div>
      </div>

      {/* Generated email + countdown */}
      <AnimatePresence>
        {activeEmail && (
          <motion.div
            key="email-result"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="border-t border-border-primary/60 bg-bg-primary px-5 py-6 sm:px-8 sm:py-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-mono text-lg sm:text-xl font-semibold text-accent-green break-all tracking-tight">
                  {activeEmail.address}
                </div>

                {countdown && (
                  <div className="mt-2.5 flex items-center gap-2.5 text-sm">
                    <Clock
                      size={16}
                      className={countdown.isExpired ? 'text-red-400' : 'text-accent-green/80'}
                    />
                    <span
                      className={
                        countdown.isExpired
                          ? 'text-red-400 font-medium'
                          : 'text-text-secondary'
                      }
                    >
                      {countdown.isExpired
                        ? 'This email has expired'
                        : `Expires in ${countdown.formatted || `${countdown.minutes}m ${countdown.seconds}s`}`}
                    </span>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleCopy(activeEmail.address)}
                className={`min-w-[110px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  copied
                    ? 'bg-accent-green text-black shadow-md shadow-accent-green/30'
                    : 'bg-accent-green-light/30 text-accent-green border border-accent-green/30 hover:bg-accent-green-light/40 hover:border-accent-green/50'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
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