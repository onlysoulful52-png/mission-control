import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Step = 
  | 'landing'
  | 'simulation' 
  | 'donnees' 
  | 'scoring' 
  | 'justifs' 
  | 'contrat' 
  | 'signature' 
  | 'suivi';

export type ScoringStatus = 'VERT' | 'ORANGE' | 'ROUGE';
export type DocumentPack = 'D0' | 'D1' | 'D2' | 'D3';

export interface Simulation {
  amount: number;
  duration: number;
  project: string;
  monthlyPayment: number;
}

export interface Applicant {
  phone: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  idNumber: string;
  address: string;
  city: string;
  income: number;
  employmentStatus: 'salaried' | 'self-employed' | 'retired' | 'other';
  employerName?: string;
  existingCustomer: boolean;
  creditBureau: 'good' | 'average' | 'poor';
  consents: {
    marketing: boolean;
    dataProcessing: boolean;
    creditCheck: boolean;
  };
}

export interface Scoring {
  score: number;
  status: ScoringStatus;
  pack: DocumentPack;
  rationale: string[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  fileName?: string;
}

export interface Contract {
  accepted: boolean;
  date: string;
  reference: string;
  terms: {
    amount: number;
    duration: number;
    monthlyPayment: number;
    totalCost: number;
    interestRate: number;
    insurance: number;
  };
}

export interface Signature {
  signed: boolean;
  date?: string;
  otpVerified: boolean;
}

export interface TimelineEvent {
  step: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

interface AppState {
  currentStep: Step;
  simulation: Simulation;
  applicant: Applicant;
  scoring: Scoring;
  documents: Document[];
  contract: Contract;
  signature: Signature;
  timeline: TimelineEvent[];
  demoMode: boolean;
  
