import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Section = 'hero' | 'simulation' | 'identity' | 'scoring' | 'documents' | 'signature' | 'confirmation';

interface SimulationData {
  amount: number;
  duration: number;
  monthlyPayment: number;
}

interface IdentityData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  scanned: boolean;
}

interface ScoringData {
  score: number;
  status: 'VERT' | 'ORANGE' | 'ROUGE';
  pack: 'D0' | 'D1' | 'D2' | 'D3';
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'uploaded' | 'verified';
  fileName?: string;
}

interface AppState {
  currentSection: Section;
  simulation: SimulationData;
  identity: IdentityData;
  scoring: ScoringData;
  documents: Document[];
  signature: string | null;
  contractAccepted: boolean;
  reference: string;
  
  // Actions
  setSection: (section: Section) => void;
  setSimulation: (data: Partial<SimulationData>) => void;
  calculateMonthlyPayment: () => void;
  setIdentity: (data: Partial<IdentityData>) => void;
  scanIdentity: () => void;
  calculateScoring: () => void;
  uploadDocument: (id: string, fileName: string) => void;
  setSignature: (signature: string) => void;
  acceptContract: () => void;
  reset: () => void;
  generateReference: () => void;
}

const initialSimulation: SimulationData = {
  amount: 50000,
  duration: 24,
  monthlyPayment: 0,
};

const initialIdentity: IdentityData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  idNumber: '',
  scanned: false,
};

const initialScoring: ScoringData = {
  score: 0,
  status: 'VERT',
  pack: 'D0',
};

const initialDocuments: Document[] = [
  { id: 'id', name: 'Carte d\'identité', type: 'ID', status: 'pending' },
  { id: 'rib', name: 'RIB', type: 'BANK', status: 'pending' },
  { id: 'income', name: 'Bulletin de salaire', type: 'INCOME', status: 'pending' },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentSection: 'hero',
      simulation: initialSimulation,
      identity: initialIdentity,
      scoring: initialScoring,
      documents: initialDocuments,
      signature: null,
      contractAccepted: false,
      reference: '',

      setSection: (section) => set({ currentSection: section }),

      setSimulation: (data) => {
        set((state) => ({
          simulation: { ...state.simulation, ...data },
        }));
        get().calculateMonthlyPayment();
      },

      calculateMonthlyPayment: () => {
        const { amount, duration } = get().simulation;
        const monthlyPayment = Math.round((amount / duration) * 1.15);
        set((state) => ({
          simulation: { ...state.simulation, monthlyPayment },
        }));
      },

      setIdentity: (data) => {
        set((state) => ({
          identity: { ...state.identity, ...data },
        }));
      },

      scanIdentity: () => {
        set((state) => ({
          identity: {
            ...state.identity,
            firstName: 'Sarah',
            lastName: 'Benali',
            email: 'sarah.benali@email.ma',
            phone: '+212 6XX XXX XXX',
            idNumber: 'AB123456',
            scanned: true,
          },
        }));
      },

      calculateScoring: () => {
        const { amount } = get().simulation;
        let score = 75;
        if (amount < 30000) score += 10;
        if (amount > 150000) score -= 10;
        
        const status = score >= 80 ? 'VERT' : score >= 60 ? 'ORANGE' : 'ROUGE';
        const pack = status === 'VERT' ? 'D0' : status === 'ORANGE' ? 'D1' : 'D2';
        
        set({ scoring: { score, status, pack } });
      },

      uploadDocument: (id, fileName) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id ? { ...doc, status: 'uploaded', fileName } : doc
          ),
        }));
      },

      setSignature: (signature) => set({ signature }),

      acceptContract: () => {
        set({ contractAccepted: true });
        get().generateReference();
      },

      generateReference: () => {
        const ref = `EQD-${Date.now().toString(36).toUpperCase().slice(-8)}`;
        set({ reference: ref });
      },

      reset: () => {
        set({
          currentSection: 'hero',
          simulation: initialSimulation,
          identity: initialIdentity,
          scoring: initialScoring,
          documents: initialDocuments,
          signature: null,
          contractAccepted: false,
          reference: '',
        });
      },
    }),
    {
      name: 'eqdom-disrupt-storage',
    }
  )
);
