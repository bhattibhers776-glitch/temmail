'use client';

import { motion } from 'framer-motion';
import { formatDistanceToNow, format } from 'date-fns';
import { useEmailStore } from '@/lib/store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function HistoryPage() {
  const emails = useEmailStore((state) => state.emails);
  const messages = useEmailStore((state) => state.messages);

  const stats = {
    total: emails.length,
    active: emails.filter((e) => e.status === 'active').length,
    expired: emails.filter((e) => e.status === 'expired').length,
    otpReceived: messages.filter((m) => m.hasOTP).length,
  };

 const chartData = [
  { email: "abc@gmail.com", platform: "Facebook", count: 3 },
  { email: "test@gmail.com", platform: "Instagram", count: 5 },
  { email: "demo@gmail.com", platform: "LinkedIn", count: 2 },
  { email: "user@gmail.com", platform: "Twitter", count: 4 },
];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Emails', value: stats.total, change: '+12 this week', color: 'accent-green' },
          { label: 'Active Emails', value: stats.active, change: '3 expiring soon', color: 'accent-green' },
          { label: 'Expired Emails', value: stats.expired, change: 'Last 30 days', color: 'accent-green' },
          { label: 'OTP Received', value: stats.otpReceived, change: '89% success rate', color: 'accent-green' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-bg-secondary border border-border-primary rounded-xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent-green" />
            <div className="text-3xl font-bold mb-1.5">{stat.value}</div>
            <div className="text-sm text-text-secondary mb-2">{stat.label}</div>
            <div className="text-xs text-accent-green">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Email History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-bg-secondary border border-border-primary rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-primary border-b border-border-primary">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Label
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Expiry
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email, index) => (
                <motion.tr
                  key={email.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border-secondary hover:bg-bg-tertiary transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-sm text-text-primary">
                    {email.address}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {email.label}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {format(email.createdAt, 'MMM dd, yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {email.status === 'expired'
                      ? 'Expired'
                      : formatDistanceToNow(email.expiresAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${
                        email.status === 'active'
                          ? 'bg-accent-green-light text-accent-green'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {email.status === 'active' ? 'Active' : 'Expired'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

     {/* <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="bg-bg-secondary border border-border-primary rounded-xl p-8"
>
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-1">Usage Analytics</h3>
    <p className="text-sm text-text-secondary">
      Email usage by platform
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-border-primary text-sm text-text-secondary">
          <th className="py-3">Email</th>
          <th className="py-3">Platform</th>
          <th className="py-3">Usage Count</th>
        </tr>
      </thead>
      <tbody>
        {chartData.map((item, index) => (
          <tr
            key={index}
            className="border-b border-border-primary text-sm"
          >
            <td className="py-3">{item.email}</td>
            <td className="py-3">{item.platform}</td>
            <td className="py-3">{item.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</motion.div> */}

    </div>
  );
}
