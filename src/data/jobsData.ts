export interface JobOpportunity {
  id: string;
  title: string;
  category: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
}

export const JOBS_DATABASE: Record<string, JobOpportunity[]> = {
  technology: [
    {
      id: 'job-tech-1',
      title: 'Junior Developer',
      category: 'technology',
      company: 'AfriTech Solutions',
      location: 'Johannesburg (Hybrid)',
      salary: 'R18,000 - R24,000 / mo',
      type: 'Full-time',
      description: 'Assist in building web applications and REST APIs. Requires basic JavaScript/TypeScript knowledge.'
    },
    {
      id: 'job-tech-2',
      title: 'IT Support Technician',
      category: 'technology',
      company: 'Apex Logistics',
      location: 'Midrand, GP',
      salary: 'R14,000 - R17,500 / mo',
      type: 'Full-time',
      description: 'Provide desktop troubleshooting, network cabling, printer setup, and user software support.'
    },
    {
      id: 'job-tech-3',
      title: 'Data Analyst Intern',
      category: 'technology',
      company: 'Mzansi FinServices',
      location: 'Sandton, JHB',
      salary: 'R12,000 / mo stipend',
      type: '12-Month Contract',
      description: 'Clean datasets, generate Excel & SQL dashboard reports, and support the business intelligence team.'
    }
  ],
  retail: [
    {
      id: 'job-ret-1',
      title: 'Retail Store Cashier',
      category: 'retail',
      company: 'Karaglen Supermarket',
      location: 'Edenvale, GP',
      salary: 'R6,500 - R8,000 / mo',
      type: 'Shift work',
      description: 'Point-of-sale customer checkout, stock packing, and cash reconciliation.'
    },
    {
      id: 'job-ret-2',
      title: 'Merchandiser',
      category: 'retail',
      company: 'SPAR Retail Group',
      location: 'Bruma, JHB',
      salary: 'R7,200 / mo',
      type: 'Full-time',
      description: 'Product shelf stacking, promotion setup, inventory stock count, and expiration date checking.'
    }
  ],
  admin: [
    {
      id: 'job-adm-1',
      title: 'Office Receptionist',
      category: 'admin',
      company: 'Pretoria Law Chambers',
      location: 'Pretoria Central',
      salary: 'R9,500 - R12,000 / mo',
      type: 'Full-time',
      description: 'Welcome clients, answer switchboard calls, schedule appointments, and file client documentation.'
    }
  ],
  security: [
    {
      id: 'job-sec-1',
      title: 'Armed Response Guard',
      category: 'security',
      company: 'Fidelity ADT',
      location: 'Kempton Park',
      salary: 'R11,000 - R13,500 / mo',
      type: 'Full-time (PSIRA Reg)',
      description: 'Patrol designated residential zones, respond to alarm activations, and secure perimeter points.'
    }
  ],
  general: [
    {
      id: 'job-gen-1',
      title: 'Warehouse Logistics Assistant',
      category: 'general',
      company: 'DHL Express Depot',
      location: 'Isando, GP',
      salary: 'R7,800 / mo',
      type: 'Full-time',
      description: 'Parcel sorting, barcoding, pallet packing, and loading transport dispatch trucks.'
    }
  ]
};
