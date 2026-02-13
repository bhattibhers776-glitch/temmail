'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { useEmailStore } from '@/lib/store';

const ITEMS_PER_PAGE = 4;

export default function Inbox() {
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const messages = useEmailStore((state) => state.messages);
  const selectedMessage = useEmailStore((state) => state.selectedMessage);
  const filter = useEmailStore((state) => state.filter);
  const setSelectedMessage = useEmailStore((state) => state.setSelectedMessage);
  const markAsRead = useEmailStore((state) => state.markAsRead);
  const setFilter = useEmailStore((state) => state.setFilter);

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'all') return true;
    return msg.category === filter;
  });

  // ─── Pagination logic ────────────────────────────────
  const totalItems = filteredMessages.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMessages = filteredMessages.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSelectMessage = (msg: typeof messages[0]) => {
    setSelectedMessage(msg);
    markAsRead(msg.id);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 min-h-[600px]">
      {/* Message List */}
      <div className="bg-bg-secondary border border-border-primary rounded-xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border-primary">
          <h3 className="text-lg font-semibold mb-4">Inbox</h3>

          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex gap-1.5">
              <button
                className={`tab px-4 py-1.5 rounded text-sm font-medium ${
                  filter === 'all' ? 'bg-accent-green/20 text-accent-green' : 'text-text-secondary hover:bg-bg-tertiary'
                }`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              {/* You can add more category tabs here if needed */}
            </div>

            {/* <div className="flex items-center gap-2">
              <label htmlFor="search-email" className="text-sm text-text-secondary">
                Email:
              </label>
              <input
                id="search-email"
                placeholder="Search by email address"
                className="bg-bg-tertiary border border-border-primary rounded px-3 py-1.5 text-sm w-56 focus:outline-none focus:border-accent-green/50"
                type="email"
              />
            </div> */}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {currentMessages.map((msg) => (
            <motion.div
              key={msg.id}
              whileHover={{ backgroundColor: 'rgba(28, 33, 38, 0.8)' }}
              onClick={() => handleSelectMessage(msg)}
              className={`p-6 border-b border-border-secondary cursor-pointer transition-all relative ${
                selectedMessage?.id === msg.id
                  ? 'bg-bg-primary border-l-2 border-l-accent-green'
                  : ''
              } ${!msg.isRead ? 'pl-8' : ''}`}
            >
              {!msg.isRead && (
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent-green rounded-full" />
              )}

              <div className="flex justify-between items-center mb-1.5">
                <span className="font-medium text-sm">{msg.sender}</span>
                <span className="text-xs text-text-tertiary">
                  {formatDistanceToNow(msg.receivedAt, { addSuffix: true })}
                </span>
              </div>

              <div className="text-sm text-text-secondary mb-2 truncate">
                {msg.subject}
              </div>

              <div className="flex gap-1.5 items-center">
                {msg.hasOTP && (
                  <span className="text-xs px-2 py-0.5 rounded bg-accent-green-light text-accent-green font-medium">
                    OTP
                  </span>
                )}
                <span className="w-4 h-4 rounded bg-bg-tertiary flex items-center justify-center text-[10px]">
                  {msg.platform[0]}
                </span>
              </div>
            </motion.div>
          ))}

          {totalItems === 0 && (
            <div className="flex items-center justify-center h-full text-text-tertiary text-sm">
              No messages
            </div>
          )}
        </div>

        {/* Pagination controls – only shown when needed */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-border-primary bg-bg-tertiary/30 flex items-center justify-between text-sm">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bg-tertiary transition-colors"
            >
              ← Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm transition-colors ${
                    page === currentPage
                      ? 'bg-accent-green text-black font-medium'
                      : 'hover:bg-bg-tertiary'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bg-tertiary transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Message Preview – unchanged */}
      <div className="bg-bg-secondary border border-border-primary rounded-xl overflow-hidden flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-6 border-b border-border-primary">
              <h3 className="text-xl font-semibold mb-3">{selectedMessage.subject}</h3>
              <div className="flex gap-6 text-sm text-text-secondary">
                <span>
                  From: <strong className="text-text-primary">{selectedMessage.sender}</strong>
                </span>
                <span>{formatDistanceToNow(selectedMessage.receivedAt, { addSuffix: true })}</span>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {selectedMessage.hasOTP && selectedMessage.otp && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-bg-primary border border-accent-green rounded-lg p-5 mb-6 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs text-text-secondary uppercase tracking-wide mb-1.5">
                      Verification Code
                    </div>
                    <div className="text-3xl font-bold text-accent-green font-mono tracking-widest">
                      {selectedMessage.otp}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(selectedMessage.otp!)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      copied
                        ? 'bg-accent-green text-black'
                        : 'bg-accent-green-light text-accent-green border border-accent-green/20'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="inline mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="inline mr-1" />
                        Copy
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              <div className="text-text-secondary whitespace-pre-line leading-relaxed">
                {selectedMessage.body}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-text-tertiary text-sm">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  );
}