  // Actions
  setStep: (step: Step) => void;
  setSimulation: (simulation: Partial<Simulation>) => void;
  calculateMonthlyPayment: () => void;
  setApplicant: (applicant: Partial<Applicant>) => void;
  verifyPhone: (code: string) => boolean;
  calculateScoring: () => void;
  setDocuments: (documents: Document[]) => void;
  updateDocumentStatus: (id: string, status: Document['status'], fileName?: string) => void;
  setContract: (contract: Partial<Contract>) => void;
  setSignature: (signature: Partial<Signature>) => void;
  verifySignatureOtp: (code: string) => boolean;
  reset: () => void;
  setDemoMode: (enabled: boolean) => void;
  generateDemoData: (scenario: ScoringStatus) => void;
}

const initialSimulation: Simulation = {
  amount: 50000,
  duration: 24,
  project: 'personal',
  monthlyPayment: 0,
};

const initialApplicant: Applicant = {
  phone: '',
  verified: false,
  firstName: '',
  lastName: '',
  email: '',
  birthDate: '',
  idNumber: '',
  address: '',
  city: '',
  income: 0,
  employmentStatus: 'salaried',
  existingCustomer: false,
  creditBureau: 'good',
  consents: {
    marketing: false,
    dataProcessing: false,
    creditCheck: false,
  },
};

const initialScoring: Scoring = {
  score: 0,
  status: 'VERT',
  pack: 'D0',
  rationale: [],
};

const initialDocuments: Document[] = [];

const initialContract: Contract = {
  accepted: false,
  date: '',
  reference: '',
  terms: {
    amount: 0,
    duration: 0,
    monthlyPayment: 0,
    totalCost: 0,
    interestRate: 0,
    insurance: 0,
  },
};

const initialSignature: Signature = {
  signed: false,
  otpVerified: false,
};

const initialTimeline: TimelineEvent[] = [
  { step: 'simulation', status: 'pending' },
  { step: 'donnees', status: 'pending' },
  { step: 'scoring', status: 'pending' },
  { step: 'justifs', status: 'pending' },
  { step: 'contrat', status: 'pending' },
  { step: 'signature', status: 'pending' },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentStep: 'landing',
      simulation: initialSimulation,
      applicant: initialApplicant,
      scoring: initialScoring,
      documents: initialDocuments,
      contract: initialContract,
      signature: initialSignature,
      timeline: initialTimeline,
      demoMode: false,

      setStep: (step) => {
        set({ currentStep: step });
        // Update timeline
        const timeline = get().timeline.map(t => {
          const stepOrder = ['simulation', 'donnees', 'scoring', 'justifs', 'contrat', 'signature'];
          const currentIndex = stepOrder.indexOf(step === 'landing' || step === 'suivi' ? '' : step);
          const stepIndex = stepOrder.indexOf(t.step);
          if (stepIndex < currentIndex) return { ...t, status: 'completed' as const };
          if (stepIndex === currentIndex) return { ...t, status: 'current' as const };
          return { ...t, status: 'pending' as const };
        });
        set({ timeline });
      },

      setSimulation: (simulation) => {
        set((state) => ({
          simulation: { ...state.simulation, ...simulation },
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

      setApplicant: (applicant) => {
        set((state) => ({
          applicant: { ...state.applicant, ...applicant },
        }));
      },

      verifyPhone: (code) => {
        if (code === '123456') {
          set((state) => ({
            applicant: { ...state.applicant, verified: true },
          }));
          return true;
        }
        return false;
      },

      calculateScoring: () => {
        const { applicant, simulation } = get();
        let score = 70;
        const rationale: string[] = [];

        // Credit bureau adjustment
        if (applicant.creditBureau === 'good') {
          score += 10;
          rationale.push('Historique de crédit favorable');
        } else if (applicant.creditBureau === 'poor') {
          score -= 15;
          rationale.push('Historique de crédit à surveiller');
        }

        // Existing customer
        if (applicant.existingCustomer) {
          score += 5;
          rationale.push('Client fidèle Eqdom');
        }

        // Income bracket
        const debtRatio = simulation.monthlyPayment / (applicant.income / 12);
        if (debtRatio < 0.3) {
          score += 10;
          rationale.push('Revenus confortables pour ce montant');
        } else if (debtRatio > 0.5) {
          score -= 10;
          rationale.push('Ratio d\'endettement élevé');
        }

        // Amount
        if (simulation.amount > 200000) {
          score -= 5;
          rationale.push('Montant important nécessite vérification');
        }

        // Clamp score
        score = Math.max(0, Math.min(100, score));

        // Determine status and pack
        let status: ScoringStatus;
        let pack: DocumentPack;

        if (score >= 80) {
          status = 'VERT';
          pack = 'D0';
        } else if (score >= 65) {
          status = 'ORANGE';
          pack = 'D1';
        } else {
          status = 'ROUGE';
          pack = 'D2';
        }

        // Self-employed always needs more docs
        if (applicant.employmentStatus === 'self-employed') {
          pack = 'D3';
          rationale.push('Profil indépendant : documentation complète requise');
        }

        set({ scoring: { score, status, pack, rationale } });

        // Generate documents based on pack
        const docs: Document[] = [
          { id: 'id', name: 'Carte d\'identité', type: 'ID', status: 'pending' },
        ];
        if (pack >= 'D1') {
          docs.push({ id: 'rib', name: 'Relevé d\'identité bancaire', type: 'RIB', status: 'pending' });
        }
        if (pack >= 'D2') {
          docs.push({ id: 'salary', name: 'Bulletin de salaire (3 mois)', type: 'PROOF_INCOME', status: 'pending' });
          docs.push({ id: 'bank', name: 'Relevés bancaires (3 mois)', type: 'BANK_STATEMENT', status: 'pending' });
        }
        if (pack >= 'D3') {
          docs.push({ id: 'address', name: 'Justificatif de domicile', type: 'ADDRESS_PROOF', status: 'pending' });
          docs.push({ id: 'business', name: 'Documents professionnels', type: 'BUSINESS', status: 'pending' });
        }
        set({ documents: docs });
      },

      setDocuments: (documents) => set({ documents }),

      updateDocumentStatus: (id, status, fileName) => {
        set((state) => ({
          documents: state.documents.map((d) =>
            d.id === id ? { ...d, status, fileName } : d
          ),
        }));
      },

      setContract: (contract) => {
        set((state) => ({
          contract: { ...state.contract, ...contract },
        }));
      },

      setSignature: (signature) => {
        set((state) => ({
          signature: { ...state.signature, ...signature },
        }));
      },

      verifySignatureOtp: (code) => {
        if (code === '654321') {
          set((state) => ({
            signature: { ...state.signature, otpVerified: true },
          }));
          return true;
        }
        return false;
      },

      reset: () => {
        set({
          currentStep: 'landing',
          simulation: initialSimulation,
          applicant: initialApplicant,
          scoring: initialScoring,
          documents: initialDocuments,
          contract: initialContract,
          signature: initialSignature,
          timeline: initialTimeline,
          demoMode: false,
        });
      },

      setDemoMode: (enabled) => set({ demoMode: enabled }),

      generateDemoData: (scenario) => {
        const demoApplicant: Applicant = {
          phone: '+212 6XX XXX XXX',
          verified: true,
          firstName: 'Ahmed',
          lastName: 'Alami',
          email: 'ahmed.alami@email.ma',
          birthDate: '1985-06-15',
          idNumber: 'AB123456',
          address: '123 Avenue Mohammed V',
          city: 'Casablanca',
          income: scenario === 'VERT' ? 25000 : scenario === 'ORANGE' ? 12000 : 6000,
          employmentStatus: 'salaried',
          employerName: 'Saham Assurance',
          existingCustomer: scenario === 'VERT',
          creditBureau: scenario === 'VERT' ? 'good' : scenario === 'ORANGE' ? 'average' : 'poor',
          consents: {
            marketing: true,
            dataProcessing: true,
            creditCheck: true,
          },
        };

        const demoScoring: Scoring = {
          score: scenario === 'VERT' ? 88 : scenario === 'ORANGE' ? 72 : 52,
          status: scenario,
          pack: scenario === 'VERT' ? 'D0' : scenario === 'ORANGE' ? 'D1' : 'D2',
          rationale: scenario === 'VERT' 
            ? ['Historique de crédit favorable', 'Client fidèle Eqdom', 'Revenus confortables']
            : scenario === 'ORANGE'
            ? ['Profil standard', 'Vérification complémentaire recommandée']
            : ['Historique à surveiller', 'Documentation renforcée nécessaire'],
        };

        set({
          applicant: demoApplicant,
          scoring: demoScoring,
          demoMode: true,
        });

        get().calculateScoring();
      },
    }),
    {
      name: 'eqdom-app-storage',
    }
  )
);
