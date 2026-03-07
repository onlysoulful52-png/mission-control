import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Step = 'hero' | 'simulation' | 'contact' | 'documents' | 'waiting' | 'offer' | 'signature' | 'success';

interface AppState {
  currentStep: Step;
  simulation: { amount: number; duration: number; monthly: number };
  contact: { firstName: string; lastName: string; phone: string; email: string; consents: boolean[] };
  documents: { id: string; name: string; status: 'pending' | 'uploaded' }[];
  reference: string;
  
  setStep: (step: Step) => void;
  setSimulation: (data: Partial<AppState['simulation']>) => void;
  setContact: (data: Partial<AppState['contact']>) => void;
  uploadDoc: (id: string) => void;
  generateRef: () => void;
  reset: () => void;
}

const initialState = {
  currentStep: 'hero' as Step,
  simulation: { amount: 50000, duration: 24, monthly: 2396 },
  contact: { firstName: '', lastName: '', phone: '', email: '', consents: [false, false, false] },
  documents: [
    { id: 'cin-recto', name: "CIN - Recto", status: 'pending' as const },
    { id: 'cin-verso', name: "CIN - Verso", status: 'pending' as const },
    { id: 'rib', name: "Relevé d'identité bancaire", status: 'pending' as const },
  ],
  reference: '',
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStep: (step) => set({ currentStep: step }),
      setSimulation: (data) => set((s) => ({ simulation: { ...s.simulation, ...data } })),
      setContact: (data) => set((s) => ({ contact: { ...s.contact, ...data } })),
      uploadDoc: (id) => set((s) => ({
        documents: s.documents.map((d) => (d.id === id ? { ...d, status: 'uploaded' as const } : d)),
      })),
      generateRef: () => set({ reference: `EQD-${Date.now().toString(36).slice(-8).toUpperCase()}` }),
      reset: () => set(initialState),
    }),
    { name: 'eqdom-premium-storage' }
  )
);
