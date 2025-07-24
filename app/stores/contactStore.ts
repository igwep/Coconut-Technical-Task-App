import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ContactStore = {
  hasSubmitted: boolean;
  submissions: ContactSubmission[];
  addSubmission: (submission: ContactSubmission) => void;
  setHasSubmitted: (value: boolean) => void;
};

export const useContactStore = create<ContactStore>()(
  persist(
    (set) => ({
      hasSubmitted: false,
      submissions: [],
      addSubmission: (submission) =>
        set((state) => ({
          submissions: [...state.submissions, submission],
        })),
      setHasSubmitted: (value) => set({ hasSubmitted: value }),
    }),
    {
      name: 'contact-store', // key in localStorage
    }
  )
);
