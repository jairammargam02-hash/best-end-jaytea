import { FormSubmission } from '../types';
import { FORMSPREE_ENDPOINT } from '../constants';

const STORAGE_KEY = 'jaytea_submissions';

export const FormService = {
  getSubmissions: (): FormSubmission[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },

  // Saves to local storage AND sends to Formspree
  submit: async (type: 'contact' | 'franchise', data: any): Promise<boolean> => {
    // Lead Scoring Logic
    let score = 0;
    if (type === 'franchise') score += 50;
    if (type === 'contact') score += 10;
    if (data.budget === '20L+') score += 40;
    if (data.budget === '10-20L') score += 20;
    if (data.phone && data.phone.length > 9) score += 5;

    // 1. Save to Local Storage (Simulating DB for Admin Panel)
    try {
      const submissions = FormService.getSubmissions();
      const newSubmission: FormSubmission = {
        id: `sub-${Date.now()}`,
        type,
        data,
        date: new Date().toISOString(),
        status: 'new',
        sourcePage: window.location.hash || window.location.pathname,
        leadScore: score
      };
      submissions.unshift(newSubmission);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch (e) {
      console.error("Local save failed", e);
    }

    // 2. Submit to Formspree
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ ...data, lead_score: score }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (e) {
      console.error("Formspree submit failed", e);
      return false;
    }
  },
  
  markAsRead: (id: string) => {
    const submissions = FormService.getSubmissions();
    const index = submissions.findIndex(s => s.id === id);
    if(index >= 0) {
      submissions[index].status = 'read';
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    }
  }
};