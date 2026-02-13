import { create } from 'zustand';
import { addMinutes, differenceInSeconds, formatDistanceToNow } from 'date-fns';

export interface Email {
  id: string;
  address: string;
  label: string;
  createdAt: Date;
  expiresAt: Date;
  status: 'active' | 'expired';
}

export interface InboxMessage {
  id: string;
  emailId: string;
  sender: string;
  subject: string;
  body: string;
  platform: string;
  receivedAt: Date;
  isRead: boolean;
  hasOTP: boolean;
  otp?: string;
  category: 'all' | 'otp' | 'social';
}

interface EmailStore {
  emails: Email[];
  messages: InboxMessage[];
  activeEmail: Email | null;
  selectedMessage: InboxMessage | null;
  filter: 'all' | 'otp' | 'social';
  
  generateEmail: (label: string) => void;
  deleteEmail: (id: string) => void;
  setActiveEmail: (email: Email | null) => void;
  setSelectedMessage: (message: InboxMessage | null) => void;
  markAsRead: (messageId: string) => void;
  setFilter: (filter: 'all' | 'otp' | 'social') => void;
  checkExpiredEmails: () => void;
}

const generateRandomEmail = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'temp_';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${result}@tempmail.io`;
};

const extractOTP = (text: string): string | undefined => {
  const otpPattern = /\b\d{4,8}\b/;
  const match = text.match(otpPattern);
  return match ? match[0] : undefined;
};

export const useEmailStore = create<EmailStore>((set, get) => ({
  emails: [],
  messages: [],
  activeEmail: null,
  selectedMessage: null,
  filter: 'all',
  
  generateEmail: (label: string) => {
    const newEmail: Email = {
      id: Math.random().toString(36).substr(2, 9),
      address: generateRandomEmail(),
      label: label || 'Unlabeled',
      createdAt: new Date(),
      expiresAt: addMinutes(new Date(), 60),
      status: 'active',
    };
    
    set((state) => ({
      emails: [newEmail, ...state.emails],
      activeEmail: newEmail,
    }));
    
    // Simulate receiving emails after generation
    setTimeout(() => {
      const mockMessages: InboxMessage[] = [
        {
          id: Math.random().toString(36).substr(2, 9),
          emailId: newEmail.id,
          sender: 'Netflix',
          subject: 'Your verification code is 847392',
          body: `Hi there,\n\nThanks for signing up for Netflix! To complete your registration, please use the verification code: 847392\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.\n\nBest regards,\nThe Netflix Team`,
          platform: 'Netflix',
          receivedAt: new Date(),
          isRead: false,
          hasOTP: true,
          otp: '847392',
          category: 'otp',
        },
      ];
      
      set((state) => ({
        messages: [...mockMessages, ...state.messages],
      }));
    }, 2000);
  },
  
  deleteEmail: (id: string) => {
    set((state) => ({
      emails: state.emails.filter((e) => e.id !== id),
      messages: state.messages.filter((m) => m.emailId !== id),
      activeEmail: state.activeEmail?.id === id ? null : state.activeEmail,
    }));
  },
  
  setActiveEmail: (email: Email | null) => {
    set({ activeEmail: email });
  },
  
  setSelectedMessage: (message: InboxMessage | null) => {
    set({ selectedMessage: message });
  },
  
  markAsRead: (messageId: string) => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === messageId ? { ...m, isRead: true } : m
      ),
    }));
  },
  
  setFilter: (filter: 'all' | 'otp' | 'social') => {
    set({ filter });
  },
  
  checkExpiredEmails: () => {
    const now = new Date();
    set((state) => ({
      emails: state.emails.map((email) => ({
        ...email,
        status: email.expiresAt < now ? 'expired' : 'active',
      })),
    }));
  },
}));

const mockEmails: Email[] = [
  {
    id: '1',
    address: 'temp_x7k9m@tempmail.io',
    label: 'netflix-trial',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    expiresAt: addMinutes(new Date(), 30),
    status: 'active',
  },
  {
    id: '2',
    address: 'temp_a3b2c@tempmail.io',
    label: 'amazon-signup',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    status: 'expired',
  },
];

const mockMessages: InboxMessage[] = [
  {
    id: '1',
    emailId: '1',
    sender: 'Netflix',
    subject: 'Your verification code is 847392',
    body: `Hi there,\n\nThanks for signing up for Netflix! To complete your registration, please use the verification code: 847392\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.\n\nBest regards,\nThe Netflix Team`,
    platform: 'Netflix',
    receivedAt: new Date(Date.now() - 2 * 60 * 1000),
    isRead: false,
    hasOTP: true,
    otp: '847392',
    category: 'otp',
  },
  {
    id: '2',
    emailId: '1',
    sender: 'Amazon',
    subject: 'Welcome to Amazon Prime',
    body: `Welcome to Amazon Prime!\n\nYou now have access to:\n- Free 2-day shipping\n- Prime Video\n- Prime Music\n- And more!\n\nStart exploring your benefits today.\n\nThe Amazon Team`,
    platform: 'Amazon',
    receivedAt: new Date(Date.now() - 15 * 60 * 1000),
    isRead: false,
    hasOTP: false,
    category: 'social',
  },
  {
    id: '3',
    emailId: '1',
    sender: 'Discord',
    subject: 'Verify your Discord account',
    body: `Hello,\n\nYour Discord verification code is: 123456\n\nIf you didn't request this, please ignore this email.\n\nDiscord Team`,
    platform: 'Discord',
    receivedAt: new Date(Date.now() - 60 * 60 * 1000),
    isRead: true,
    hasOTP: true,
    otp: '123456',
    category: 'otp',
  },
];

// Initialize store with mock data
useEmailStore.setState({
  emails: mockEmails,
  messages: mockMessages,
  activeEmail: mockEmails[0],
  selectedMessage: mockMessages[0],
});
